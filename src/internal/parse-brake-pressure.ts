import { lerp } from './lerp';

/**
 * Parse a brake pressure value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed brake pressure value between 0.0 and 200.0.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseBrakePressure(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 0.0, 200.0);
}
