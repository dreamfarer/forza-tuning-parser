import { describe, expect, it } from 'vitest';
import { parseDefaultOptional } from '../../src/internal/parsers/parse-default-optional';
import { makeIntView } from '../helper';

describe('parseDefaultOptional', () => {
  const options = ['Stock', 'Street', 'Sport', 'Race'];

  it('null for absent upgrade', () =>
    expect(parseDefaultOptional(makeIntView(-1), 0)).toBeNull());

  it('Stock', () =>
    expect(parseDefaultOptional(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));

  it('Street', () =>
    expect(parseDefaultOptional(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Street',
      options,
    }));

  it('Sport', () =>
    expect(parseDefaultOptional(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Sport',
      options,
    }));

  it('Race', () =>
    expect(parseDefaultOptional(makeIntView(3), 0)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));

  it('Invalid', () =>
    expect(() => parseDefaultOptional(makeIntView(4), 0)).toThrow(RangeError));
});
