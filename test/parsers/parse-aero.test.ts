import { describe, expect, it } from 'vitest';
import { parseAero } from '../../src/internal/parse-aero';
import { makeFloatView } from '../helper';

describe('parseAero', () => {
  it('general', () => {
    expect(() => parseAero(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseAero(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parseAero(makeFloatView(0.5), 0)).toBe(50.0);
    expect(parseAero(makeFloatView(1.0), 0)).toBe(100.0);
    expect(() => parseAero(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
