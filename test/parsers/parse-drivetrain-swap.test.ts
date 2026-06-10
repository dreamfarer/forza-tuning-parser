import { describe, expect, it } from 'vitest';
import { parseDrivetrainSwap } from '../../src/internal/parse-drivetrain-swap';
import { makeIntView } from '../helper';

describe('parseDrivetrainSwap', () => {
  it('Stock', () =>
    expect(parseDrivetrainSwap(makeIntView(0), 0)).toBe('Stock'));
  it('RWD', () =>
    expect(parseDrivetrainSwap(makeIntView(1), 0)).toBe(
      'RWD (AWD if only option)',
    ));
  it('AWD', () => expect(parseDrivetrainSwap(makeIntView(2), 0)).toBe('AWD'));
  it('AWD (for RWD cars)', () =>
    expect(parseDrivetrainSwap(makeIntView(1), 0)).toBe(
      'RWD (AWD if only option)',
    ));
  it('Invalid drivetrain swap', () =>
    expect(parseDrivetrainSwap(makeIntView(3), 0)).toBe('Invalid'));
});
