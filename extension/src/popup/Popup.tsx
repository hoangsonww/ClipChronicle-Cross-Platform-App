import { useEffect, useState, ChangeEvent } from "react";
import "../styles/global.css";

interface Clip {
  id: number;
  text: string;
  url: string;
  ts: number;
}
const KEY_CLIPS = "clips";
const KEY_MAX = "max";
const KEY_TOAST = "toastEnabled";

export default function Popup() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [showHelp, setHelp] = useState(false);

  /* user prefs */
  const [maxCfg, setMaxCfg] = useState<number>(200);
  const [toastOn, setToastOn] = useState<boolean>(true);

  /* ── load prefs + clips once ─────────────────────────────────── */
  useEffect(() => {
    chrome.storage.local.get([KEY_CLIPS, KEY_MAX, KEY_TOAST], (o) => {
      setClips(o[KEY_CLIPS] ?? []);
      setMaxCfg(o[KEY_MAX] ?? 200);
      setToastOn(o[KEY_TOAST] ?? true);
    });

    /* live update when clips array changes */
    const onChange = (
      chg: { [k: string]: chrome.storage.StorageChange },
      area: chrome.storage.AreaName,
    ) => {
      if (area === "local" && chg[KEY_CLIPS]) {
        setClips(chg[KEY_CLIPS].newValue ?? []);
      }
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => chrome.storage.onChanged.removeListener(onChange);
  }, []);

  /* ── helpers ─────────────────────────────────────────────────── */
  const list = clips.filter((c) =>
    c.text.toLowerCase().includes(query.toLowerCase()),
  );

  const pop = (msg: string) => {
    if (!toastOn) return;
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const copyAgain = (c: Clip) =>
    navigator.clipboard.writeText(c.text).then(() => pop("Copied"));

  const findOnPage = (c: Clip) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id)
        chrome.tabs.sendMessage(tabs[0].id, { type: "HL", text: c.text });
    });
    pop("Highlighted");
  };

  const del = (id: number) =>
    chrome.runtime.sendMessage({ type: "CLIP_DELETE", id }, () =>
      pop("Deleted"),
    );

  const clearAll = () =>
    chrome.runtime.sendMessage("CLIP_CLEAR", () => pop("History cleared"));

  const time = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /* ── UI ───────────────────────────────────────────────────────── */
  return (
    <div style={{ borderRadius: 16 }}>
      {/* Brand bar */}
      <header
        style={{
          padding: "12px 14px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18, color: "var(--brand)" }}>
          📑 ClipChronicle
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button
            className="icon"
            title="Help"
            onClick={() => setHelp((v) => !v)}
          >
            ❓
          </button>
          <button className="primary" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </header>

      {/* Help panel */}
      {showHelp && (
        <div id="help">
          <h3>Getting started</h3>
          <ul>
            <li>
              Max saved items: <b>{maxCfg}</b>
              <br />
              (configurable in Options)
            </li>
            <li>
              Copy / Cut text inside any normal <b>http/https</b> page.
              <br />
              It shows up instantly in ClipChronicle.
            </li>
            <li>
              Icons:
              <br />
              📋 copy&nbsp;&nbsp;🔍 find&nbsp;&nbsp;🗑️ delete
            </li>
            <li>“Clear All” wipes history.</li>
            <li>
              Nothing appears? Try:
              <br />
              – Reload the current tab.
              <br />
              – Disable any “copy-protector” extensions.
              <br />– Remember it can’t monitor <i>chrome://</i> pages or native
              apps.
            </li>
          </ul>
        </div>
      )}

      {/* Search */}
      <input
        className="search"
        placeholder="Search…"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        autoFocus
      />

      {/* List */}
      <div className="list">
        {list.map((c) => (
          <div key={c.id} className="item">
            <div className="text" title={c.text}>
              {c.text.length > 120 ? c.text.slice(0, 117) + "…" : c.text}
            </div>
            <span className="time">{time(c.ts)}</span>

            <button className="icon" title="Copy" onClick={() => copyAgain(c)}>
              📋
            </button>
            <button className="icon" title="Find" onClick={() => findOnPage(c)}>
              🔍
            </button>
            <button className="icon" title="Delete" onClick={() => del(c.id)}>
              🗑️
            </button>
          </div>
        ))}
        {!list.length && <div className="empty">No items</div>}
      </div>

      {toast && <div id="toast">{toast}</div>}
    </div>
  );
}
