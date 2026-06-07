import type { BinaryInput } from '../types.js';

/**
 * Normalize any supported {@link BinaryInput} into a {@link Uint8Array}.
 */
export async function toBytes(input: BinaryInput): Promise<Uint8Array> {
  if (input instanceof Uint8Array) {
    return input;
  }

  if (input instanceof ArrayBuffer) {
    return new Uint8Array(input);
  }

  if (typeof Blob !== 'undefined' && input instanceof Blob) {
    const buffer = await input.arrayBuffer();
    return new Uint8Array(buffer);
  }

  throw new TypeError(
    'Unsupported input: expected an ArrayBuffer, Uint8Array, Blob, or File.',
  );
}
