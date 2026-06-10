import { describe, expect, it } from 'vitest';
import { parseTurbo } from '../../src/internal/parse-turbo';
import { makeIntView } from '../helper';

describe('parseTurbo', () => {
  it('null for absent turbo upgrade', () =>
    expect(parseTurbo(makeIntView(-1), 0)).toBeNull());
  it('Stock', () => expect(parseTurbo(makeIntView(0), 0)).toBe('Stock'));
  it('Street', () =>
    expect(parseTurbo(makeIntView(1), 0)).toBe(
      'Street (Race w/ Anti-Lag if only option)',
    ));
  it('Sport', () => expect(parseTurbo(makeIntView(2), 0)).toBe('Sport'));
  it('Race', () => expect(parseTurbo(makeIntView(3), 0)).toBe('Race'));
  it('Race with Anti-Lag', () =>
    expect(parseTurbo(makeIntView(4), 0)).toBe('Race with Anti-Lag'));
  it('Race with Anti-Lag (if only that option available)', () =>
    expect(parseTurbo(makeIntView(1), 0)).toBe(
      'Street (Race w/ Anti-Lag if only option)',
    ));
  it('Invalid turbo option', () =>
    expect(parseTurbo(makeIntView(5), 0)).toBe('Invalid'));
});
