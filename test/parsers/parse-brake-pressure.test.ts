import { describe, expect, it } from 'vitest';
import { parseBrakePressure } from '../../src/internal/parsers/parse-brake-pressure';
import { makeFloatView } from '../helper';

describe('parseBrakePressure', () => {
  const range = { min: 0.0, max: 200.0 };

  it('invalid', () => {
    expect(() => parseBrakePressure(makeFloatView(-0.1), 0)).toThrow(
      RangeError,
    );
    expect(() => parseBrakePressure(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseBrakePressure(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: 0.0,
      unit: null,
      range,
    });
    expect(parseBrakePressure(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 100.0,
      unit: null,
      range,
    });
    expect(parseBrakePressure(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 200.0,
      unit: null,
      range,
    });
  });
});
