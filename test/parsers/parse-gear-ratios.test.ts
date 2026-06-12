import { describe, expect, it } from 'vitest';
import { parseGearRatios } from '../../src/internal/parsers/parse-gear-ratios';
import { makeGearRatioView } from '../helper';

describe('parseGearRatios', () => {
  const range = { min: 0.48, max: 6.0 };

  const field = (raw: number, value: number) => ({
    raw,
    value,
    unit: null,
    range,
  });

  it('invalid', () => {
    expect(() =>
      parseGearRatios(makeGearRatioView(Array(10).fill(-0.1)), 0),
    ).toThrow(RangeError);
    expect(() =>
      parseGearRatios(makeGearRatioView(Array(10).fill(1.1)), 0),
    ).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseGearRatios(makeGearRatioView(Array(10).fill(0.0)), 0)).toEqual(
      Array(10).fill(field(0.0, 0.48)),
    );
    expect(parseGearRatios(makeGearRatioView(Array(10).fill(0.5)), 0)).toEqual(
      Array(10).fill(field(0.5, 3.24)),
    );
    expect(parseGearRatios(makeGearRatioView(Array(10).fill(1.0)), 0)).toEqual(
      Array(10).fill(field(1.0, 6.0)),
    );
  });

  it('skips absent gears (-1)', () => {
    const values = [0.0, 0.5, 1.0, -1, -1, -1, -1, -1, -1, -1];
    expect(parseGearRatios(makeGearRatioView(values), 0)).toEqual([
      field(0.0, 0.48),
      field(0.5, 3.24),
      field(1.0, 6.0),
    ]);
  });
});
