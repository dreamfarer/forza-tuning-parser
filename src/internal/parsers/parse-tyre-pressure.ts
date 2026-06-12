import { RoundingMode, UnitSystem } from '../../enums';
import type { Configuration, TuningField } from '../../types';
import { lerp } from '../lerp';

const CONFIGS = {
  [UnitSystem.Imperial]: {
    range: { min: 15.0, max: 55.0 },
    unit: 'psi',
    roundingMode: RoundingMode.Half,
  },
  [UnitSystem.Metric]: {
    range: { min: 1.0, max: 3.8 },
    unit: 'bar',
    roundingMode: RoundingMode.SingleDigit,
  },
};

/**
 * Parse tyre pressure from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 * @param config The configuration containing the unit system.
 *
 * @returns The parsed tyre pressure as a {@link TuningField} object.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseTyrePressure(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
  config: Configuration,
): TuningField {
  const { range, unit, roundingMode } = CONFIGS[config.unitSystem];
  const raw = view.getFloat32(byteOffset, true);
  const value = lerp(raw, range, roundingMode);
  return { raw, value, unit, range };
}
