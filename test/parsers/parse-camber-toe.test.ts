import { describe, expect, it } from 'vitest';
import { parseCamberToe } from '../../src/internal/parse-camber-toe';
import { makeFloatView } from '../helper';

describe('parseCamberToe', () => {
  it('general', () => {
    expect(() => parseCamberToe(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseCamberToe(makeFloatView(0.0), 0)).toBe(-5.0);
    expect(parseCamberToe(makeFloatView(0.5), 0)).toBe(0.0);
    expect(parseCamberToe(makeFloatView(1.0), 0)).toBe(5.0);
    expect(() => parseCamberToe(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
