/**
 * Parse the intercooler upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed intercooler upgrade.
 */
export function parseDefaultIntercooler(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): string {
  const upgradeId = view.getInt32(byteOffset, true);
  const upgradeGrade = upgradeId % 1000;
  switch (upgradeGrade) {
    case -1:
      return 'No Intercooler';
    case 0:
      return 'Stock (Street if No Intercooler possible)';
    case 1:
      return 'Street (Sport if No Intercooler possible)';
    case 2:
      return 'Sport (Race if No Intercooler possible)';
    case 3:
      return 'Race';
    default:
      return 'Invalid';
  }
}
