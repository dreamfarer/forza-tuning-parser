/**
 * Linear interpolation between two values (Round to 2 decimal places).
 *
 * @param value The value to interpolate between 0 and 1.
 * @param min The minimum value.
 * @param max The maximum value.
 *
 * @returns The interpolated value.
 *
 * @throws RangeError If the value is not between 0 and 1.
 */
export function lerp(value: number, min: number, max: number): number {
  if (value < 0 || value > 1)
    throw new RangeError(
      `Value must be between 0 and 1, got ${value} instead.`,
    );
  return Math.round((min + value * (max - min)) * 100) / 100;
}
