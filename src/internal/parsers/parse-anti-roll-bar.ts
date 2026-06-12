import { RoundingMode } from '../../enums';
import type { TuningField } from '../../types';
import { lerp } from '../lerp';

/**
 * Parse an anti-roll bar stiffness from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed anti-roll bar stiffness as a {@link TuningField} object.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseAntiRollBar(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): TuningField {
  const raw = view.getFloat32(byteOffset, true);
  const unit = null;
  const range = { min: 1.0, max: 65.0 };
  const value = lerp(raw, range, RoundingMode.SingleDigit);
  return { raw, value, unit, range };
}
