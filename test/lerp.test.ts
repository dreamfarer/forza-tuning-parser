import { describe, expect, it } from 'vitest';
import { lerp } from '../src/internal/lerp';

describe('lerp', () => {
  it('linearly interpolate between 0.0 and 1.0 (general case)', () => {
    expect(lerp(0.0, 0.0, 1.0)).toBe(0.0);
    expect(lerp(0.5, 0.0, 1.0)).toBe(0.5);
    expect(lerp(1.0, 0.0, 1.0)).toBe(1.0);
  });

  it('linearly interpolate between 1.0 and 3.8 (tyre pressure in bar)', () => {
    expect(lerp(0.0, 1.0, 3.8)).toBe(1.0);
    expect(lerp(0.5, 1.0, 3.8)).toBe(2.4);
    expect(lerp(1.0, 1.0, 3.8)).toBe(3.8);
  });

  it('linearly interpolate between 2.2 and 6.1 (final drive)', () => {
    expect(lerp(0.0, 2.2, 6.1)).toBe(2.2);
    expect(lerp(0.5, 2.2, 6.1)).toBe(4.15);
    expect(lerp(1.0, 2.2, 6.1)).toBe(6.1);
  });

  it('linearly interpolate between 0.48 and 6.0 (gear ratio)', () => {
    expect(lerp(0.0, 0.48, 6.0)).toBe(0.48);
    expect(lerp(0.5, 0.48, 6.0)).toBe(3.24);
    expect(lerp(1.0, 0.48, 6.0)).toBe(6.0);
  });

  it('linearly interpolate between -0.5 and 5.0 (camber, toe, front caster)', () => {
    expect(lerp(0.0, -0.5, 0.5)).toBe(-0.5);
    expect(lerp(0.5, -0.5, 0.5)).toBe(0.0);
    expect(lerp(1.0, -0.5, 0.5)).toBe(0.5);
  });

  it('linearly interpolate between 1.0 and 65.0 (anti-roll bar)', () => {
    expect(lerp(0.0, 1.0, 65.0)).toBe(1.0);
    expect(lerp(0.5, 1.0, 65.0)).toBe(33.0);
    expect(lerp(1.0, 1.0, 65.0)).toBe(65.0);
  });

  it('linearly interpolate between 0.0 and 20.0 (bump stiffness, rebound stiffness)', () => {
    expect(lerp(0.0, 0.0, 20.0)).toBe(0.0);
    expect(lerp(0.5, 0.0, 20.0)).toBe(10.0);
    expect(lerp(1.0, 0.0, 20.0)).toBe(20.0);
  });

  it('linearly interpolate between 0.0 and 100.0 (%, springs, ride height, aero, brake balance, differential)', () => {
    expect(lerp(0.0, 0.0, 100.0)).toBe(0.0);
    expect(lerp(0.5, 0.0, 100.0)).toBe(50.0);
    expect(lerp(1.0, 0.0, 100.0)).toBe(100.0);
  });

  it('linearly interpolate between 0.0 and 100.0 (%, brake force)', () => {
    expect(lerp(0.0, 0.0, 200.0)).toBe(0.0);
    expect(lerp(0.5, 0.0, 200.0)).toBe(100.0);
    expect(lerp(1.0, 0.0, 200.0)).toBe(200.0);
  });
});
