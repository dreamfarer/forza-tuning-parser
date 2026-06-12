import { RoundingMode } from '../../enums';
import type { TuningField } from '../../types';
import { lerp } from '../lerp';

/**
 * Parses the final drive ratio from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed final drive ratio as a {@link TuningField} object.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseFinalDrive(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): TuningField {
  const raw = view.getFloat32(byteOffset, true);
  const unit = null;
  const range = { min: 2.2, max: 6.1 };
  const value = lerp(raw, range, RoundingMode.DoubleDigit);
  return { raw, value, unit, range };
}
