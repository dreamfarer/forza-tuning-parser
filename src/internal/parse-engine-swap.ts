/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the engine swap upgrade.
 */
export function parseEngineSwap(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): string {
  const upgradeId = view.getInt32(byteOffset, true);
  const upgradeGrade = upgradeId % 1000;
  switch (upgradeGrade) {
    case 0:
      return 'Stock';
    case 1:
      return '1st Non-Stock';
    case 2:
      return '2nd Non-Stock';
    case 3:
      return '3rd Non-Stock';
    case 4:
      return '4th Non-Stock';
    case 5:
      return '5th Non-Stock';
    case 6:
      return '6th Non-Stock';
    case 7:
      return '7th Non-Stock';
    case 8:
      return '8th Non-Stock';
    case 9:
      return '9th Non-Stock';
    default:
      return 'Invalid';
  }
}
