import { describe, expect, it } from 'vitest';
import { parseDefaultIntercooler } from '../../src/internal/parse-default-Intercooler';
import { makeIntView } from '../helper';

describe('parseDefaultIntercooler', () => {
  it('No Intercooler', () =>
    expect(parseDefaultIntercooler(makeIntView(-1), 0)).toBe('No Intercooler'));
  it('Stock', () =>
    expect(parseDefaultIntercooler(makeIntView(0), 0)).toBe(
      'Stock (Street if No Intercooler possible)',
    ));
  it('Street', () =>
    expect(parseDefaultIntercooler(makeIntView(1), 0)).toBe(
      'Street (Sport if No Intercooler possible)',
    ));
  it('Sport', () =>
    expect(parseDefaultIntercooler(makeIntView(2), 0)).toBe(
      'Sport (Race if No Intercooler possible)',
    ));
  it('Race', () =>
    expect(parseDefaultIntercooler(makeIntView(3), 0)).toBe('Race'));
  it('Street (if "No Intercooler" possible)', () =>
    expect(parseDefaultIntercooler(makeIntView(0), 0)).toBe(
      'Stock (Street if No Intercooler possible)',
    ));
  it('Sport (if "No Intercooler" possible)', () =>
    expect(parseDefaultIntercooler(makeIntView(1), 0)).toBe(
      'Street (Sport if No Intercooler possible)',
    ));
  it('Race (if "No Intercooler" possible)', () =>
    expect(parseDefaultIntercooler(makeIntView(2), 0)).toBe(
      'Sport (Race if No Intercooler possible)',
    ));
  it('Invalid intercooler option', () =>
    expect(parseDefaultIntercooler(makeIntView(4), 0)).toBe('Invalid'));
});
