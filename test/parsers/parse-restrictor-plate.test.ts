import { describe, expect, it } from 'vitest';
import { parseRestrictorPlate } from '../../src/internal/parsers/parse-restrictor-plate';
import { makeIntView } from '../helper';

describe('parseRestrictorPlate', () => {
  const options = ['Stock', 'No Restrictor Plate', 'Remove Restrictor'];

  it('null for absent restrictor plate', () =>
    expect(parseRestrictorPlate(makeIntView(-1), 0)).toBeNull());
  it('Stock', () =>
    expect(parseRestrictorPlate(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));
  it('No Restrictor Plate', () =>
    expect(parseRestrictorPlate(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'No Restrictor Plate',
      options,
    }));
  it('Remove Restrictor', () =>
    expect(parseRestrictorPlate(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Remove Restrictor',
      options,
    }));
  it('Invalid', () =>
    expect(() => parseRestrictorPlate(makeIntView(3), 0)).toThrow(RangeError));
});
