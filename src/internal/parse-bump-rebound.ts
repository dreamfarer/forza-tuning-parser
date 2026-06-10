import { lerp } from './lerp';

/**
 * Parse a bump or rebound stiffness value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed bump or rebound stiffness value.
 *
 * @throws RangeError If the raw value is not between 1 and 20.
 */
export function parseBumpRebound(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 1.0, 20.0);
}
