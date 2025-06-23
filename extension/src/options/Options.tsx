import { useEffect, useState } from "react";

const KEY_MAX = "max";
const KEY_TOAST = "toastEnabled";

export default function Options() {
  const [max, setMax] = useState(200);
  const [toast, setToast] = useState(true);
  const [saved, setSaved] = useState(false);

  /* load prefs */
  useEffect(() => {
    chrome.storage.local.get([KEY_MAX, KEY_TOAST], (o) => {
      setMax(o[KEY_MAX] ?? 200);
      setToast(o[KEY_TOAST] ?? true);
    });
  }, []);

  /* save */
  const save = () => {
    chrome.storage.local.set({ [KEY_MAX]: max, [KEY_TOAST]: toast }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div
      style={{
        width: 480,
        maxWidth: "90vw",
        padding: 32,
        border: "1px solid var(--border)",
        borderRadius: 16,
        boxShadow: "0 4px 16px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "var(--brand)", margin: "0 0 12px" }}>
        ⚙️ ClipChronicle Options
      </h2>

      {/* settings */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Max history items</span>
          <input
            type="number"
            min={10}
            max={1000}
            value={max}
            onChange={(e) => setMax(+e.target.value)}
            style={{
              width: 90,
              padding: 4,
              border: "1px solid var(--border)",
              borderRadius: 6,
            }}
          />
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Show in-popup toasts</span>
          <input
            type="checkbox"
            checked={toast}
            onChange={(e) => setToast(e.target.checked)}
          />
        </label>

        <button className="primary" style={{ width: 140 }} onClick={save}>
          Save
        </button>
        {saved && <span style={{ color: "green" }}>✓ Saved</span>}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--border)",
          margin: "24px 0",
        }}
      />

      {/* tips */}
      <section style={{ fontSize: 13, lineHeight: 1.55 }}>
        <h3 style={{ margin: "0 0 8px" }}>Tips &amp; Troubleshooting</h3>
        <ul style={{ paddingLeft: 18 }}>
          <li>Reload open pages after changing settings.</li>
          <li>
            <b>Copy/Cut</b> events don’t fire on <i>chrome://</i>, PDFs, or
            desktop apps.
          </li>
          <li>
            If a site blocks copy, disable its “copy-protector” scripts or
            extensions.
          </li>
          <li>
            Chrome notifications for new clips appear even when pop-up toasts
            are off.
          </li>
        </ul>
      </section>
    </div>
  );
}
