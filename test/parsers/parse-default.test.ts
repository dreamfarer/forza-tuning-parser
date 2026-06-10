import { describe, expect, it } from 'vitest';
import { parseDefault } from '../../src/internal/parse-default';
import { makeIntView } from '../helper';

describe('parseDefault', () => {
  it('general', () => {
    expect(parseDefault(makeIntView(-1), 0)).toBe('Invalid');
    expect(parseDefault(makeIntView(0), 0)).toBe('Stock');
    expect(parseDefault(makeIntView(1), 0)).toBe('Street');
    expect(parseDefault(makeIntView(2), 0)).toBe('Sport');
    expect(parseDefault(makeIntView(3), 0)).toBe('Race');
    expect(parseDefault(makeIntView(4), 0)).toBe('Invalid');
  });
});
