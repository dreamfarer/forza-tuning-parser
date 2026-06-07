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
}
