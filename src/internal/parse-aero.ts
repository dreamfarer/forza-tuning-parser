import { lerp } from './lerp';

/**
 * Parse aero from a float value.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed aero value.
 *
 * @throws RangeError If the aero value is not between 0 and 100.
 */
export function parseAero(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 0.0, 100.0);
}
