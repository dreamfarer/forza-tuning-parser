import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse } from '../src';

async function loadFixture(name: string): Promise<Uint8Array> {
  const url = new URL(`./fixtures/${name}`, import.meta.url);
  return readFile(fileURLToPath(url));
}

describe('parse', async () => {
  const grGtPrototypeStock = await loadFixture('2026-GR-GT-Prototype-Stock');
  const honda52EvasiveMotorsportsS2000WTAC = await loadFixture(
    '2004-Honda-52-Evasive-Motorsports-S2000-WTAC-Modified',
  );
  const volkswagenGolfGTI16vMk2 = await loadFixture(
    '1992-Volkswagen-Golf-GTI-16v-Mk2-Modified',
  );
  const fordMustangShelbyGT500 = await loadFixture('2020-Ford-Mustang-Shelby-GT500-Modified')

  it('rejects unsupported input with a TypeError', async () => {
    // @ts-expect-error -- deliberately wrong type
    await expect(parse('unsupported input')).rejects.toThrow(TypeError);
  });

  it('parse upgrades for the stock 2026 GR GT Prototype', async () => {
    const tune = await parse(grGtPrototypeStock);
    expect(tune.ordinal).toBe(4221);
    expect(tune.engine.intake).toBe('Stock');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor).toBe('Stock');
    expect(tune.engine.ignition).toBe('Stock');
    expect(tune.engine.exhaust).toBe('Stock');
    expect(tune.engine.camshaft).toBe('Stock');
    expect(tune.engine.valves).toBe('Stock');
    expect(tune.engine.displacement).toBe('Stock');
    expect(tune.engine.pistons).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo).toBe('Stock');
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling).toBe('Stock');
    expect(tune.engine.flywheel).toBe('Stock');
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.conversions.engineSwap).toBe('Stock');
    expect(tune.conversions.drivetrainSwap).toBe('Stock');
    expect(tune.conversions.bodySwap).toBe('Stock');
  });

  it('parse upgrades for the modified 2004 Honda #52 Evasive Motorsports S2000 WTAC', async () => {
    const tune = await parse(honda52EvasiveMotorsportsS2000WTAC);
    expect(tune.ordinal).toBe(4231);
    expect(tune.engine.intake).toBe('Stock');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor).toBe('Stock');
    expect(tune.engine.ignition).toBe('Stock');
    expect(tune.engine.exhaust).toBe('Stock');
    expect(tune.engine.camshaft).toBe('Stock');
    expect(tune.engine.valves).toBe('Stock');
    expect(tune.engine.displacement).toBe('Stock');
    expect(tune.engine.pistons).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(
      'Street (Race w/ Anti-Lag if only option)',
    );
    expect(tune.engine.twinTurbo).toBe(null);
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling).toBe('Stock');
    expect(tune.engine.flywheel).toBe('Stock');
    expect(tune.engine.restrictorPlate).toBe('No Restrictor Plate');
    expect(tune.conversions.engineSwap).toBe('Stock');
    expect(tune.conversions.drivetrainSwap).toBe('Stock');
    expect(tune.conversions.bodySwap).toBe('Stock');
  });

  it('parse upgrades for the modified 1992 Volkswagen Golf GTI 16v Mk2', async () => {
    const tune = await parse(volkswagenGolfGTI16vMk2);
    expect(tune.ordinal).toBe(353);
    expect(tune.engine.intake).toBe('Street');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor).toBe('Sport');
    expect(tune.engine.ignition).toBe('Sport');
    expect(tune.engine.exhaust).toBe('Race');
    expect(tune.engine.camshaft).toBe('Sport');
    expect(tune.engine.valves).toBe('Race');
    expect(tune.engine.displacement).toBe('Sport');
    expect(tune.engine.pistons).toBe('Race');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo).toBe(null);
    expect(tune.engine.centrifugalSupercharger).toBe('Race');
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling).toBe('Race');
    expect(tune.engine.flywheel).toBe('Street');
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.conversions.engineSwap).toBe('2nd Non-Stock');
    expect(tune.conversions.drivetrainSwap).toBe('AWD');
    expect(tune.conversions.bodySwap).toBe('Non-Stock');
  });

  it('parse upgrades for the modified 2020 Ford Mustang Shelby GT500', async () => {
    const tune = await parse(fordMustangShelbyGT500);
    expect(tune.ordinal).toBe(3277);
    expect(tune.engine.intake).toBe('Race');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor).toBe('Sport');
    expect(tune.engine.ignition).toBe('Race');
    expect(tune.engine.exhaust).toBe('Sport');
    expect(tune.engine.camshaft).toBe('Stock');
    expect(tune.engine.valves).toBe('Sport');
    expect(tune.engine.displacement).toBe('Race');
    expect(tune.engine.pistons).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo).toBe(null);
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger).toBe('Stock');
    expect(tune.engine.intercooler).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling).toBe('Race');
    expect(tune.engine.flywheel).toBe('Sport');
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.conversions.engineSwap).toBe('Stock');
    expect(tune.conversions.drivetrainSwap).toBe('RWD (AWD if only option)');
    expect(tune.conversions.bodySwap).toBe('Stock');
  });
});
