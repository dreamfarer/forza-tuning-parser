import { describe, expect, it } from 'vitest';
import { parseBumpRebound } from '../../src/internal/parsers/parse-bump-rebound';
import { makeFloatView } from '../helper';

describe('parseBumpRebound', () => {
  const range = { min: 1.0, max: 20.0 };

  it('invalid', () => {
    expect(() => parseBumpRebound(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(() => parseBumpRebound(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseBumpRebound(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: 1.0,
      unit: null,
      range,
    });
    expect(parseBumpRebound(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 10.5,
      unit: null,
      range,
    });
    expect(parseBumpRebound(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 20.0,
      unit: null,
      range,
    });
  });
});
