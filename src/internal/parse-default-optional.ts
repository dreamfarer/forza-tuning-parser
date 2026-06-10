/**
 * Parse an arbitrary upgrade grade (null, stock, street, sport, race) from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 *  @returns The parsed upgrade grade.
 */
export function parseDefaultOptional(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): string | null {
  const upgradeId = view.getInt32(byteOffset, true);
  const upgradeGrade = upgradeId % 1000;
  switch (upgradeGrade) {
    case -1:
      return null;
    case 0:
      return 'Stock';
    case 1:
      return 'Street';
    case 2:
      return 'Sport';
    case 3:
      return 'Race';
    default:
      return 'Invalid';
  }
}
