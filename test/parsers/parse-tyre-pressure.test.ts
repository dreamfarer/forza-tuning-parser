import { describe, expect, it } from 'vitest';
import { UnitSystem } from '../../src/enums';
import { parseTyrePressure } from '../../src/internal/parse-tyre-pressure';
import { makeFloatView } from '../helper';

describe('parseTyrePressure', () => {
  it('invalid', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    expect(() => parseTyrePressure(makeFloatView(-0.1), 0, config)).toThrow(
      RangeError,
    );
    expect(() => parseTyrePressure(makeFloatView(1.1), 0, config)).toThrow(
      RangeError,
    );
  })

  it('imperial', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    expect(parseTyrePressure(makeFloatView(0.0), 0, config)).toEqual({
      raw: 0.0,
      value: 15.0,
      unit: 'psi',
      range: { min: 15.0, max: 55.0 },
    });
    expect(parseTyrePressure(makeFloatView(0.5), 0, config)).toEqual({
      raw: 0.5,
      value: 35.0,
      unit: 'psi',
      range: { min: 15.0, max: 55.0 },
    });
    expect(parseTyrePressure(makeFloatView(1.0), 0, config)).toEqual({
      raw: 1.0,
      value: 55.0,
      unit: 'psi',
      range: { min: 15.0, max: 55.0 },
    });
  });

  it('metric', () => {
    const config = { unitSystem: UnitSystem.Metric };
    expect(parseTyrePressure(makeFloatView(0.0), 0, config)).toEqual({
      raw: 0.0,
      value: 1.0,
      unit: 'bar',
      range: { min: 1.0, max: 3.8 },
    });
    expect(parseTyrePressure(makeFloatView(0.5), 0, config)).toEqual({
      raw: 0.5,
      value: 2.4,
      unit: 'bar',
      range: { min: 1.0, max: 3.8 },
    });
    expect(parseTyrePressure(makeFloatView(1.0), 0, config)).toEqual({
      raw: 1.0,
      value: 3.8,
      unit: 'bar',
      range: { min: 1.0, max: 3.8 },
    });
  });
});
