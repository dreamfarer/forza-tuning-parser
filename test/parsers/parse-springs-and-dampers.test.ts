import { describe, expect, it } from 'vitest';
import { parseSpringsAndDampers } from '../../src/internal/parsers/parse-springs-and-dampers';
import { makeIntView } from '../helper';

describe('parseSpringsAndDampers', () => {
  const options = [
    'Stock',
    'Street',
    'Sport',
    'Race',
    'Rally',
    'Drift',
    'Off-Road',
  ];

  it('Invalid springs and dampers', () => {
    expect(() => parseSpringsAndDampers(makeIntView(-1), 0)).toThrow(
      RangeError,
    );
    expect(() => parseSpringsAndDampers(makeIntView(8), 0)).toThrow(RangeError);
  });

  it('Stock', () =>
    expect(parseSpringsAndDampers(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));

  it('Street', () =>
    expect(parseSpringsAndDampers(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Street',
      options,
    }));

  it('Sport', () =>
    expect(parseSpringsAndDampers(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Sport',
      options,
    }));

  it('Race', () =>
    expect(parseSpringsAndDampers(makeIntView(3), 0)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));

  it('Rally', () =>
    expect(parseSpringsAndDampers(makeIntView(4), 0)).toEqual({
      raw: 4,
      selected: 'Rally',
      options,
    }));

  it('Drift', () =>
    expect(parseSpringsAndDampers(makeIntView(5), 0)).toEqual({
      raw: 5,
      selected: 'Drift',
      options,
    }));

  it('Off-Road', () =>
    expect(parseSpringsAndDampers(makeIntView(6), 0)).toEqual({
      raw: 6,
      selected: 'Off-Road',
      options,
    }));
});
