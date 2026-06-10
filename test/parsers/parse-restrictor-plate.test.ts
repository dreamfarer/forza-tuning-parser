import { describe, expect, it } from 'vitest';
import { parseRestrictorPlate } from '../../src/internal/parse-restrictor-plate';
import { makeIntView } from '../helper';

describe('parseRestrictorPlate', () => {
  it('general', () => {
    expect(parseRestrictorPlate(makeIntView(-1), 0)).toBeNull();
    expect(parseRestrictorPlate(makeIntView(0), 0)).toBe('Stock');
    expect(parseRestrictorPlate(makeIntView(1), 0)).toBe('No Restrictor Plate');
    expect(parseRestrictorPlate(makeIntView(2), 0)).toBe('Remove Restrictor');
    expect(parseRestrictorPlate(makeIntView(3), 0)).toBe('Invalid');
  });
});
