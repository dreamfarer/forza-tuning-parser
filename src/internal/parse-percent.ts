import { lerp } from './lerp';

/**
 * Parse a float value to per cent.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed brake balance value.
 *
 * @throws RangeError If the brake balance value is not between 0 and 100.
 */
export function parsePercent(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 0.0, 100.0);
}
