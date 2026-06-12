import { describe, expect, it } from 'vitest';
import { RoundingMode } from '../src/enums';
import { round } from '../src/round';

describe('round', () => {
  describe('Whole (nearest 1)', () => {
    it('rounds down', () => {
      expect(round(2.4, RoundingMode.Whole)).toBe(2);
    });

    it('rounds up', () => {
      expect(round(2.6, RoundingMode.Whole)).toBe(3);
    });

    it('rounds the .5 halfway case toward +infinity', () => {
      expect(round(2.5, RoundingMode.Whole)).toBe(3);
      expect(round(-2.5, RoundingMode.Whole)).toBe(-2);
    });

    it('leaves a whole number unchanged', () => {
      expect(round(7, RoundingMode.Whole)).toBe(7);
    });

    it('rounds negative values', () => {
      expect(round(-2.6, RoundingMode.Whole)).toBe(-3);
    });

    it('normalizes -0 to 0', () => {
      expect(round(-0.4, RoundingMode.Whole)).toBe(0);
      expect(Object.is(round(-0.4, RoundingMode.Whole), -0)).toBe(false);
    });
  });

  describe('DoubleDigit (nearest 0.01)', () => {
    it('rounds down', () => {
      expect(round(1.234, RoundingMode.DoubleDigit)).toBe(1.23);
    });

    it('rounds up', () => {
      expect(round(1.236, RoundingMode.DoubleDigit)).toBe(1.24);
    });

    it('rounds the halfway case up', () => {
      expect(round(1.235, RoundingMode.DoubleDigit)).toBe(1.24);
    });

    it('leaves an already-rounded value unchanged', () => {
      expect(round(1.23, RoundingMode.DoubleDigit)).toBe(1.23);
    });

    it('avoids floating-point noise', () => {
      expect(round(0.1 + 0.2, RoundingMode.DoubleDigit)).toBe(0.3);
    });
  });

  describe('SingleDigit (nearest 0.1)', () => {
    it('rounds down', () => {
      expect(round(2.31, RoundingMode.SingleDigit)).toBe(2.3);
    });

    it('rounds up', () => {
      expect(round(2.37, RoundingMode.SingleDigit)).toBe(2.4);
    });

    it('rounds the halfway case up', () => {
      expect(round(2.25, RoundingMode.SingleDigit)).toBe(2.3);
    });

    it('handles whole numbers', () => {
      expect(round(5, RoundingMode.SingleDigit)).toBe(5);
    });
  });

  describe('Half (nearest 0.5)', () => {
    it('rounds up to .5', () => {
      expect(round(2.3, RoundingMode.Half)).toBe(2.5);
    });

    it('rounds down to .0', () => {
      expect(round(2.2, RoundingMode.Half)).toBe(2.0);
    });

    it('rounds up to the next whole', () => {
      expect(round(2.8, RoundingMode.Half)).toBe(3.0);
    });

    it('rounds the .25 halfway case up', () => {
      expect(round(2.75, RoundingMode.Half)).toBe(3.0);
    });

    it('leaves an exact .5 unchanged', () => {
      expect(round(2.5, RoundingMode.Half)).toBe(2.5);
    });
  });

  describe('negative numbers', () => {
    it('rounds negative values', () => {
      expect(round(-1.235, RoundingMode.DoubleDigit)).toBe(-1.24);
      expect(round(-2.3, RoundingMode.Half)).toBe(-2.5);
    });

    it('normalizes -0 to 0', () => {
      expect(round(-0.001, RoundingMode.SingleDigit)).toBe(0);
      expect(Object.is(round(-0.001, RoundingMode.SingleDigit), -0)).toBe(
        false,
      );
    });
  });

  describe('edge cases', () => {
    it('rounds zero', () => {
      expect(round(0, RoundingMode.DoubleDigit)).toBe(0);
    });

    it('throws on NaN', () => {
      expect(() => round(NaN, RoundingMode.Half)).toThrow();
    });

    it('throws on Infinity', () => {
      expect(() => round(Infinity, RoundingMode.Half)).toThrow();
    });
  });
});
