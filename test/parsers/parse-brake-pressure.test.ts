import { describe, expect, it } from 'vitest';
import { parseBrakePressure } from '../../src/internal/parse-brake-pressure';
import { makeFloatView } from '../helper';

describe('parseBrakePressure', () => {
  it('general', () => {
    expect(() => parseBrakePressure(makeFloatView(-0.1), 0)).toThrow(
      RangeError,
    );
    expect(parseBrakePressure(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parseBrakePressure(makeFloatView(0.5), 0)).toBe(100.0);
    expect(parseBrakePressure(makeFloatView(1.0), 0)).toBe(200.0);
    expect(() => parseBrakePressure(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
