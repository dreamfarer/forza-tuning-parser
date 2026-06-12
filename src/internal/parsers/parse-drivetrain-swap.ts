import type { UpgradeField } from '../../types';

const options = ['Stock', 'RWD', 'AWD'];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string | null {
  switch (raw % 1000) {
    case 0:
      return 'Stock';
    case 1:
      return 'RWD (AWD if only option)';
    case 2:
      return 'AWD';
    default:
      return null;
  }
}

/**
 * Parse the drivetrain swap upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed drivetrain swap upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseDrivetrainSwap(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === null) throw new RangeError('Invalid upgrade ID');
  return { raw, selected, options };
}
