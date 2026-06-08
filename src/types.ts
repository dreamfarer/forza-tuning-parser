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
    camshaft: string;
    valves: string;
    displacement: string;
    pistons: string;
    fuelSystemOrCarburetor: string;
    ignition: string;
    exhaust: string;
    intake: string;
    flywheel: string;
    intakeManifold: string | null;
    restrictorPlate: string | null;
    oilCooling: string;
    singleTurbo: string | null;
    twinTurbo: string | null;
    centrifugalSupercharger: string | null;
    supercharger: string | null;
    intercooler: string;
  };
}
