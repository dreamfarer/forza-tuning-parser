import { Position, UnitSystem } from './enums';
import { parseAero } from './internal/parsers/parse-aero';
import { parseAntiRollBar } from './internal/parsers/parse-anti-roll-bar';
import { parseBrakePressure } from './internal/parsers/parse-brake-pressure';
import { parseBumpRebound } from './internal/parsers/parse-bump-rebound';
import { parseCamberToe } from './internal/parsers/parse-camber-toe';
import { parseCaster } from './internal/parsers/parse-caster';
import { parseDefault } from './internal/parsers/parse-default';
import { parseDefaultOptional } from './internal/parsers/parse-default-optional';
import { parseDifferential } from './internal/parsers/parse-differential';
import { parseDrivetrainSwap } from './internal/parsers/parse-drivetrain-swap';
import { parseEngineSwap } from './internal/parsers/parse-engine-swap';
import { parseFinalDrive } from './internal/parsers/parse-final-drive';
import { parseGearRatios } from './internal/parsers/parse-gear-ratios';
import { parseIntercooler } from './internal/parsers/parse-intercooler';
import { parseOrdinal } from './internal/parsers/parse-ordinal';
import { parsePercent } from './internal/parsers/parse-percent';
import { parseRestrictorPlate } from './internal/parsers/parse-restrictor-plate';
import { parseRideHeight } from './internal/parsers/parse-ride-height';
import { parseSpringStiffness } from './internal/parsers/parse-spring-stiffness';
import { parseSpringsAndDampers } from './internal/parsers/parse-springs-and-dampers';
import { parseStockNonStock } from './internal/parsers/parse-stock-non-stock';
import { parseTransmission } from './internal/parsers/parse-transmission';
import { parseTurbo } from './internal/parsers/parse-turbo';
import { parseTyrePressure } from './internal/parsers/parse-tyre-pressure';
import { toBytes } from './internal/to-bytes.js';
import type { BinaryInput, Configuration, ForzaTune } from './types.js';

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
export async function parse(
  input: BinaryInput,
  config: Configuration = { unitSystem: UnitSystem.Imperial },
): Promise<ForzaTune> {
  const bytes = await toBytes(input);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tuning = {
    tyrePressure: {
      front: parseTyrePressure(view, 0x1ce, config),
      rear: parseTyrePressure(view, 0x1fa, config),
    },
    gearing: {
      finalDrive: parseFinalDrive(view, 0x1a6),
      ratios: parseGearRatios(view, 0x22e),
    },
    alignment: {
      camber: {
        front: parseCamberToe(view, 0x1d2),
        rear: parseCamberToe(view, 0x1fe),
      },
      toe: {
        front: parseCamberToe(view, 0x1d6),
        rear: parseCamberToe(view, 0x202),
      },
      caster: parseCaster(view, 0x1da),
    },
    antiRollBars: {
      front: parseAntiRollBar(view, 0x1e2),
      rear: parseAntiRollBar(view, 0x20e),
    },
    springs: {
      stiffness: {
        front: parseSpringStiffness(view, 0x1de, config, Position.Front),
        rear: parseSpringStiffness(view, 0x20a, config, Position.Rear),
      },
      rideHeight: {
        front: parseRideHeight(view, 0x1e6, config, Position.Front),
        rear: parseRideHeight(view, 0x212, config, Position.Rear),
      },
    },
    damping: {
      reboundStiffness: {
        front: parseBumpRebound(view, 0x1ee),
        rear: parseBumpRebound(view, 0x21a),
      },
      bumpStiffness: {
        front: parseBumpRebound(view, 0x1ea),
        rear: parseBumpRebound(view, 0x216),
      },
    },
    aero: {
      front: parseAero(view, 0x19e, config, Position.Front),
      rear: parseAero(view, 0x1a2, config, Position.Rear),
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
    ordinal: parseOrdinal(view, 0x2),
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
      intercooler: parseIntercooler(view, 0x82),
    },
    platform: {
      brakes: parseDefault(view, 0x1e),
      springsAndDampers: parseSpringsAndDampers(view, 0x22),
      frontAntiRollBar: parseDefault(view, 0x26),
      rearAntiRollBar: parseDefault(view, 0x2a),
      weightReduction: parseDefault(view, 0xae),
      chassisReinforcement: parseDefault(view, 0x32),
    },
    drivetrain: {
      clutch: parseDefault(view, 0x86),
      transmission: parseTransmission(view, 0x8a, tuning.gearing.ratios.length),
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
