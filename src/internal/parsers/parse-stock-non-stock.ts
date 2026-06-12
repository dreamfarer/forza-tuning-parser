import type { UpgradeField } from '../../types';

const options = ['Stock', 'Non-Stock'];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string {
  switch (raw % 1000) {
    case 0:
      return 'Stock';
    default:
      return 'Non-Stock';
  }
}

/**
 * Parse an arbitrary upgrade grade (stock, non-stock) from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed upgrade grade.
 */
export function parseStockNonStock(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  return { raw, selected, options };
}
