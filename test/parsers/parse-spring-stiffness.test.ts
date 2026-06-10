import { describe, expect, it } from 'vitest';
import { parseSpringStiffness } from '../../src/internal/parse-spring-stiffness';
import { makeFloatView } from '../helper';

describe('parseSpringStiffness', () => {
  it('general', () => {
    expect(() => parseSpringStiffness(makeFloatView(-0.1), 0)).toThrow(
      RangeError,
    );
    expect(parseSpringStiffness(makeFloatView(0.0), 0)).toBe(0.0);
    expect(parseSpringStiffness(makeFloatView(0.5), 0)).toBe(50.0);
    expect(parseSpringStiffness(makeFloatView(1.0), 0)).toBe(100.0);
    expect(() => parseSpringStiffness(makeFloatView(1.1), 0)).toThrow(
      RangeError,
    );
  });
});
