import { RoundingMode } from './enums';

const STEP: Record<RoundingMode, number> = {
  [RoundingMode.Whole]: 1,
  [RoundingMode.DoubleDigit]: 0.01,
  [RoundingMode.SingleDigit]: 0.1,
  [RoundingMode.Half]: 0.5,
};

const DECIMALS: Record<RoundingMode, number> = {
  [RoundingMode.Whole]: 0,
  [RoundingMode.DoubleDigit]: 2,
  [RoundingMode.SingleDigit]: 1,
  [RoundingMode.Half]: 1,
};

/**
 * Rounds a number to the nearest step.
 *
 * @param value The number to round.
 * @param mode The rounding mode (whole, double-digit, single digit, half).
 *
 * @returns The rounded number.
 *
 * @throws Error If the value is not finite.
 */
export function round(value: number, mode: RoundingMode): number {
  if (!Number.isFinite(value)) {
    throw new Error(`Cannot round non-finite value: ${value}`);
  }
  const step = STEP[mode];
  const rounded = Math.round(value / step) * step;
  return Number(rounded.toFixed(DECIMALS[mode]));
}
