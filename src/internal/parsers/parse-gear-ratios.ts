import { RoundingMode } from '../../enums';
import type { TuningField } from '../../types';
import { lerp } from '../lerp';

/**
 * Parses gear ratios from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset of the first gear ratio float.
 *
 * @returns An array with a maximum of 10 {@link TuningField} objects, each representing a gear ratio.
 *
 * @throws RangeError If any raw float value is not between 0 and 1.
 */
export function parseGearRatios(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): TuningField[] {
  const tuningFields: TuningField[] = [];
  const unit = null;
  const range = { min: 0.48, max: 6.0 };
  for (let i = 0; i < 10; i++) {
    const raw = view.getFloat32(byteOffset + i * 4, true);
    if (raw === -1) continue;
    if (raw < 0 || raw > 1) throw new RangeError('Invalid gear ratio');
    const value = lerp(raw, range, RoundingMode.DoubleDigit);
    tuningFields.push({ raw, value, unit, range });
  }
  return tuningFields;
}
