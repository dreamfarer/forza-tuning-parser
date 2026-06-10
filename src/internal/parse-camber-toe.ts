import { lerp } from './lerp';

/**
 * Parse a camber or toe angle value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed camber or toe angle in degrees between -5.0 and 5.0.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseCamberToe(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), -5, 5);
}
