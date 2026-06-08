import { parseDefault } from './internal/parse-default';
import { parseDefaultOptional } from './internal/parse-default-optional';
import { parseRestrictorPlate } from './internal/parse-restrictor-plate';
import { parseTurbo } from './internal/parse-turbo';
import { toBytes } from './internal/to-bytes.js';
import type { BinaryInput, ForzaTune } from './types.js';

/**
 * Parse a binary Forza tuning file into a typed {@link ForzaTune} object.
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
  return {
    ordinal: view.getInt32(0x2, true),
    engine: {
      camshaft: parseDefault(view, 0x3e),
      valves: parseDefault(view, 0x42),
      displacement: parseDefault(view, 0x46),
      pistons: parseDefault(view, 0x4a),
      fuelSystemOrCarburetor: parseDefault(view, 0x4e),
      ignition: parseDefault(view, 0x52),
      exhaust: parseDefault(view, 0x56),
      intake: parseDefault(view, 0x5a),
      flywheel: parseDefault(view, 0x5e),
      intakeManifold: parseDefaultOptional(view, 0x62),
      restrictorPlate: parseRestrictorPlate(view, 0x66),
      oilCooling: parseDefault(view, 0x6a),
      singleTurbo: parseTurbo(view, 0x6e),
      twinTurbo: parseTurbo(view, 0x72),
      centrifugalSupercharger: parseDefaultOptional(view, 0x7a),
      supercharger: parseDefaultOptional(view, 0x7e),
      intercooler: parseDefault(view, 0x82),
    },
  };
}
