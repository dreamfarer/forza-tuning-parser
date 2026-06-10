import { lerp } from './lerp';

/**
 * Parses the final drive ratio from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed final drive ratio between 2.2 and 6.1.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseFinalDrive(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 2.2, 6.1);
}
