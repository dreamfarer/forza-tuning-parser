import type { UpgradeField } from '../../types';

const options = ['Stock', 'No Restrictor Plate', 'Remove Restrictor'];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string | null | undefined {
  switch (raw % 100) {
    case -1:
      return null;
    case 0:
      return 'Stock';
    case 1:
      return 'No Restrictor Plate';
    case 2:
      return 'Remove Restrictor';
    default:
      return undefined;
  }
}

/**
 * Parse the restrictor plate upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed restrictor plate upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseRestrictorPlate(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField | null {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === undefined) throw new RangeError('Invalid upgrade ID');
  if (selected === null) return null;
  return { raw, selected, options };
}
