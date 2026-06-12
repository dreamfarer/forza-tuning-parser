import type { RoundingMode } from '../enums';
import { round } from '../round';
import type { ValueRange } from '../types';

/**
 * Linear interpolation between two values (Round to 2 decimal places).
 *
 * @param value The value to interpolate between 0 and 1.
 * @param range The range of values to interpolate between.
 * @param mode The rounding mode to use.
 *
 * @returns The interpolated value.
 *
 * @throws RangeError If the value is not between 0 and 1.
 */
export function lerp(
  value: number,
  range: ValueRange,
  mode: RoundingMode,
): number {
  if (value < 0 || value > 1)
    throw new RangeError(
      `Value must be between 0 and 1, got ${value} instead.`,
    );
  return round(range.min + value * (range.max - range.min), mode);
}
