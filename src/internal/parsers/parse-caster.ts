import { RoundingMode } from '../../enums';
import type { TuningField } from '../../types';
import { lerp } from '../lerp';

/**
 * Parse a caster angle value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed caster angle as a {@link TuningField} object.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseCaster(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): TuningField {
  const raw = view.getFloat32(byteOffset, true);
  const range = { min: 1.0, max: 7.0 };
  const unit = '°';
  const value = lerp(
    view.getFloat32(byteOffset, true),
    range,
    RoundingMode.SingleDigit,
  );
  return { raw, value, unit, range };
}
