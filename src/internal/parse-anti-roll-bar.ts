import { lerp } from './lerp';

/**
 * Parse an anti-roll bar stiffness value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed anti-roll bar stiffness value between 1.0 and 65.0.
 *
 * @throws RangeError If the raw float value is not between 0 and 1.
 */
export function parseAntiRollBar(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 1.0, 65.0);
}
