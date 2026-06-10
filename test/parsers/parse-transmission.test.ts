import { describe, expect, it } from 'vitest';
import { parseTransmission } from '../../src/internal/parse-transmission';
import { makeIntView } from '../helper';

describe('parseTransmission', () => {
  const fourSpeed = [1, 1, 1, 1];
  const sixSpeed = [1, 1, 1, 1, 1, 1];
  const sevenSpeed = [1, 1, 1, 1, 1, 1, 1];
  const eightSpeed = [1, 1, 1, 1, 1, 1, 1, 1];
  const nineSpeed = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  const tenSpeed = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  it('Stock', () =>
    expect(parseTransmission(makeIntView(0), 0, sixSpeed)).toBe('Stock'));
  it('Street', () =>
    expect(parseTransmission(makeIntView(1), 0, sixSpeed)).toBe('Street'));
  it('Sport', () =>
    expect(parseTransmission(makeIntView(2), 0, sixSpeed)).toBe('Sport'));
  it('Race', () =>
    expect(parseTransmission(makeIntView(3), 0, sixSpeed)).toBe('Race'));

  describe('standard Race is 6-Speed', () => {
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, sevenSpeed)).toBe(
        'Race: 7-Speed',
      ));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, eightSpeed)).toBe(
        'Race: 8-Speed',
      ));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, nineSpeed)).toBe(
        'Race: 9-Speed',
      ));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, tenSpeed)).toBe(
        'Race: 10-Speed',
      ));
  });

  describe('standard Race is 7-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, sixSpeed)).toBe(
        'Race: 6-Speed',
      ));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, eightSpeed)).toBe(
        'Race: 8-Speed',
      ));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, nineSpeed)).toBe(
        'Race: 9-Speed',
      ));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, tenSpeed)).toBe(
        'Race: 10-Speed',
      ));
  });

  describe('standard Race is 8-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, sixSpeed)).toBe(
        'Race: 6-Speed',
      ));
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, sevenSpeed)).toBe(
        'Race: 7-Speed',
      ));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, nineSpeed)).toBe(
        'Race: 9-Speed',
      ));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, tenSpeed)).toBe(
        'Race: 10-Speed',
      ));
  });

  describe('standard Race is 9-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, sixSpeed)).toBe(
        'Race: 6-Speed',
      ));
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, sevenSpeed)).toBe(
        'Race: 7-Speed',
      ));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, eightSpeed)).toBe(
        'Race: 8-Speed',
      ));
    it('Race: 10-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, tenSpeed)).toBe(
        'Race: 10-Speed',
      ));
  });

  describe('standard Race is 10-Speed', () => {
    it('Race: 6-Speed', () =>
      expect(parseTransmission(makeIntView(4), 0, sixSpeed)).toBe(
        'Race: 6-Speed',
      ));
    it('Race: 7-Speed', () =>
      expect(parseTransmission(makeIntView(5), 0, sevenSpeed)).toBe(
        'Race: 7-Speed',
      ));
    it('Race: 8-Speed', () =>
      expect(parseTransmission(makeIntView(6), 0, eightSpeed)).toBe(
        'Race: 8-Speed',
      ));
    it('Race: 9-Speed', () =>
      expect(parseTransmission(makeIntView(7), 0, nineSpeed)).toBe(
        'Race: 9-Speed',
      ));
  });

  it('Drift: 4-Speed', () =>
    expect(parseTransmission(makeIntView(8), 0, fourSpeed)).toBe(
      'Drift: 4-Speed',
    ));
  it('Invalid', () =>
    expect(parseTransmission(makeIntView(9), 0, sixSpeed)).toBe('Invalid'));
});
