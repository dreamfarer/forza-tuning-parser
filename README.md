# forza-tuning-parser

Parse binary Forza tuning files into typed objects. Works in both **Node.js** and the **browser**. It exports types for TypeScript but stays fully usable from JavaScript.

This package outputs in **imperial** units only because the in-game UI sliders create ambiguity when using metric units (_e.g. there are 14 slider positions which read 1.1 bar tyre pressure_).

## Install

```bash
npm install forza-tuning-parser
```

## API

### `parse(input): Promise<ForzaTune>`

| Param   | Type                                        |
| ------- | ------------------------------------------- |
| `input` | `ArrayBuffer \| Uint8Array \| Blob \| File` |

Parses a binary Forza tuning file. Throws `TypeError` for unsupported input and `RangeError` if field could not be parsed.

If you want to reverse-engineer the binary format yourself, my [ImHex](https://github.com/WerWolv/ImHex) pattern is available [here](https://github.com/dreamfarer/forza-tuning-parser/blob/main/misc/ImHex/pattern.hexpat).

### `ForzaTune`

> [!IMPORTANT]
> More fields are being currently added, this type is not yet complete.

```ts
interface ForzaTune {
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
    gearRatios: number[];
  };
}
```

Returns `null` for each field that is not present.

## Example Usage

### Browser (drag-and-drop)

```ts
import { parse } from 'forza-tuning-parser';

dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (!file) return;

  const tune = await parse(file);
  console.log(tune);
});
```

### Node.js

```ts
import { readFile } from 'node:fs/promises';
import { parse } from 'forza-tuning-parser';

const tune = await parse(await readFile('my.tune'));
```

### From a fetch / Next.js route

```ts
import { parse } from 'forza-tuning-parser';

const res = await fetch(url);
const tune = await parse(await res.arrayBuffer());
```
