import type { UpgradeField } from '../../types';

const options = ['Stock', 'Street', 'Sport', 'Race', 'Race with Anti-Lag'];

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
      return 'Street (Race w/ Anti-Lag if only option)';
    case 2:
      return 'Sport';
    case 3:
      return 'Race';
    case 4:
      return 'Race with Anti-Lag';
    default:
      return undefined;
  }
}

/**
 * Parse the turbo upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed turbo upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseTurbo(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField | null {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === undefined) throw new RangeError('Invalid upgrade ID');
  if (selected === null) return null;
  return { raw, selected, options };
}
