import { describe, expect, it } from 'vitest';
import { makeFloatView } from '../helper';
import {parseDamping} from "../../src/internal/parse-damping";

describe('parseDamping', () => {
  it('general', () => {
    expect(() => parseDamping(makeFloatView(-0.1), 0)).toThrow(RangeError);
    expect(parseDamping(makeFloatView(0.0), 0)).toBe(1.0);
    expect(parseDamping(makeFloatView(0.5), 0)).toBe(10.5);
    expect(parseDamping(makeFloatView(1.0), 0)).toBe(20.0);
    expect(() => parseDamping(makeFloatView(1.1), 0)).toThrow(RangeError);
  });
});
