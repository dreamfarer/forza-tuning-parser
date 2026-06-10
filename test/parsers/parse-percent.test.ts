import { describe, expect, it } from 'vitest';
import { parsePercent } from '../../src/internal/parse-percent';
import { makeFloatView } from '../helper';

describe('parsePercent', () => {
  it('general', () => {
    expect(() => parsePercent(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parsePercent(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parsePercent(makeFloatView(0.5), 0)).toBe(50.0);
    expect(parsePercent(makeFloatView(1.0), 0)).toBe(100.0);
    expect(() => parsePercent(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
