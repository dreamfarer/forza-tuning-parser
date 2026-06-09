/**
 * Binary input accepted by {@link parse}.
 *
 * `Blob` also covers the browser `File` object.
 */
export type BinaryInput = ArrayBuffer | Uint8Array | Blob;

/**
 * The parsed representation of a Forza tuning file.
 */
export interface ForzaTune {
  ordinal: number;
  engine: {
    intake: string;
    intakeManifold: string | null;
    fuelSystemOrCarburetor: string;
    ignition: string;
    exhaust: string;
    camshaft: string;
    valves: string;
    displacement: string;
    pistons: string;
    singleTurbo: string | null;
    twinTurbo: string | null;
    centrifugalSupercharger: string | null;
    supercharger: string | null;
    intercooler: string;
    oilCooling: string;
    flywheel: string;
    restrictorPlate: string | null;
  };
  drivetrain: {
    clutch: string;
    transmission: string;
    driveline: string;
    differential: string;
  };
  conversions: {
    engineSwap: string;
    drivetrainSwap: string;
    bodySwap: string;
  };
  tuning: {
    tyrePressure: {
      front: number;
      rear: number;
    };
    gearing: {
      finalDrive: number;
      ratios: number[];
    };
    alignment: {
      camber: {
        front: number;
        rear: number;
      };
      toe: {
        front: number;
        rear: number;
      };
      caster: number;
    };
    antiRollBars: {
      front: number;
      rear: number;
    };
    springs: {
      stiffness: {
        front: number;
        rear: number;
      };
      rideHeight: {
        front: number;
        rear: number;
      };
    };
    damping: {
      reboundStiffness: {
        front: number;
        rear: number;
      };
      bumpStiffness: {
        front: number;
        rear: number;
      };
    };
    aero: {
      front: number;
      rear: number;
    };
    brakes: {
      balance: number;
      pressure: number;
    };
    differential: {
      front: {
        acceleration: number;
        deceleration: number;
      };
      rear: {
        acceleration: number;
        deceleration: number;
      };
      balance: number;
    };
  };
}
