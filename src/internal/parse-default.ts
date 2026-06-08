/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the default upgrade (stock, street, sport, race).
 */
export function parseDefault(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): string {
  const upgradeId = view.getInt32(byteOffset, true);
  const upgradeGrade = upgradeId % 1000;
  switch (upgradeGrade) {
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
