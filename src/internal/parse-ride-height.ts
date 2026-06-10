import { lerp } from './lerp';

/**
 * Parse ride height from a float value.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed ride height value.
 *
 * @throws RangeError If the ride height value is not between 0 and 100.
 */
export function parseRideHeight(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 0.0, 100.0);
}
