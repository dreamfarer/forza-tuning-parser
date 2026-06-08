/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the transmission upgrade.
 */
export function parseTransmission(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
  gearRatios: number[],
): string {
  const numGears = gearRatios.filter((ratio) => ratio > 0).length;
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
    case 5:
    case 6:
    case 7:
      return `Race: ${numGears}-Speed`;
    case 8:
      return `Drift: 4-Speed`;
    default:
      return 'Invalid';
  }
}
