import { RoundingMode } from '../../enums';
import type { TuningField } from '../../types';
import { lerp } from '../lerp';

/**
 * Parse a float value to per cent from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed float value as a {@link TuningField} object.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parsePercent(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): TuningField {
  const raw = view.getFloat32(byteOffset, true);
  const range = { min: 0.0, max: 100.0 };
  const unit = '%';
  const value = lerp(raw, range, RoundingMode.Whole);
  return { raw, value, unit, range };
}
