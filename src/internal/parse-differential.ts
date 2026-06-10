/**
 * Parse the differential upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed differential upgrade.
 */
export function parseDifferential(
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
    case 4:
      return 'Rally';
    case 5:
      return 'Drift (Rally if FWD)';
    case 6:
    case 7:
      return 'Off-Road';
    default:
      return 'Invalid';
  }
}
