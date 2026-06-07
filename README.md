# forza-tuning-parser

Parse binary Forza tuning files into typed objects. Works in both **Node.js** and the **browser**. Ships both **ESM** and **CJS**, and exports types for TypeScript but stays fully usable from JavaScript.

## Install

```bash
npm install forza-tuning-parser
```

## Documentation
If you want to reverse-engineer binary Forza tuning files yourself, you can find my [ImHex](https://github.com/WerWolv/ImHex) pattern [here](https://github.com/dreamfarer/forza-tuning-parser/blob/main/misc/ImHex/pattern.hexpat).

### API Documentation

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
