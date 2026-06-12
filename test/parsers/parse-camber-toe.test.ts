import { describe, expect, it } from 'vitest';
import { parseCamberToe } from '../../src/internal/parsers/parse-camber-toe';
import { makeFloatView } from '../helper';

describe('parseCamberToe', () => {
  const range = { min: -5, max: 5 };

  it('invalid', () => {
    expect(() => parseCamberToe(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(() => parseCamberToe(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseCamberToe(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: -5.0,
      unit: '°',
      range,
    });
    expect(parseCamberToe(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 0.0,
      unit: '°',
      range,
    });
    expect(parseCamberToe(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 5.0,
      unit: '°',
      range,
    });
  });
});
