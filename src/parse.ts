import { toBytes } from './internal/to-bytes.js';
import type { BinaryInput, ForzaTune } from './types.js';

/**
 * Parse a Forza tuning binary into a typed {@link ForzaTune} object.
 *
 * Accepts `File`, `Blob`, `fetch` response (`await res.arrayBuffer()`), or `fs.readFile()` in
 * Node.js (`Uint8Array`).
 *
 * @example Browser
 * ```ts
 * import { parse } from 'forza-tuning-parser';
 *
 * dropZone.addEventListener('drop', async (e) => {
 *   const file = e.dataTransfer!.files[0];
 *   const tune = await parse(file);
 * });
 * ```
 *
 * @example Node.js
 * ```ts
 * import { readFile } from 'node:fs/promises';
 * import { parse } from 'forza-tuning-parser';
 *
 * const tune = await parse(await readFile('my.tune'));
 * ```
 *
 * @throws {TypeError} if `input` is not a supported binary type.
 */
export async function parse(input: BinaryInput): Promise<ForzaTune> {
  const bytes = await toBytes(input);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { ordinal: view.getInt32(2, true) };
}
