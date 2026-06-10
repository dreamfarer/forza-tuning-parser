import { describe, expect, it } from 'vitest';
import { parseBrakeBalance } from '../../src/internal/parse-brake-balance';
import { makeFloatView } from '../helper';

describe('parseBrakeBalance', () => {
  it('general', () => {
    expect(() => parseBrakeBalance(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseBrakeBalance(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parseBrakeBalance(makeFloatView(0.5), 0)).toBe(50.0);
    expect(parseBrakeBalance(makeFloatView(1.0), 0)).toBe(100.0);
    expect(() => parseBrakeBalance(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
