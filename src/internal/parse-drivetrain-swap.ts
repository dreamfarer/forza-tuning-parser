/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the drivetrain swap upgrade.
 */
export function parseDrivetrainSwap(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): string {
  const upgradeId = view.getInt32(byteOffset, true);
  const upgradeGrade = upgradeId % 1000;
  switch (upgradeGrade) {
    case 0:
      return 'Stock';
    case 1:
      return 'RWD (AWD if only option)';
    case 2:
      return 'AWD';
    default:
      return 'Invalid';
  }
}
