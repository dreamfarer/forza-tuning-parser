import { describe, expect, it } from 'vitest';
import { parseEngineSwap } from '../../src/internal/parse-engine-swap';
import { makeIntView } from '../helper';

describe('parseEngineSwap', () => {
  it('general', () => {
    expect(parseEngineSwap(makeIntView(0), 0)).toBe('Stock');
    expect(parseEngineSwap(makeIntView(1), 0)).toBe('1st Non-Stock');
    expect(parseEngineSwap(makeIntView(2), 0)).toBe('2nd Non-Stock');
    expect(parseEngineSwap(makeIntView(3), 0)).toBe('3rd Non-Stock');
    expect(parseEngineSwap(makeIntView(4), 0)).toBe('4th Non-Stock');
    expect(parseEngineSwap(makeIntView(5), 0)).toBe('5th Non-Stock');
    expect(parseEngineSwap(makeIntView(6), 0)).toBe('6th Non-Stock');
    expect(parseEngineSwap(makeIntView(7), 0)).toBe('7th Non-Stock');
    expect(parseEngineSwap(makeIntView(8), 0)).toBe('8th Non-Stock');
    expect(parseEngineSwap(makeIntView(9), 0)).toBe('9th Non-Stock');
    expect(parseEngineSwap(makeIntView(10), 0)).toBe('Invalid');
  });
});
