/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the turbo upgrade.
 */
export function parseTurbo(
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
      return 'Street (Race w/ Anti-Lag if only option)';
    case 2:
      return 'Sport';
    case 3:
      return 'Race';
    case 4:
      return 'Race with Anti-Lag';
    default:
      return 'Invalid';
  }
}
