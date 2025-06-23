/** background – handles CLEAR / DELETE / toast notifications */
export {};

const KEY = "clips";

/* simple helper for Chrome notifications */
function notify(title: string, message: string) {
  /* pick a 128-px icon you really have in /public */
  const icon = chrome.runtime.getURL("public/android-chrome-192x192.png");

  chrome.notifications.create({
    type: "basic",
    iconUrl: icon,
    title,
    message,
  });
}

chrome.runtime.onMessage.addListener((msg, _s, send) => {
  if (msg === "CLIP_CLEAR") {
    chrome.storage.local.remove(KEY).then(() => {
      notify("ClipChronicle", "History cleared");
      send(true);
    });
    return true;
  }

  if (msg?.type === "CLIP_DELETE") {
    chrome.storage.local.get(KEY, (o) => {
      const next = (o[KEY] ?? []).filter((c: any) => c.id !== msg.id);
      chrome.storage.local.set({ [KEY]: next }).then(() => {
        notify("ClipChronicle", "Entry deleted");
        send(true);
      });
    });
    return true;
  }

  if (msg?.type === "CLIP_ADDED") {
    notify("Copied", msg.text.slice(0, 80));
  }
});
