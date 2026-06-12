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
  const volkswagenGolfGTI16vMk2 = await loadFixture(
    '1992-Volkswagen-Golf-GTI-16v-Mk2-Modified',
  );
  const fordMustangShelbyGT500 = await loadFixture(
    '2020-Ford-Mustang-Shelby-GT500-Modified',
  );

  it('rejects unsupported input with a TypeError', async () => {
    // @ts-expect-error -- deliberately wrong type
    await expect(parse('unsupported input')).rejects.toThrow(TypeError);
  });

  it('parse upgrades for the stock 2026 GR GT Prototype', async () => {
    const tune = await parse(grGtPrototypeStock);
    expect(tune.ordinal).toBe(4221);
    expect(tune.engine.intake.selected).toBe('Stock');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor.selected).toBe('Stock');
    expect(tune.engine.ignition.selected).toBe('Stock');
    expect(tune.engine.exhaust.selected).toBe('Stock');
    expect(tune.engine.camshaft.selected).toBe('Stock');
    expect(tune.engine.valves.selected).toBe('Stock');
    expect(tune.engine.displacement.selected).toBe('Stock');
    expect(tune.engine.pistons.selected).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo?.selected).toBe('Stock');
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler.selected).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling.selected).toBe('Stock');
    expect(tune.engine.flywheel.selected).toBe('Stock');
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.conversions.engineSwap.selected).toBe('Stock');
    expect(tune.conversions.drivetrainSwap.selected).toBe('Stock');
    expect(tune.conversions.bodySwap.selected).toBe('Stock');
    expect(tune.drivetrain.clutch.selected).toBe('Stock');
    expect(tune.drivetrain.transmission.selected).toBe('Stock');
    expect(tune.drivetrain.driveline.selected).toBe('Stock');
    expect(tune.drivetrain.differential.selected).toBe('Stock');
    expect(tune.tuning.tyrePressure.front.value).toBe(34);
    expect(tune.tuning.tyrePressure.rear.value).toBe(35);
    expect(tune.tuning.brakes.balance.value).toBe(50.0);
    expect(tune.tuning.brakes.pressure.value).toBe(100.0);
  });

  it('parse upgrades for the modified 1992 Volkswagen Golf GTI 16v Mk2', async () => {
    const tune = await parse(volkswagenGolfGTI16vMk2);
    expect(tune.ordinal).toBe(353);
    expect(tune.engine.intake.selected).toBe('Street');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor.selected).toBe('Sport');
    expect(tune.engine.ignition.selected).toBe('Sport');
    expect(tune.engine.exhaust.selected).toBe('Race');
    expect(tune.engine.camshaft.selected).toBe('Sport');
    expect(tune.engine.valves.selected).toBe('Race');
    expect(tune.engine.displacement.selected).toBe('Sport');
    expect(tune.engine.pistons.selected).toBe('Race');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo).toBe(null);
    expect(tune.engine.centrifugalSupercharger?.selected).toBe('Race');
    expect(tune.engine.supercharger).toBe(null);
    expect(tune.engine.intercooler.selected).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling.selected).toBe('Race');
    expect(tune.engine.flywheel.selected).toBe('Street');
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.conversions.engineSwap.selected).toBe('2nd Non-Stock');
    expect(tune.conversions.drivetrainSwap.selected).toBe('AWD');
    expect(tune.conversions.bodySwap.selected).toBe('Non-Stock');
    expect(tune.drivetrain.clutch.selected).toBe('Stock');
    expect(tune.drivetrain.transmission.selected).toBe('Race: 8-Speed');
    expect(tune.drivetrain.driveline.selected).toBe('Race');
    expect(tune.drivetrain.differential.selected).toBe('Race');
    expect(tune.tuning.tyrePressure.front.value).toBe(31.0);
    expect(tune.tuning.tyrePressure.rear.value).toBe(27.0);
    expect(tune.tuning.gearing.finalDrive.value).toBe(3.86);
    expect(tune.tuning.gearing.ratios.map((r) => r.value)).toEqual([
      4.17, 2.95, 2.35, 1.9, 1.58, 1.29, 1.01, 0.8,
    ]);
    expect(tune.tuning.alignment.camber.front.value).toBe(-0.5);
    expect(tune.tuning.alignment.camber.rear.value).toBe(0.0);
    expect(tune.tuning.alignment.toe.front.value).toBe(0.0);
    expect(tune.tuning.alignment.toe.rear.value).toBe(0.0);
    expect(tune.tuning.alignment.caster.value).toBe(6.5);
    expect(tune.tuning.antiRollBars.rear.value).toBe(23.5);
    expect(tune.tuning.damping.reboundStiffness.front.value).toBe(11.3);
    expect(tune.tuning.damping.reboundStiffness.rear.value).toBe(6.6);
    expect(tune.tuning.damping.bumpStiffness.front.value).toBe(2.3);
    expect(tune.tuning.damping.bumpStiffness.rear.value).toBe(1.3);
  });

  it('parse upgrades for the modified 2020 Ford Mustang Shelby GT500', async () => {
    const tune = await parse(fordMustangShelbyGT500);
    expect(tune.ordinal).toBe(3277);
    expect(tune.engine.intake.selected).toBe('Race');
    expect(tune.engine.intakeManifold).toBe(null);
    expect(tune.engine.fuelSystemOrCarburetor.selected).toBe('Sport');
    expect(tune.engine.ignition.selected).toBe('Race');
    expect(tune.engine.exhaust.selected).toBe('Sport');
    expect(tune.engine.camshaft.selected).toBe('Stock');
    expect(tune.engine.valves.selected).toBe('Sport');
    expect(tune.engine.displacement.selected).toBe('Race');
    expect(tune.engine.pistons.selected).toBe('Stock');
    expect(tune.engine.singleTurbo).toBe(null);
    expect(tune.engine.twinTurbo).toBe(null);
    expect(tune.engine.centrifugalSupercharger).toBe(null);
    expect(tune.engine.supercharger?.selected).toBe('Stock');
    expect(tune.engine.intercooler.selected).toBe(
      'Stock (Street if No Intercooler possible)',
    );
    expect(tune.engine.oilCooling.selected).toBe('Race');
    expect(tune.engine.flywheel.selected).toBe('Sport');
    expect(tune.engine.restrictorPlate).toBe(null);
    expect(tune.conversions.engineSwap.selected).toBe('Stock');
    expect(tune.conversions.drivetrainSwap.selected).toBe(
      'RWD (AWD if only option)',
    );
    expect(tune.conversions.bodySwap.selected).toBe('Stock');
    expect(tune.drivetrain.clutch.selected).toBe('Stock');
    expect(tune.drivetrain.transmission.selected).toBe('Race: 9-Speed');
    expect(tune.drivetrain.driveline.selected).toBe('Race');
    expect(tune.drivetrain.differential.selected).toBe('Drift (Rally if FWD)');
  });
});
