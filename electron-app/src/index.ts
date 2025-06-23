import { app, BrowserWindow, clipboard, ipcMain, nativeImage } from "electron";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

type ClipType = "text" | "image" | "link";
export interface ClipRow {
  id: number;
  type: ClipType;
  content: string;
  timestamp: number;
  favorite: 0 | 1;
}

let win: BrowserWindow;
let db: Database.Database;
let lastHash = "";

const IMG_DIR = () => path.join(app.getPath("userData"), "images");
const DB_PATH = () => path.join(app.getPath("userData"), "history.db");
const md5 = (d: string | Buffer) =>
  require("crypto").createHash("md5").update(d).digest("hex");

/* ---------- DB --------------------------------------------------- */
function initDB() {
  db = new Database(DB_PATH());
  db.prepare(
    `CREATE TABLE IF NOT EXISTS clips (
                                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                                          type TEXT NOT NULL,
                                          content TEXT NOT NULL,
                                          timestamp INTEGER NOT NULL,
                                          favorite INTEGER DEFAULT 0
     )`,
  ).run();
}

/* ---------- clipboard watcher ------------------------------------ */
function watchClipboard() {
  setInterval(() => {
    const txt = clipboard.readText().trim();
    if (txt) {
      const h = md5(`t:${txt}`);
      if (h !== lastHash) {
        lastHash = h;
        const t: ClipType = /^https?:\/\//i.test(txt) ? "link" : "text";
        db.prepare(
          "INSERT INTO clips (type,content,timestamp) VALUES (?,?,?)",
        ).run(t, txt, Date.now());
        win.webContents.send("history-updated");
        return;
      }
    }
    const img = clipboard.readImage();
    if (!img.isEmpty()) {
      const buf = img.toPNG();
      const h = md5(buf);
      if (h !== lastHash) {
        lastHash = h;
        if (!fs.existsSync(IMG_DIR()))
          fs.mkdirSync(IMG_DIR(), { recursive: true });
        const file = path.join(IMG_DIR(), `${Date.now()}.png`);
        fs.writeFileSync(file, buf);
        db.prepare(
          "INSERT INTO clips (type,content,timestamp) VALUES (?,?,?)",
        ).run("image", file, Date.now());
        win.webContents.send("history-updated");
      }
    }
  }, 1000);
}

/* ---------- IPC bridge ------------------------------------------- */
function ipc() {
  ipcMain.handle(
    "history:get",
    () =>
      db
        .prepare("SELECT * FROM clips ORDER BY timestamp DESC")
        .all() as ClipRow[],
  );

  ipcMain.handle(
    "history:search",
    (_e, q: string) =>
      db
        .prepare(
          "SELECT * FROM clips WHERE content LIKE ? ORDER BY timestamp DESC",
        )
        .all(`%${q}%`) as ClipRow[],
  );

  ipcMain.handle("history:toggleFav", (_e, id: number) => {
    const row = db.prepare("SELECT favorite FROM clips WHERE id=?").get(id) as {
      favorite: 0 | 1;
    };
    const fav = row?.favorite ? 0 : 1;
    db.prepare("UPDATE clips SET favorite=? WHERE id=?").run(fav, id);
    win.webContents.send("history-updated");
  });

  ipcMain.handle("clip:copy", (_e, row: ClipRow) => {
    row.type === "image"
      ? clipboard.writeImage(nativeImage.createFromPath(row.content))
      : clipboard.writeText(row.content);
  });

  ipcMain.handle(
    "ai:exec",
    async (_e, action: string, text: string, userKey: string) => {
      try {
        const { aiRequest } = require("./utils/ai");
        return await aiRequest(action, text, userKey);
      } catch (err) {
        return `Error: ${(err as Error).message}`;
      }
    },
  );
}

/* ---------- window ----------------------------------------------- */
function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (!app.isPackaged) win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  initDB();
  create();
  ipc();
  watchClipboard();
});
