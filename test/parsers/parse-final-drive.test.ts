import { describe, expect, it } from 'vitest';
import { parseFinalDrive } from '../../src/internal/parsers/parse-final-drive';
import { makeFloatView } from '../helper';

describe('parseFinalDrive', () => {
  const range = { min: 2.2, max: 6.1 };
  const unit = null;

  it('invalid', () => {
    expect(() => parseFinalDrive(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(() => parseFinalDrive(makeFloatView(1.1), 0)).toThrow(RangeError);
  });

  it('general', () => {
    expect(parseFinalDrive(makeFloatView(0.0), 0)).toEqual({
      raw: 0.0,
      value: 2.2,
      unit,
      range,
    });
    expect(parseFinalDrive(makeFloatView(0.5), 0)).toEqual({
      raw: 0.5,
      value: 4.15,
      unit,
      range,
    });
    expect(parseFinalDrive(makeFloatView(1.0), 0)).toEqual({
      raw: 1.0,
      value: 6.1,
      unit,
      range,
    });
  });
});
