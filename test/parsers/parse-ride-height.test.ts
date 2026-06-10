import { describe, expect, it } from 'vitest';
import { parseRideHeight } from '../../src/internal/parse-ride-height';
import { makeFloatView } from '../helper';

describe('parseRideHeight', () => {
  it('general', () => {
    expect(() => parseRideHeight(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseRideHeight(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parseRideHeight(makeFloatView(0.5), 0)).toBe(50.0);
    expect(parseRideHeight(makeFloatView(1.0), 0)).toBe(100.0);
    expect(() => parseRideHeight(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
