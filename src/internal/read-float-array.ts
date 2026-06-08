/**
 * Read the specified number of Float32 in a binary Forza tuning file into a number array.
 */
export function readFloatArray(
  view: DataView<ArrayBufferLike>,
  byteOffset: number,
  length: number,
): number[] {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(view.getFloat32(byteOffset + i * 4, true));
  }
  return result;
}
