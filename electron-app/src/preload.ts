import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getHistory: () => ipcRenderer.invoke("history:get"),
  searchHistory: (q: string) => ipcRenderer.invoke("history:search", q),
  toggleFav: (id: number) => ipcRenderer.invoke("history:toggleFav", id),
  // @ts-ignore
  copy: (row) => ipcRenderer.invoke("clip:copy", row),
  ai: (action: string, text: string, key: string) =>
    ipcRenderer.invoke("ai:exec", action, text, key),
  onHistory: (cb: () => void) => {
    ipcRenderer.on("history-updated", cb);
    return () => ipcRenderer.removeListener("history-updated", cb);
  },
});
