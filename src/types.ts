import type {UnitSystem} from "./enums";

/**
 * Binary input accepted by {@link parse}.
 *
 * `Blob` also covers the browser `File` object.
 */
export type BinaryInput = ArrayBuffer | Uint8Array | Blob;

/** A range of values from min to max (inclusive). */
export interface ValueRange {
  min: number;
  max: number;
}

/**
 * The configuration of the parser.
 * Supplying ranges will output values in the specified unit system (metric or imperial).
 * Failing to do so will output values in percentage (slider position).
 */
export interface Configuration {
  unitSystem: UnitSystem;
  springs?: {
    stiffness?: {
      front: ValueRange;
      rear: ValueRange;
    };
    rideHeight?: {
      front: ValueRange;
      rear: ValueRange;
    };
  };
  aero?: {
    front: ValueRange;
    rear: ValueRange;
  };
}

/**
 * The parsed representation of an upgrade field.
 * Contains the currently selected upgrade and the list of available upgrades.
 */
export interface UpgradeField {
  selected: string;
  options: string[];
}

/**
 * The parsed representation of a tuning field.
 * Contains the value, unit, and range of the tuning field.
 */
export interface TuningField {
  value: number;
  unit: string;
  range: ValueRange;
}

/**
 * The parsed representation of a Forza tuning file.
 */
export interface ForzaTune {
  ordinal: number;
  engine: {
    intake: UpgradeField;
    intakeManifold: UpgradeField | null;
    fuelSystemOrCarburetor: UpgradeField;
    ignition: UpgradeField;
    exhaust: UpgradeField;
    camshaft: UpgradeField;
    valves: UpgradeField;
    displacement: UpgradeField;
    pistons: UpgradeField;
    singleTurbo: UpgradeField | null;
    twinTurbo: UpgradeField | null;
    centrifugalSupercharger: UpgradeField | null;
    supercharger: UpgradeField | null;
    intercooler: UpgradeField;
    oilCooling: UpgradeField;
    flywheel: UpgradeField;
    restrictorPlate: UpgradeField | null;
  };
  drivetrain: {
    clutch: UpgradeField;
    transmission: UpgradeField;
    driveline: UpgradeField;
    differential: UpgradeField;
  };
  conversions: {
    engineSwap: UpgradeField;
    drivetrainSwap: UpgradeField;
    bodySwap: UpgradeField;
  };
  tuning: {
    tyrePressure: {
      front: TuningField;
      rear: TuningField;
    };
    gearing: {
      finalDrive: TuningField;
      ratios: TuningField[];
    };
    alignment: {
      camber: {
        front: TuningField;
        rear: TuningField;
      };
      toe: {
        front: TuningField;
        rear: TuningField;
      };
      caster: TuningField;
    };
    antiRollBars: {
      front: TuningField;
      rear: TuningField;
    };
    springs: {
      stiffness: {
        front: TuningField;
        rear: TuningField;
      };
      rideHeight: {
        front: TuningField;
        rear: TuningField;
      };
    };
    damping: {
      reboundStiffness: {
        front: TuningField;
        rear: TuningField;
      };
      bumpStiffness: {
        front: TuningField;
        rear: TuningField;
      };
    };
    aero: {
      front: TuningField;
      rear: TuningField;
    };
    brakes: {
      balance: TuningField;
      pressure: TuningField;
    };
    differential: {
      front: {
        acceleration: TuningField;
        deceleration: TuningField;
      };
      rear: {
        acceleration: TuningField;
        deceleration: TuningField;
      };
      balance: TuningField;
    };
  };
}
