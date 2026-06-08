/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the intercooler upgrade.
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
      return 'Unknown';
  }
}
