# API Reference

### `readClipboard(): Promise<string>`

Read plain-text contents from the system clipboard.

```ts
import { readClipboard } from "./clipboard";
const txt = await readClipboard();
```

### `writeClipboard(text: string): Promise<void>`

Write text to the system clipboard.

---

#### Formats & Utilities

- `clearClipboard(): Promise<void>` – clear all clipboard contents
- `listFormats(): Promise<string[]>` – MIME-like format list
- `readImageDataURI(): Promise<string>` – PNG data URI
- `writeImageDataURI(uri: string): Promise<void>` – write PNG data URI
- `watchText(intervalMs, callback)` – watch text changes

---

Return to [Home](index.md)
