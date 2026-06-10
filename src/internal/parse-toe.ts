import { lerp } from './lerp';

/**
 * Parses a toe value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed toe value.
 *
 * @throws RangeError If the toe value is not between -5 and 5.
 */
export function parseToe(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), -5, 5);
}
