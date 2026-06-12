import { describe, expect, it } from 'vitest';
import { Position, UnitSystem } from '../../src/enums';
import { parseRideHeight } from '../../src/internal/parsers/parse-ride-height';
import { makeFloatView } from '../helper';

describe('parseRideHeight', () => {
  it('invalid', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    expect(() =>
      parseRideHeight(makeFloatView(-0.1), 0, config, Position.Front),
    ).toThrow(RangeError);
    expect(() =>
      parseRideHeight(makeFloatView(1.1), 0, config, Position.Front),
    ).toThrow(RangeError);
  });

  it('percentage fallback when no range is supplied', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    const range = { min: 0.0, max: 100.0 };
    expect(
      parseRideHeight(makeFloatView(0.5), 0, config, Position.Front),
    ).toEqual({ raw: 0.5, value: 50, unit: '%', range });
  });

  it('imperial when ranges are supplied', () => {
    const range = { min: 4.0, max: 12.0 };
    const config = {
      unitSystem: UnitSystem.Imperial,
      springs: { rideHeight: { front: range, rear: range } },
    };
    expect(
      parseRideHeight(makeFloatView(0.0), 0, config, Position.Front),
    ).toEqual({ raw: 0.0, value: 4.0, unit: 'in', range });
    expect(
      parseRideHeight(makeFloatView(0.5), 0, config, Position.Rear),
    ).toEqual({ raw: 0.5, value: 8.0, unit: 'in', range });
  });

  it('metric when ranges are supplied', () => {
    const range = { min: 10.0, max: 30.0 };
    const config = {
      unitSystem: UnitSystem.Metric,
      springs: { rideHeight: { front: range, rear: range } },
    };
    expect(
      parseRideHeight(makeFloatView(0.0), 0, config, Position.Front),
    ).toEqual({ raw: 0.0, value: 10.0, unit: 'cm', range });
    expect(
      parseRideHeight(makeFloatView(1.0), 0, config, Position.Rear),
    ).toEqual({ raw: 1.0, value: 30.0, unit: 'cm', range });
  });
});
