import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse } from '../src';

async function loadFixture(name: string): Promise<Uint8Array> {
  const url = new URL(`./fixtures/${name}`, import.meta.url);
  return readFile(fileURLToPath(url));
}

describe('parse', async () => {
  const validTune = await loadFixture('2026-GR-GT-Prototype-Stock');

  it('rejects unsupported input with a TypeError', async () => {
    // @ts-expect-error -- deliberately wrong type
    await expect(parse('unsupported input')).rejects.toThrow(TypeError);
  });

  it('reads car ordinal 4221 from a valid Forza tune file', async () => {
    const tune = await parse(validTune);
    expect(tune.ordinal).toBe(4221);
  });
});
