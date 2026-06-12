import { describe, expect, it } from 'vitest';
import { parseStockNonStock } from '../../src/internal/parsers/parse-stock-non-stock';
import { makeIntView } from '../helper';

describe('parseStockNonStock', () => {
  const options = ['Stock', 'Non-Stock'];

  it('Stock', () =>
    expect(parseStockNonStock(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));
  it('Non-Stock', () =>
    expect(parseStockNonStock(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Non-Stock',
      options,
    }));
  it('Non-Stock (any other id)', () =>
    expect(parseStockNonStock(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Non-Stock',
      options,
    }));
});
