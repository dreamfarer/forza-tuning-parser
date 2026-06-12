import { describe, expect, it } from 'vitest';
import { parsePercent } from '../../src/internal/parsers/parse-percent';
import { makeFloatView } from '../helper';

describe('parsePercent', () => {
  const range = { min: 0.0, max: 100.0 };

  it('invalid', () => {
    expect(() => parsePercent(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(() => parsePercent(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parsePercent(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: 0.0,
      unit: '%',
      range,
    });
    expect(parsePercent(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 50.0,
      unit: '%',
      range,
    });
    expect(parsePercent(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 100.0,
      unit: '%',
      range,
    });
  });
});
