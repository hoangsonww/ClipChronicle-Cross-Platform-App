/** content/index.ts – copy/cut capture + robust highlight */
declare global {
  interface Window {
    find(
      searchString: string,
      caseSensitive?: boolean,
      backwards?: boolean,
      wrapAround?: boolean,
      wholeWord?: boolean,
      searchInFrames?: boolean,
      showDialog?: boolean,
    ): boolean;
  }
}
export {};

interface Clip {
  id: number;
  text: string;
  url: string;
  ts: number;
}
const KEY = "clips",
  MAX = 200;

/* ─── write to storage ─────────────────────────────────────────── */
async function push(text: string) {
  const clean = text.trim();
  if (!clean) return;

  const { [KEY]: raw } = await chrome.storage.local.get(KEY);
  const list: Clip[] = Array.isArray(raw) ? raw : [];

  const now = Date.now();
  list.unshift({ id: now, text: clean, url: location.href, ts: now });
  await chrome.storage.local.set({ [KEY]: list.slice(0, MAX) });

  chrome.runtime.sendMessage({ type: "CLIP_ADDED", text: clean });
}

/* ─── copy / cut listeners (capture phase) ─────────────────────── */
function onCopyCut(ev: Event): void {
  const e = ev as ClipboardEvent;
  const txt =
    e.clipboardData?.getData("text/plain") ||
    document.getSelection()?.toString() ||
    "";
  push(txt);
}
(["copy", "cut"] as const).forEach((evt) =>
  document.addEventListener(evt, onCopyCut, true),
);

/* ─── highlight logic ──────────────────────────────────────────── */
let mark: HTMLElement | null = null;

function clearHighlight() {
  if (!mark) return;
  const frag = document.createDocumentFragment();
  Array.from(mark.childNodes).forEach((n) => frag.appendChild(n));
  mark.replaceWith(frag);
  mark = null;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type !== "HL") return;

  clearHighlight();

  /* reset selection so window.find starts from top of page */
  window.getSelection()?.removeAllRanges();

  /* window.find gives us exact-phrase search across nodes */
  const found = window.find(msg.text, false, false, true, false, false, false);
  if (!found) return;

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  /* wrap in <mark> to give persistent style */
  mark = document.createElement("mark");
  mark.className = "cc-highlight";
  range.surroundContents(mark);
  mark.scrollIntoView({ behavior: "smooth", block: "center" });
});
