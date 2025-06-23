import React, { useEffect, useMemo, useState } from "react";
import { CssVarsProvider, Sheet, Snackbar } from "@mui/joy";
import { lightTheme, darkTheme } from "../theme";
import Navbar from "./Navbar";
import ResizableLayout from "./ResizableLayout";
import HistoryGrid from "./HistoryGrid";
import AI from "./AI";
import ChartsPanel from "./ChartsPanel";
import SettingsDialog from "./SettingsDialog";

export default function App() {
  /* ------------------------------------------------------------------ */
  /* state                                                               */
  /* ------------------------------------------------------------------ */
  const [mode, setMode] = useState<"light" | "dark">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  const [selected, setSelected] = useState<any | null>(null);
  const [snack, setSnack] = useState<{ msg: string; color?: any } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("geminiKey") || "");

  /* ------------------------------------------------------------------ */
  /* theme + html attribute for CSS variables                            */
  /* ------------------------------------------------------------------ */
  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );

  // ensure Joy’s CSS vars pick up current mode
  useEffect(() => {
    document.documentElement.setAttribute("data-joy-color-scheme", mode);
  }, [mode]);

  const notify = (msg: string, color: any = "neutral") =>
    setSnack({ msg, color });

  /* ------------------------------------------------------------------ */
  /* render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <Sheet
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.body",
        }}
      >
        <Navbar
          mode={mode}
          toggleMode={() => setMode(mode === "light" ? "dark" : "light")}
          onSettings={() => setSettingsOpen(true)}
        />

        <ResizableLayout
          left={
            <HistoryGrid
              selected={selected}
              onSelect={setSelected}
              notify={notify}
            />
          }
          right={
            <Sheet
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: 0,
              }}
            >
              <AI selected={selected} apiKey={apiKey} notify={notify} />
              <ChartsPanel />
            </Sheet>
          }
        />

        <Snackbar
          open={!!snack}
          color={snack?.color}
          autoHideDuration={2500}
          onClose={() => setSnack(null)}
        >
          {snack?.msg}
        </Snackbar>

        <SettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          saveKey={(k) => {
            setApiKey(k);
            notify("API key saved", "success");
          }}
        />
      </Sheet>
    </CssVarsProvider>
  );
}
