import { describe, expect, it } from 'vitest';
import { Position, UnitSystem } from '../../src/enums';
import { parseSpringStiffness } from '../../src/internal/parsers/parse-spring-stiffness';
import { makeFloatView } from '../helper';

describe('parseSpringStiffness', () => {
  it('invalid', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    expect(() =>
      parseSpringStiffness(makeFloatView(-0.1), 0, config, Position.Front),
    ).toThrow(RangeError);
    expect(() =>
      parseSpringStiffness(makeFloatView(1.1), 0, config, Position.Front),
    ).toThrow(RangeError);
  });

  it('percentage fallback when no range is supplied', () => {
    const config = { unitSystem: UnitSystem.Imperial };
    const range = { min: 0.0, max: 100.0 };
    expect(
      parseSpringStiffness(makeFloatView(0.5), 0, config, Position.Front),
    ).toEqual({ raw: 0.5, value: 50, unit: '%', range });
  });

  it('imperial when ranges are supplied', () => {
    const range = { min: 100.0, max: 500.0 };
    const config = {
      unitSystem: UnitSystem.Imperial,
      springs: { stiffness: { front: range, rear: range } },
    };
    expect(
      parseSpringStiffness(makeFloatView(0.0), 0, config, Position.Front),
    ).toEqual({ raw: 0.0, value: 100.0, unit: 'lb/in', range });
    expect(
      parseSpringStiffness(makeFloatView(0.5), 0, config, Position.Rear),
    ).toEqual({ raw: 0.5, value: 300.0, unit: 'lb/in', range });
  });

  it('metric when ranges are supplied', () => {
    const range = { min: 10.0, max: 50.0 };
    const config = {
      unitSystem: UnitSystem.Metric,
      springs: { stiffness: { front: range, rear: range } },
    };
    expect(
      parseSpringStiffness(makeFloatView(0.0), 0, config, Position.Front),
    ).toEqual({ raw: 0.0, value: 10.0, unit: 'kgf/mm', range });
    expect(
      parseSpringStiffness(makeFloatView(1.0), 0, config, Position.Rear),
    ).toEqual({ raw: 1.0, value: 50.0, unit: 'kgf/mm', range });
  });
});
