import { describe, expect, it } from 'vitest';
import { parseTurbo } from '../../src/internal/parsers/parse-turbo';
import { makeIntView } from '../helper';

describe('parseTurbo', () => {
  const options = ['Stock', 'Street', 'Sport', 'Race', 'Race with Anti-Lag'];

  it('null for absent turbo upgrade', () =>
    expect(parseTurbo(makeIntView(-1), 0)).toBeNull());
  it('Stock', () =>
    expect(parseTurbo(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));
  it('Street (Race w/ Anti-Lag if only option)', () =>
    expect(parseTurbo(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Street (Race w/ Anti-Lag if only option)',
      options,
    }));
  it('Sport', () =>
    expect(parseTurbo(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Sport',
      options,
    }));
  it('Race', () =>
    expect(parseTurbo(makeIntView(3), 0)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));
  it('Race with Anti-Lag', () =>
    expect(parseTurbo(makeIntView(4), 0)).toEqual({
      raw: 4,
      selected: 'Race with Anti-Lag',
      options,
    }));
  it('Invalid turbo option', () =>
    expect(() => parseTurbo(makeIntView(5), 0)).toThrow(RangeError));
});
