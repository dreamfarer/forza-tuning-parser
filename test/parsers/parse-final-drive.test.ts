import { describe, expect, it } from 'vitest';
import { parseFinalDrive } from '../../src/internal/parse-final-drive';
import { makeFloatView } from '../helper';

describe('parseFinalDrive', () => {
  it('general', () => {
    expect(() => parseFinalDrive(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseFinalDrive(makeFloatView(0.0), 0)).toBe(2.2);
    expect(parseFinalDrive(makeFloatView(0.5), 0)).toBe(4.15);
    expect(parseFinalDrive(makeFloatView(1.0), 0)).toBe(6.1);
    expect(() => parseFinalDrive(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
