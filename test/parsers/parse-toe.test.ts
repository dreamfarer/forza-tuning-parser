import { describe, expect, it } from 'vitest';
import { parseToe } from '../../src/internal/parse-toe';
import { makeFloatView } from '../helper';

describe('parseToe', () => {
  it('general', () => {
    expect(() => parseToe(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseToe(makeFloatView(0.0), 0)).toBe(-5.0);
    expect(parseToe(makeFloatView(0.5), 0)).toBe(0.0);
    expect(parseToe(makeFloatView(1.0), 0)).toBe(5.0);
    expect(() => parseToe(makeFloatView(5.1), 0)).toThrow(RangeError);
  });
});
