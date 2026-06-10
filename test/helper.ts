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
