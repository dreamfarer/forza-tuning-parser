/**
 * Linear interpolation between two values (Round to 2 decimal places).
 */
export function lerp(value: number, min: number, max: number): number {
  return Math.round((min + value * (max - min)) * 100) / 100;
}
