import { lerp } from './lerp';

/**
 * Parse a caster angle value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed caster angle in degrees between 0.0 and 7.0.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseCaster(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 1.0, 7.0);
}
