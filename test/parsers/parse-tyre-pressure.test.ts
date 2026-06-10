import { describe, expect, it } from 'vitest';
import { parseTyrePressure } from '../../src/internal/parse-tyre-pressure';
import { makeFloatView } from '../helper';

describe('parseTyrePressure', () => {
  it('general', () => {
    expect(() => parseTyrePressure(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseTyrePressure(makeFloatView(0.0), 0)).toBe(15.0);
    expect(parseTyrePressure(makeFloatView(0.5), 0)).toBe(35.0);
    expect(parseTyrePressure(makeFloatView(1.0), 0)).toBe(55.0);
    expect(() => parseTyrePressure(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
