import { describe, expect, it } from 'vitest';
import { Position, UnitSystem } from '../../src/enums';
import { parseAero } from '../../src/internal/parsers/parse-aero';
import { makeFloatView } from '../helper';

describe('parseAero', () => {
  it('invalid', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    expect(() =>
      parseAero(makeFloatView(-0.1), 0, config, Position.Front),
    ).toThrow(RangeError);
    expect(() =>
      parseAero(makeFloatView(1.1), 0, config, Position.Front),
    ).toThrow(RangeError);
  });

  it('percentage fallback when no range is supplied', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    const range = { min: 0.0, max: 100.0 };
    expect(parseAero(makeFloatView(0.0), 0, config, Position.Front)).toEqual({
      raw: 0.0,
      value: 0,
      unit: '%',
      range,
    });
    expect(parseAero(makeFloatView(0.5), 0, config, Position.Front)).toEqual({
      raw: 0.5,
      value: 50,
      unit: '%',
      range,
    });
    expect(parseAero(makeFloatView(1.0), 0, config, Position.Rear)).toEqual({
      raw: 1.0,
      value: 100,
      unit: '%',
      range,
    });
  });

  it('imperial when ranges are supplied', () => {
    const range = { min: 100.0, max: 400.0 };
    const config = {
      unitSystem: UnitSystem.Imperial,
      aero: { front: range, rear: range },
    };
    expect(parseAero(makeFloatView(0.0), 0, config, Position.Front)).toEqual({
      raw: 0.0,
      value: 100.0,
      unit: 'lb',
      range,
    });
    expect(parseAero(makeFloatView(0.5), 0, config, Position.Rear)).toEqual({
      raw: 0.5,
      value: 250.0,
      unit: 'lb',
      range,
    });
  });

  it('metric when ranges are supplied', () => {
    const range = { min: 50.0, max: 200.0 };
    const config = {
      unitSystem: UnitSystem.Metric,
      aero: { front: range, rear: range },
    };
    expect(parseAero(makeFloatView(0.0), 0, config, Position.Front)).toEqual({
      raw: 0.0,
      value: 50.0,
      unit: 'kgf',
      range,
    });
    expect(parseAero(makeFloatView(1.0), 0, config, Position.Rear)).toEqual({
      raw: 1.0,
      value: 200.0,
      unit: 'kgf',
      range,
    });
  });
});
