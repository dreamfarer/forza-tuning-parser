import { lerp } from './lerp';

/**
 * Parses a tyre pressure value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed tyre pressure value.
 *
 * @throws RangeError If the tyre pressure value is not between 15 and 55 PSI.
 */
export function parseTyrePressure(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 15.0, 55.0);
}
