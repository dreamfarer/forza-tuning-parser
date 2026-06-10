import { parseAntiRollBar } from './internal/parse-anti-roll-bar';
import { parseBrakePressure } from './internal/parse-brake-pressure';
import { parseCamber } from './internal/parse-camber';
import { parseCaster } from './internal/parse-caster';
import { parseDefault } from './internal/parse-default';
import { parseDefaultIntercooler } from './internal/parse-default-Intercooler';
import { parseDefaultOptional } from './internal/parse-default-optional';
import { parseDifferential } from './internal/parse-differential';
import { parseDrivetrainSwap } from './internal/parse-drivetrain-swap';
import { parseEngineSwap } from './internal/parse-engine-swap';
import { parseFinalDrive } from './internal/parse-final-drive';
import { parseGearRatios } from './internal/parse-gear-ratios';
import { parseInteger } from './internal/parse-integer';
import { parsePercent } from './internal/parse-percent';
import { parseRestrictorPlate } from './internal/parse-restrictor-plate';
import { parseSpringStiffness } from './internal/parse-spring-stiffness';
import { parseDamping } from './internal/parse-damping';
import { parseStockNonStock } from './internal/parse-stock-non-stock';
import { parseToe } from './internal/parse-toe';
import { parseTransmission } from './internal/parse-transmission';
import { parseTurbo } from './internal/parse-turbo';
import { parseTyrePressure } from './internal/parse-tyre-pressure';
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
      front: parseTyrePressure(view, 0x1ce),
      rear: parseTyrePressure(view, 0x1fa),
    },
    gearing: {
      finalDrive: parseFinalDrive(view, 0x1a6),
      ratios: parseGearRatios(view, 0x22e),
    },
    alignment: {
      camber: {
        front: parseCamber(view, 0x1d2),
        rear: parseCamber(view, 0x1fe),
      },
      toe: {
        front: parseToe(view, 0x1d6),
        rear: parseToe(view, 0x202),
      },
      caster: parseCaster(view, 0x1da),
    },
    antiRollBars: {
      front: parseAntiRollBar(view, 0x1e2),
      rear: parseAntiRollBar(view, 0x20e),
    },
    springs: {
      stiffness: {
        front: parseSpringStiffness(view, 0x1de),
        rear: parseSpringStiffness(view, 0x20a),
      },
      rideHeight: {
        front: parsePercent(view, 0x1e6),
        rear: parsePercent(view, 0x212),
      },
    },
    damping: {
      reboundStiffness: {
        front: parseDamping(view, 0x1ee),
        rear: parseDamping(view, 0x21a),
      },
      bumpStiffness: {
        front: parseDamping(view, 0x1ea),
        rear: parseDamping(view, 0x216),
      },
    },
    aero: {
      front: parsePercent(view, 0x19e),
      rear: parsePercent(view, 0x1a2),
    },
    brakes: {
      balance: parsePercent(view, 0x1ae),
      pressure: parseBrakePressure(view, 0x1aa),
    },
    differential: {
      front: {
        acceleration: parsePercent(view, 0x1f2),
        deceleration: parsePercent(view, 0x1f6),
      },
      rear: {
        acceleration: parsePercent(view, 0x21e),
        deceleration: parsePercent(view, 0x222),
      },
      balance: parsePercent(view, 0x1b6),
    },
  };
  return {
    ordinal: parseInteger(view, 0x2),
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
