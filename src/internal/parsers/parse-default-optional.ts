import type { UpgradeField } from '../../types';

const options = ['Stock', 'Street', 'Sport', 'Race'];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string | null | undefined {
  switch (raw % 1000) {
    case -1:
      return null;
    case 0:
      return 'Stock';
    case 1:
      return 'Street';
    case 2:
      return 'Sport';
    case 3:
      return 'Race';
    default:
      return undefined;
  }
}

/**
 * Parse an arbitrary upgrade grade (stock, street, sport, race) from a binary Forza tuning file.
 * This version allows for an upgrade to be null (optional).
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed upgrade grade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseDefaultOptional(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField | null {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === undefined) throw new RangeError('Invalid upgrade ID');
  if (selected === null) return null;
  return { raw, selected, options };
}
