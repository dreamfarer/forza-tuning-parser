import type { UpgradeField } from '../../types';

const options = ['No Intercooler', 'Stock', 'Street', 'Sport', 'Race'];

/**
 * Get the upgrade name from the raw upgrade ID.
 */
function getUpgrade(raw: number): string | null {
  switch (raw % 100) {
    case -1:
      return 'No Intercooler';
    case 0:
      return 'Stock (Street if No Intercooler possible)';
    case 1:
      return 'Street (Sport if No Intercooler possible)';
    case 2:
      return 'Sport (Race if No Intercooler possible)';
    case 3:
      return 'Race';
    default:
      return null;
  }
}

/**
 * Parse the intercooler upgrade from a binary Forza tuning file.
 *
 * @param view The DataView to read from.
 * @param byteOffset The byte offset to read from.
 *
 * @returns The parsed intercooler upgrade.
 *
 * @throws RangeError If the upgrade ID is invalid.
 */
export function parseIntercooler(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
): UpgradeField {
  const raw = view.getInt32(byteOffset, true);
  const selected = getUpgrade(raw);
  if (selected === null) throw new RangeError('Invalid upgrade ID');
  return { raw, selected, options };
}
