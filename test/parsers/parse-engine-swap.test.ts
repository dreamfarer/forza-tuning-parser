import { describe, expect, it } from 'vitest';
import { parseEngineSwap } from '../../src/internal/parsers/parse-engine-swap';
import { makeIntView } from '../helper';

describe('parseEngineSwap', () => {
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

  it.each([
    [0, 'Stock'],
    [1, '1st Non-Stock'],
    [2, '2nd Non-Stock'],
    [3, '3rd Non-Stock'],
    [4, '4th Non-Stock'],
    [5, '5th Non-Stock'],
    [6, '6th Non-Stock'],
    [7, '7th Non-Stock'],
    [8, '8th Non-Stock'],
    [9, '9th Non-Stock'],
  ])('raw %i -> %s', (raw, selected) =>
    expect(parseEngineSwap(makeIntView(raw), 0)).toEqual({
      raw,
      selected,
      options,
    }));

  it('Invalid', () =>
    expect(() => parseEngineSwap(makeIntView(10), 0)).toThrow(RangeError));
});
