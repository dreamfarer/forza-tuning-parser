import { describe, expect, it } from 'vitest';
import { parseCaster } from '../../src/internal/parse-caster';
import { makeFloatView } from '../helper';

describe('parseCaster', () => {
  it('general', () => {
    expect(() => parseCaster(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseCaster(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parseCaster(makeFloatView(0.5), 0)).toBe(3.5);
    expect(parseCaster(makeFloatView(1.0), 0)).toBe(7.0);
    expect(() => parseCaster(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
