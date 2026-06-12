import { describe, expect, it } from 'vitest';
import { parseAntiRollBar } from '../../src/internal/parsers/parse-anti-roll-bar';
import { makeFloatView } from '../helper';

describe('parseAntiRollBar', () => {
  const range = { min: 1.0, max: 65.0 };

  it('invalid', () => {
    expect(() => parseAntiRollBar(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(() => parseAntiRollBar(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseAntiRollBar(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: 1.0,
      unit: null,
      range,
    });
    expect(parseAntiRollBar(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 33.0,
      unit: null,
      range,
    });
    expect(parseAntiRollBar(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 65.0,
      unit: null,
      range,
    });
  });
});
