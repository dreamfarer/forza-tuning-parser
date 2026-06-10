import { describe, expect, it } from 'vitest';
import { parseOrdinal } from '../../src/internal/parse-ordinal';
import { makeIntView } from '../helper';

describe('parseOrdinal', () => {
  it('general', () => {
    expect(parseOrdinal(makeIntView(0), 0)).toBe(0);
    expect(parseOrdinal(makeIntView(1), 0)).toBe(1);
    expect(parseOrdinal(makeIntView(1000), 0)).toBe(1000);
    expect(parseOrdinal(makeIntView(-1), 0)).toBe(-1);
  });
});
