import { describe, expect, it } from 'vitest';
import { parseDrivetrainSwap } from '../../src/internal/parsers/parse-drivetrain-swap';
import { makeIntView } from '../helper';

describe('parseDrivetrainSwap', () => {
  const options = ['Stock', 'RWD', 'AWD'];

  it('Stock', () =>
    expect(parseDrivetrainSwap(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));
  it('RWD (AWD if only option)', () =>
    expect(parseDrivetrainSwap(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'RWD (AWD if only option)',
      options,
    }));
  it('AWD', () =>
    expect(parseDrivetrainSwap(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'AWD',
      options,
    }));
  it('Invalid drivetrain swap', () =>
    expect(() => parseDrivetrainSwap(makeIntView(3), 0)).toThrow(RangeError));
});
