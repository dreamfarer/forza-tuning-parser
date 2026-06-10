import { parseDefault } from './internal/parse-default';
import { parseDefaultIntercooler } from './internal/parse-default-Intercooler';
import { parseDefaultOptional } from './internal/parse-default-optional';
import { parseDifferential } from './internal/parse-differential';
import { parseDrivetrainSwap } from './internal/parse-drivetrain-swap';
import { parseEngineSwap } from './internal/parse-engine-swap';
import { parseFloatArray } from './internal/parse-float-array';
import { parseRestrictorPlate } from './internal/parse-restrictor-plate';
import { parseStockNonStock } from './internal/parse-stock-non-stock';
import { parseTransmission } from './internal/parse-transmission';
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
  const tuning = {
    tyrePressure: {
      front: view.getFloat32(0x1ce, true),
      rear: view.getFloat32(0x1fa, true),
    },
    gearing: {
      finalDrive: view.getFloat32(0x1a6, true),
      ratios: parseFloatArray(view, 0x22e, 10),
    },
    alignment: {
      camber: {
        front: view.getFloat32(0x1d2, true),
        rear: view.getFloat32(0x1fe, true),
      },
      toe: {
        front: view.getFloat32(0x1d6, true),
        rear: view.getFloat32(0x202, true),
      },
      caster: view.getFloat32(0x1da, true),
    },
    antiRollBars: {
      front: view.getFloat32(0x1e2, true),
      rear: view.getFloat32(0x20e, true),
    },
    springs: {
      stiffness: {
        front: view.getFloat32(0x1de, true),
        rear: view.getFloat32(0x20a, true),
      },
      rideHeight: {
        front: view.getFloat32(0x1e6, true),
        rear: view.getFloat32(0x212, true),
      },
    },
    damping: {
      reboundStiffness: {
        front: view.getFloat32(0x1ee, true),
        rear: view.getFloat32(0x21a, true),
      },
      bumpStiffness: {
        front: view.getFloat32(0x1ea, true),
        rear: view.getFloat32(0x216, true),
      },
    },
    aero: {
      front: view.getFloat32(0x19e, true),
      rear: view.getFloat32(0x1a2, true),
    },
    brakes: {
      balance: view.getFloat32(0x1ae, true),
      pressure: view.getFloat32(0x1aa, true),
    },
    differential: {
      front: {
        acceleration: view.getFloat32(0x1f2, true),
        deceleration: view.getFloat32(0x1f6, true),
      },
      rear: {
        acceleration: view.getFloat32(0x21e, true),
        deceleration: view.getFloat32(0x222, true),
      },
      balance: view.getFloat32(0x1b6, true),
    },
  };
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
      intercooler: parseDefaultIntercooler(view, 0x82),
    },
    drivetrain: {
      clutch: parseDefault(view, 0x86),
      transmission: parseTransmission(view, 0x8a, tuning.gearing.ratios),
      driveline: parseDefault(view, 0x8e),
      differential: parseDifferential(view, 0x92),
    },
    conversions: {
      engineSwap: parseEngineSwap(view, 0xe),
      drivetrainSwap: parseDrivetrainSwap(view, 0x12),
      bodySwap: parseStockNonStock(view, 0x16),
    },
    tuning,
  };
}
