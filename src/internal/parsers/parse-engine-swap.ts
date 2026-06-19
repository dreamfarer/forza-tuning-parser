import type { UpgradeField } from '../../types';

const options = [
  'Stock',
  '1st Non-Stock',
  '2nd Non-Stock',
  '3rd Non-Stock',
  '4th Non-Stock',
  '5th Non-Stock',
  '6th Non-Stock',
  '7th Non-Stock',
  '8th Non-Stock',
  '9th Non-Stock',
];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string | null {
  switch (raw % 100) {
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
      return null;
  }
}

/**
 * Parse the engine swap upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed engine swap upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseEngineSwap(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === null) throw new RangeError('Invalid upgrade ID');
  return { raw, selected, options };
}
