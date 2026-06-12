import { describe, expect, it } from 'vitest';
import { parseTransmission } from '../../src/internal/parsers/parse-transmission';
import { makeIntView } from '../helper';

describe('parseTransmission', () => {
  const options = [
    'Stock',
    'Street',
    'Sport',
    'Race',
    'Race: 6-Speed',
    'Race: 7-Speed',
    'Race: 8-Speed',
    'Race: 9-Speed',
    'Race: 10-Speed',
    'Drift: 4-Speed',
  ];

  it('Stock', () =>
    expect(parseTransmission(makeIntView(0), 0, 6)).toEqual({
      raw: 0,
      selected: 'Stock',
      options,
    }));
  it('Street', () =>
    expect(parseTransmission(makeIntView(1), 0, 6)).toEqual({
      raw: 1,
      selected: 'Street',
      options,
    }));
  it('Sport', () =>
    expect(parseTransmission(makeIntView(2), 0, 6)).toEqual({
      raw: 2,
      selected: 'Sport',
      options,
    }));
  it('Race', () =>
    expect(parseTransmission(makeIntView(3), 0, 6)).toEqual({
      raw: 3,
      selected: 'Race',
      options,
    }));

  describe('standard Race is 6-Speed', () => {
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, 7)).toEqual({
        raw: 4,
        selected: 'Race: 7-Speed',
        options,
      }));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, 8)).toEqual({
        raw: 5,
        selected: 'Race: 8-Speed',
        options,
      }));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, 9)).toEqual({
        raw: 6,
        selected: 'Race: 9-Speed',
        options,
      }));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, 10)).toEqual({
        raw: 7,
        selected: 'Race: 10-Speed',
        options,
      }));
  });

  describe('standard Race is 7-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, 6)).toEqual({
        raw: 4,
        selected: 'Race: 6-Speed',
        options,
      }));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, 8)).toEqual({
        raw: 5,
        selected: 'Race: 8-Speed',
        options,
      }));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, 9)).toEqual({
        raw: 6,
        selected: 'Race: 9-Speed',
        options,
      }));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, 10)).toEqual({
        raw: 7,
        selected: 'Race: 10-Speed',
        options,
      }));
  });

  describe('standard Race is 8-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, 6)).toEqual({
        raw: 4,
        selected: 'Race: 6-Speed',
        options,
      }));
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, 7)).toEqual({
        raw: 5,
        selected: 'Race: 7-Speed',
        options,
      }));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, 9)).toEqual({
        raw: 6,
        selected: 'Race: 9-Speed',
        options,
      }));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, 10)).toEqual({
        raw: 7,
        selected: 'Race: 10-Speed',
        options,
      }));
  });

  describe('standard Race is 9-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, 6)).toEqual({
        raw: 4,
        selected: 'Race: 6-Speed',
        options,
      }));
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, 7)).toEqual({
        raw: 5,
        selected: 'Race: 7-Speed',
        options,
      }));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, 8)).toEqual({
        raw: 6,
        selected: 'Race: 8-Speed',
        options,
      }));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, 10)).toEqual({
        raw: 7,
        selected: 'Race: 10-Speed',
        options,
      }));
  });

  describe('standard Race is 10-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, 6)).toEqual({
        raw: 4,
        selected: 'Race: 6-Speed',
        options,
      }));
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, 7)).toEqual({
        raw: 5,
        selected: 'Race: 7-Speed',
        options,
      }));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, 8)).toEqual({
        raw: 6,
        selected: 'Race: 8-Speed',
        options,
      }));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, 9)).toEqual({
        raw: 7,
        selected: 'Race: 9-Speed',
        options,
      }));
  });

  it('Drift: 4-Speed', () =>
    expect(parseTransmission(makeIntView(8), 0, 4)).toEqual({
      raw: 8,
      selected: 'Drift: 4-Speed',
      options,
    }));
  it('Invalid', () =>
    expect(() => parseTransmission(makeIntView(9), 0, 6)).toThrow(RangeError));
});
