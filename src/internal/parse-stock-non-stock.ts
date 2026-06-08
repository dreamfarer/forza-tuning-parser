/**
 * Parse an Int32 in a binary Forza tuning file into a string, representing the upgrade where it can only be distinuished between stock and non-stock.
 */
export function parseStockNonStock(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): string {
  const upgradeId = view.getInt32(byteOffset, true);
  const upgradeGrade = upgradeId % 1000;
  switch (upgradeGrade) {
    case 0:
      return 'Stock';
    default:
      return 'Non-Stock';
  }
}
