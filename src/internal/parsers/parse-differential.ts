import type { UpgradeField } from '../../types';

const options = [
  'Stock',
  'Street',
  'Sport',
  'Race',
  'Rally',
  'Drift',
  'Off-Road',
];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string | null {
  switch (raw % 100) {
    case 0:
      return 'Stock';
    case 1:
      return 'Street';
    case 2:
      return 'Sport';
    case 3:
      return 'Race';
    case 4:
      return 'Rally';
    case 5:
      return 'Drift (Rally if FWD)';
    case 6:
    case 7:
      return 'Off-Road';
    default:
      return null;
  }
}

/**
 * Parse the differential upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed differential upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseDifferential(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === null) throw new RangeError('Invalid upgrade ID');
  return { raw, selected, options };
}
