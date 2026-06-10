import { describe, expect, it } from 'vitest';
import { parseDifferential } from '../../src/internal/parse-differential';
import { makeIntView } from '../helper';

describe('parseDifferential', () => {
  it('Stock', () => expect(parseDifferential(makeIntView(0), 0)).toBe('Stock'));
  it('Street', () =>
    expect(parseDifferential(makeIntView(1), 0)).toBe('Street'));
  it('Sport', () => expect(parseDifferential(makeIntView(2), 0)).toBe('Sport'));
  it('Race', () => expect(parseDifferential(makeIntView(3), 0)).toBe('Race'));
  it('Rally', () => expect(parseDifferential(makeIntView(4), 0)).toBe('Rally'));
  it('Drift', () =>
    expect(parseDifferential(makeIntView(5), 0)).toBe('Drift (Rally if FWD)'));
  it('Off-Road', () =>
    expect(parseDifferential(makeIntView(6), 0)).toBe('Off-Road'));
  it('Rally (if FWD)', () =>
    expect(parseDifferential(makeIntView(5), 0)).toBe('Drift (Rally if FWD)'));
  it('Off-Road (if FWD)', () =>
    expect(parseDifferential(makeIntView(7), 0)).toBe('Off-Road'));
  it('Invalid differential', () =>
    expect(parseDifferential(makeIntView(8), 0)).toBe('Invalid'));
});
