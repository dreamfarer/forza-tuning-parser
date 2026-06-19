import { describe, expect, it } from 'vitest';
import { parseDefault } from '../../src/internal/parsers/parse-default';
import { makeIntView } from '../helper';

describe('parseDefault', () => {
  const options = ['Stock', 'Street', 'Sport', 'Race'];

  it('Stock', () =>
    expect(parseDefault(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));

  it('Street', () =>
    expect(parseDefault(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Street',
      options,
    }));

  it('Sport', () =>
    expect(parseDefault(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Sport',
      options,
    }));

  it('Race', () =>
    expect(parseDefault(makeIntView(3), 0)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));

  it('Invalid (negative)', () =>
    expect(() => parseDefault(makeIntView(-1), 0)).toThrow(RangeError));

  it('Invalid (out of range)', () =>
    expect(() => parseDefault(makeIntView(4), 0)).toThrow(RangeError));
});
