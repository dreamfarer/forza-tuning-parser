import { Position, RoundingMode, UnitSystem } from '../../enums';
import type { Configuration, TuningField } from '../../types';
import { lerp } from '../lerp';

const CONFIGS = {
  [UnitSystem.Imperial]: {
    unit: 'lb',
  },
  [UnitSystem.Metric]: {
    unit: 'kgf',
  },
};

/**
 * Parse aero from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 * @param config The configuration containing the unit system and aero range (optional).
 * @param position The position of the aero (front or rear).
 *
 * @returns The parsed aero as a {@link TuningField} object.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseAero(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
  config: Configuration,
  position: Position,
): TuningField {
  const raw = view.getFloat32(byteOffset, true);
  let { unit } = CONFIGS[config.unitSystem];
  let roundingMode = RoundingMode.SingleDigit;
  let range =
    position === Position.Front ? config.aero?.front : config.aero?.rear;
  if (!range) {
    unit = '%';
    range = { min: 0.0, max: 100.0 };
    roundingMode = RoundingMode.Whole;
  }
  const value = lerp(raw, range, roundingMode);
  return { raw, value, unit, range };
}
