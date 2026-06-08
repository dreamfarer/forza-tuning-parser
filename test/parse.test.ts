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
    '2004-Honda-52-Evasive-Motorsports-S2000-WTAC',
  );

  it('rejects unsupported input with a TypeError', async () => {
    // @ts-expect-error -- deliberately wrong type
    await expect(parse('unsupported input')).rejects.toThrow(TypeError);
  });

  it('parse car ordinal 4221 from a valid Forza tune file', async () => {
    const tune = await parse(grGtPrototypeStock);
    expect(tune.ordinal).toBe(4221);
  });

  it('parse engine upgrades from a valid stock Forza tune file', async () => {
    const tune = await parse(grGtPrototypeStock);
    expect(tune.engine.camshaft).toBe('Stock');
    expect(tune.engine.valves).toBe('Stock');
    expect(tune.engine.displacement).toBe('Stock');
    expect(tune.engine.pistons).toBe('Stock');
    expect(tune.engine.fuelSystemOrCarburetor).toBe('Stock');
    expect(tune.engine.ignition).toBe('Stock');
    expect(tune.engine.exhaust).toBe('Stock');
    expect(tune.engine.intake).toBe('Stock');
    expect(tune.engine.flywheel).toBe('Stock');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.engine.oilCooling).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo).toBe('Stock');
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler).toBe('Stock');
  });

  it('parse engine upgrades from a valid upgraded Forza tune file with anti-lag special case', async () => {
    const tune = await parse(honda52EvasiveMotorsportsS2000WTAC);
    expect(tune.engine.camshaft).toBe('Stock');
    expect(tune.engine.valves).toBe('Stock');
    expect(tune.engine.displacement).toBe('Stock');
    expect(tune.engine.pistons).toBe('Stock');
    expect(tune.engine.fuelSystemOrCarburetor).toBe('Stock');
    expect(tune.engine.ignition).toBe('Stock');
    expect(tune.engine.exhaust).toBe('Stock');
    expect(tune.engine.intake).toBe('Stock');
    expect(tune.engine.flywheel).toBe('Stock');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.restrictorPlate).toBe('No Restrictor Plate');
    expect(tune.engine.oilCooling).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(
      'Street (Race w/ Anti-Lag if only option)',
    );
    expect(tune.engine.twinTurbo).toBe(null);
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler).toBe('Stock');
  });
});
