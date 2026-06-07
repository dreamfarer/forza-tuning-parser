import { describe, expect, it } from 'vitest';
import { toBytes } from '../src/internal/to-bytes.js';

describe('toBytes', () => {
  const sample = new Uint8Array([0x46, 0x5a, 0x54, 0x4e]);

  it('passes a Uint8Array through unchanged', async () => {
    expect(await toBytes(sample)).toBe(sample);
  });

  it('wraps an ArrayBuffer', async () => {
    const out = await toBytes(sample.buffer);
    expect(Array.from(out)).toEqual(Array.from(sample));
  });

  it('reads a Blob', async () => {
    const blob = new Blob([sample]);
    const out = await toBytes(blob);
    expect(Array.from(out)).toEqual(Array.from(sample));
  });

  it('rejects unsupported input', async () => {
    // @ts-expect-error -- deliberately passing the wrong type
    await expect(toBytes('unsupported input')).rejects.toThrow(TypeError);
  });
});
