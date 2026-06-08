/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the restrictor plate upgrade.
 */
export function parseRestrictorPlate(
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
      return 'No Restrictor Plate';
    case 2:
      return 'Remove Restrictor';
    default:
      return 'Invalid';
  }
}
