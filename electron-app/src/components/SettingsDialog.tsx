import React, { useState } from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  Input,
  Typography,
  Button,
  Box,
} from "@mui/joy";
import { useTheme } from "@mui/joy/styles";

export default function SettingsDialog({
  open,
  onClose,
  saveKey,
}: {
  open: boolean;
  onClose: () => void;
  saveKey: (k: string) => void;
}) {
  const theme = useTheme();
  // @ts-ignore
  const isDark = theme.colorScheme === "dark";
  const [key, setKey] = useState(localStorage.getItem("geminiKey") || "");

  const handleSave = () => {
    const trimmed = key.trim();
    localStorage.setItem("geminiKey", trimmed);
    saveKey(trimmed);
    onClose();
  };

  /* ------------------------------------------------------------------ */
  /* Dialog                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        sx={{
          bgcolor: "background.surface",
          boxShadow: "md",
          borderColor: "divider",
          borderRadius: "md",
          width: { xs: "90%", sm: 400 },
          p: 3,
        }}
      >
        <ModalClose />

        {/* @ts-ignore */}
        <Typography level="h4" color="text.primary" mb={1}>
          Settings
        </Typography>
        {/* @ts-ignore */}
        <Typography level="body3" color="text.secondary" mb={3}>
          Enter your Google AI key to unlock AI Snippets.
        </Typography>
        {/* @ts-ignore */}
        <Typography level="body3" color="text.primary" mb={1}>
          Google AI API Key
        </Typography>

        {/* Input – white bg in light mode, dark bg in dark mode */}
        <Input
          placeholder="sk-..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          variant="outlined"
          sx={{
            width: "100%",
            // slightly lighter than pure #000 so border and text pop
            bgcolor: isDark ? "neutral.800" : "background.body",
            borderColor: isDark ? "neutral.600" : "neutral.300",
            "&:hover": { borderColor: "primary.400" },
            "&:focus-within": { borderColor: "primary.500" },
          }}
          slotProps={{
            input: {
              sx: {
                // white text in dark, default in light
                color: isDark ? "#FFF" : undefined,
                // bright placeholder for dark mode
                "&::placeholder": {
                  color: isDark ? "rgba(255,255,255,0.65)" : "text.secondary",
                },
              },
            },
          }}
        />

        {/* Save */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="solid" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
