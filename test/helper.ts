/**
 * Creates a DataView with a float32 value.
 *
 * @param value The value to set.
 */
export function makeFloatView(value: number): DataView {
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setFloat32(0, value, true);
  return view;
}

/**
 * Creates a DataView with an int32 value.
 *
 * @param value The value to set.
 */
export function makeIntView(value: number): DataView {
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setInt32(0, value, true);
  return view;
}

/**
 * Creates a DataView with 10 float32 gear ratio values.
 *
 * @param values The 10 gear ratio values to set.
 */
export function makeGearRatioView(values: number[]): DataView {
  const buf = new ArrayBuffer(40);
  const view = new DataView(buf);
  for (let i = 0; i < 10; i++) view.setFloat32(i * 4, values[i] ?? 0, true);
  return view;
}
