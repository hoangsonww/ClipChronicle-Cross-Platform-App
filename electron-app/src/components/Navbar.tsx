import React from "react";
import { Sheet, Box, Typography, IconButton, Avatar, Tooltip } from "@mui/joy";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import ClipboardIcon from "@mui/icons-material/ContentPasteSearchRounded";

export default function Navbar({
  onSettings,
  mode,
  toggleMode,
}: {
  onSettings: () => void;
  mode: "light" | "dark";
  toggleMode: () => void;
}) {
  return (
    <Sheet
      variant="solid"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1.5,
        bgcolor: mode === "light" ? "#ffffff" : "#000000",
        boxShadow: "sm",
        borderBottom: "1px solid",
        borderColor: "neutral.300",
      }}
    >
      {/* Brand */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          size="md"
          variant="soft"
          sx={{
            bgcolor: mode === "light" ? "primary.100" : "primary.800",
            color: "primary.500",
            fontSize: "1.5rem",
          }}
        >
          <ClipboardIcon />
        </Avatar>
        <Box>
          <Typography
            level="h1"
            sx={{
              color: mode === "dark" ? "#ffffff" : "#000000",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            ClipChronicle
          </Typography>
          <Typography
            level="body-md"
            sx={{
              mt: 0.25,
              fontStyle: "bold",
              opacity: 0.8,
              color: mode === "dark" ? "#cccccc" : "#555555",
            }}
          >
            Your intelligent clipboard manager
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip
          sx={{
            bgcolor: "#1a1a1a",
          }}
          title={
            <Box sx={{ maxWidth: 320, fontSize: "0.875rem", lineHeight: 1.4 }}>
              {/* @ts-ignore */}
              <Typography level="body3" mb={1}>
                Getting Started:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <li>All copied items are saved here automatically.</li>
                <li>Use the search bar to filter clips.</li>
                <li>Click a clip to select it and reveal AI actions.</li>
              </Box>

              {/* @ts-ignore */}
              <Typography level="body3" mb={1} mt={1}>
                Using AI Features:
              </Typography>
              <Box component="ol" sx={{ pl: 2, m: 0 }}>
                <li>Click the ⚙️ Settings icon.</li>
                <li>
                  Go to{" "}
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener"
                  >
                    aistudio.google.com
                  </a>{" "}
                  and create an API key.
                </li>
                <li>Paste your key into the Settings dialog and save.</li>
                <li>
                  Select a clip and click Summarize / Rewrite / Translate /
                  Extract.
                </li>
              </Box>

              {/* @ts-ignore */}
              <Typography level="body3" mb={1} mt={1}>
                Tips & Tricks:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <li>Click ❤️ to favorite a clip.</li>
                <li>Click 📋 to copy it back to the clipboard.</li>
                <li>Drag the divider to resize panels.</li>
                <li>Toggle dark/light mode with the moon/sun icon.</li>
              </Box>
            </Box>
          }
          placement="bottom-start"
        >
          <IconButton
            variant="soft"
            sx={{ color: mode === "light" ? "neutral.700" : "neutral.300" }}
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>

        <IconButton
          variant="soft"
          onClick={toggleMode}
          sx={{ color: mode === "light" ? "neutral.700" : "neutral.300" }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <IconButton
          variant="soft"
          onClick={onSettings}
          sx={{ color: mode === "light" ? "neutral.700" : "neutral.300" }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
