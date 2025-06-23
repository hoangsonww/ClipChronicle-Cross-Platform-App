import React, { useState } from "react";
import { Box, Typography } from "@mui/joy";

export default function ResizableLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const [pct, setPct] = useState(60);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startPct = pct;
    const onMove = (mv: MouseEvent) => {
      const dx = mv.clientX - startX;
      setPct(
        Math.min(80, Math.max(20, startPct + (dx / window.innerWidth) * 100)),
      );
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box sx={{ flexBasis: `${pct}%`, minWidth: 260, overflow: "auto" }}>
          {left}
        </Box>

        <Box
          onMouseDown={startDrag}
          sx={{
            width: 6,
            cursor: "col-resize",
            bgcolor: "neutral.400",
            transition: "background-color .2s",
            "&:hover": { bgcolor: "primary.500" },
          }}
        />

        <Box sx={{ flex: 1, overflow: "auto", minWidth: 260 }}>{right}</Box>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 1,
          textAlign: "center",
          bgcolor: "background.level1",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* @ts-ignore */}
        <Typography level="body-xs" color="text.secondary">
          🚀 Created with Joy UI & React by{" "}
          <a
            href="https://github.com/hoangsonww"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Son Nguyen
          </a>{" "}
          in 2025 💻✨
        </Typography>
      </Box>
    </Box>
  );
}
