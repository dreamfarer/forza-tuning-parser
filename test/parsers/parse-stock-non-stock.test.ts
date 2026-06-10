import { describe, expect, it } from 'vitest';
import { parseStockNonStock } from '../../src/internal/parse-stock-non-stock';
import { makeIntView } from '../helper';

describe('parseStockNonStock', () => {
  it('general', () => {
    expect(parseStockNonStock(makeIntView(0), 0)).toBe('Stock');
    expect(parseStockNonStock(makeIntView(1), 0)).toBe('Non-Stock');
  });
});
