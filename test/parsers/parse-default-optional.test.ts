import { describe, expect, it } from 'vitest';
import { parseDefaultOptional } from '../../src/internal/parse-default-optional';
import { makeIntView } from '../helper';

describe('parseDefaultOptional', () => {
  it('general', () => {
    expect(parseDefaultOptional(makeIntView(-1), 0)).toBeNull();
    expect(parseDefaultOptional(makeIntView(0), 0)).toBe('Stock');
    expect(parseDefaultOptional(makeIntView(1), 0)).toBe('Street');
    expect(parseDefaultOptional(makeIntView(2), 0)).toBe('Sport');
    expect(parseDefaultOptional(makeIntView(3), 0)).toBe('Race');
    expect(parseDefaultOptional(makeIntView(4), 0)).toBe('Invalid');
  });
});
