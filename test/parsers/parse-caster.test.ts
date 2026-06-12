import { describe, expect, it } from 'vitest';
import { parseCaster } from '../../src/internal/parsers/parse-caster';
import { makeFloatView } from '../helper';

describe('parseCaster', () => {
  const range = { min: 1.0, max: 7.0 };

  it('invalid', () => {
    expect(() => parseCaster(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(() => parseCaster(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseCaster(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: 1.0,
      unit: '°',
      range,
    });
    expect(parseCaster(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 4.0,
      unit: '°',
      range,
    });
    expect(parseCaster(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 7.0,
      unit: '°',
      range,
    });
  });
});
