import { describe, expect, it } from 'vitest';
import { parseDifferential } from '../../src/internal/parsers/parse-differential';
import { makeIntView } from '../helper';

describe('parseDifferential', () => {
  const options = [
    'Stock',
    'Street',
    'Sport',
    'Race',
    'Rally',
    'Drift',
    'Off-Road',
  ];

  it('Stock', () =>
    expect(parseDifferential(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));
  it('Street', () =>
    expect(parseDifferential(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Street',
      options,
    }));
  it('Sport', () =>
    expect(parseDifferential(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Sport',
      options,
    }));
  it('Race', () =>
    expect(parseDifferential(makeIntView(3), 0)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));
  it('Rally', () =>
    expect(parseDifferential(makeIntView(4), 0)).toEqual({
      raw: 4,
      selected: 'Rally',
      options,
    }));
  it('Drift (Rally if FWD)', () =>
    expect(parseDifferential(makeIntView(5), 0)).toEqual({
      raw: 5,
      selected: 'Drift (Rally if FWD)',
      options,
    }));
  it('Off-Road', () =>
    expect(parseDifferential(makeIntView(6), 0)).toEqual({
      raw: 6,
      selected: 'Off-Road',
      options,
    }));
  it('Off-Road (alternate id)', () =>
    expect(parseDifferential(makeIntView(7), 0)).toEqual({
      raw: 7,
      selected: 'Off-Road',
      options,
    }));
  it('Invalid differential', () =>
    expect(() => parseDifferential(makeIntView(8), 0)).toThrow(RangeError));
});
