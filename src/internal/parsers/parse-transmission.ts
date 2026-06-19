import type { UpgradeField } from '../../types';

const options = [
  'Stock',
  'Street',
  'Sport',
  'Race',
  'Race: 6-Speed',
  'Race: 7-Speed',
  'Race: 8-Speed',
  'Race: 9-Speed',
  'Race: 10-Speed',
  'Drift: 4-Speed',
];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number, numGears: number): string | null {
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
    case 5:
    case 6:
    case 7:
      return `Race: ${numGears}-Speed`;
    case 8:
      return `Drift: 4-Speed`;
    default:
      return null;
  }
}

/**
 * Parse the transmission upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 * @param numGears The number of gears in the car.
 *
 * @returns The parsed transmission upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseTransmission(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
  numGears: number,
): UpgradeField {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw, numGears);
  if (selected === null) throw new RangeError('Invalid upgrade ID');
  return { raw, selected, options };
}
