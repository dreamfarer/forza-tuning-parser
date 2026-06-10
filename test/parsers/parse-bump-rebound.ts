import { describe, expect, it } from 'vitest';
import { parseBumpRebound } from '../../src/internal/parse-bump-rebound';
import { makeFloatView } from '../helper';

describe('parseBumpRebound', () => {
  it('general', () => {
    expect(() => parseBumpRebound(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseBumpRebound(makeFloatView(0.0), 0)).toBe(1.0);
    expect(parseBumpRebound(makeFloatView(0.5), 0)).toBe(10.5);
    expect(parseBumpRebound(makeFloatView(1.0), 0)).toBe(20.0);
    expect(() => parseBumpRebound(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
