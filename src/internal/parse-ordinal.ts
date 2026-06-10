/**
 * Parse the car ordinal from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The car ordinal.
 */
export function parseOrdinal(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): number {
  return view.getInt32(byteOffset, true);
}
