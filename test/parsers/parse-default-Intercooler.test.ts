import { describe, expect, it } from 'vitest';
import { parseIntercooler } from '../../src/internal/parsers/parse-intercooler';
import { makeIntView } from '../helper';

describe('parseIntercooler', () => {
  const options = ['No Intercooler', 'Stock', 'Street', 'Sport', 'Race'];

  it('No Intercooler', () =>
    expect(parseIntercooler(makeIntView(-1), 0)).toEqual({
      raw: -1,
      selected: 'No Intercooler',
      options,
    }));

  it('Stock (Street if No Intercooler possible)', () =>
    expect(parseIntercooler(makeIntView(0), 0)).toEqual({
      raw: 0,
      selected: 'Stock (Street if No Intercooler possible)',
      options,
    }));

  it('Street (Sport if No Intercooler possible)', () =>
    expect(parseIntercooler(makeIntView(1), 0)).toEqual({
      raw: 1,
      selected: 'Street (Sport if No Intercooler possible)',
      options,
    }));

  it('Sport (Race if No Intercooler possible)', () =>
    expect(parseIntercooler(makeIntView(2), 0)).toEqual({
      raw: 2,
      selected: 'Sport (Race if No Intercooler possible)',
      options,
    }));

  it('Race', () =>
    expect(parseIntercooler(makeIntView(3), 0)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));

  it('Invalid intercooler option', () =>
    expect(() => parseIntercooler(makeIntView(4), 0)).toThrow(RangeError));
});
