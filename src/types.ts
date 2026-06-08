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
}
