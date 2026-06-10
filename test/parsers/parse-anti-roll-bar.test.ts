import { describe, expect, it } from 'vitest';
import { parseAntiRollBar } from '../../src/internal/parse-anti-roll-bar';
import { makeFloatView } from '../helper';

describe('parseAntiRollBar', () => {
  it('general', () => {
    expect(() => parseAntiRollBar(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseAntiRollBar(makeFloatView(0.0), 0)).toBe(1.0);
    expect(parseAntiRollBar(makeFloatView(0.5), 0)).toBe(33.0);
    expect(parseAntiRollBar(makeFloatView(1.0), 0)).toBe(65.0);
    expect(() => parseAntiRollBar(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
