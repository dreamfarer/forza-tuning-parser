import { lerp } from './lerp';

/**
 * Parses a damping value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed damping value.
 *
 * @throws RangeError If the damping value is not between 1 and 20.
 */
export function parseDamping(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 1.0, 20.0);
}
