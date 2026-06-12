# forza-tuning-parser

Parse binary Forza tuning files into typed objects. Works in both **Node.js** and the **browser**. It exports types for TypeScript but stays fully usable from JavaScript.

_Spring stiffness_, _ride height_ and _aero_ values are car-dependent. Since this package does not know the stats for each car, it outputs these values as slider positions in per cent (_%_) by default. If you supply the corresponding value ranges through the parser configuration, they are reported in the chosen unit system instead.

By default values are reported in **imperial** units. You may opt into **metric** units through the configuration, but be aware that the in-game UI sliders create ambiguity when using metric units (_e.g. there are 14 slider positions which all read 1.1 bar tyre pressure_).

## Install

```bash
npm install forza-tuning-parser
```

## API

### `parse(input, config?): Promise<ForzaTune>`

| Param    | Type                                        | Default                              |
| -------- | ------------------------------------------- | ------------------------------------ |
| `input`  | `ArrayBuffer \| Uint8Array \| Blob \| File` | —                                    |
| `config` | `Configuration`                             | `{ unitSystem: UnitSystem.Imperial }` |

Parses a binary Forza tuning file. Throws `TypeError` for unsupported input and `RangeError` if a field could not be parsed.

If you want to reverse-engineer the binary format yourself, my [ImHex](https://github.com/WerWolv/ImHex) pattern is available [here](https://github.com/dreamfarer/forza-tuning-parser/blob/main/misc/ImHex/pattern.hexpat).

### `Configuration`

Controls the unit system and supplies the car-dependent value ranges. If a range is omitted, the corresponding value is reported as a slider position in per cent (`%`) instead of a real-world unit.

```ts
enum UnitSystem {
  Imperial,
  Metric,
}

interface ValueRange {
  min: number;
  max: number;
}

interface Configuration {
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
```

### Field types

Most fields are parsed into one of two shapes.

`UpgradeField` represents a discrete upgrade selection. `raw` is the value read from the file, `selected` is the resolved upgrade name, and `options` lists all available upgrades for that field.

```ts
interface UpgradeField {
  raw: number;
  selected: string;
  options: string[];
}
```

`TuningField` represents a numeric tuning value. `raw` is the value read from the file, `value` is the interpreted in-game value, `unit` is its unit (or `null` when dimensionless), and `range` is the min/max it can take.

```ts
interface TuningField {
  raw: number;
  value: number;
  unit: string | null;
  range: ValueRange;
}
```

### `ForzaTune`

> [!IMPORTANT]
> More fields are being currently added, this type is not yet complete.

```ts
interface ForzaTune {
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
```

Optional upgrade fields (typed as `UpgradeField | null`) return `null` when the upgrade is not present.

## Example Usage

### Browser (drag-and-drop)

```ts
import { parse } from 'forza-tuning-parser';

dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (!file) return;

  const tune = await parse(file);
  console.log(tune.tuning.tyrePressure.front.value);
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
