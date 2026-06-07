# forza-tuning-parser

Parse Forza tuning binary files into a typed object. Works in both **Node.js** and the **browser**. Ships both **ESM** and **CJS**, and exports types for TypeScript but stays fully usable from JavaScript.

## Install

```bash
npm install forza-tuning-parser
```

## Documentation

### `parse(input): Promise<ForzaTune>`

| Param   | Type                                   | Notes                                            |
| ------- | -------------------------------------- | ------------------------------------------------ |
| `input` | `ArrayBuffer \| Uint8Array \| Blob`    | `Blob` also covers the browser `File`.           |

Throws `TypeError` for unsupported input. Returns the parsed `ForzaTune`.

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
