import { lerp } from './lerp';

/**
 * Parses a spring stiffness value from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed spring stiffness value.
 *
 * @throws RangeError If the spring stiffness value is not between 0 and 100.
 */
export function parseSpringStiffness(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return lerp(view.getFloat32(byteOffset, true), 0.0, 100.0);
}
