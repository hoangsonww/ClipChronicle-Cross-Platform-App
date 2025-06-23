import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/joy";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ExpandMore from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/KeyboardArrowUp";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ClipRow } from "../global";

const PAGE_SIZE = 20;
const PREVIEW_CHARS = 140;
const COLLAPSED_HEIGHT = 180;

export default function HistoryGrid({
  selected,
  onSelect,
  notify,
}: {
  selected: ClipRow | null;
  onSelect: (c: ClipRow) => void;
  notify: (msg: string, color?: any) => void;
}) {
  const [clips, setClips] = useState<ClipRow[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const load = async () => {
    setLoading(true);
    try {
      const data = q
        ? await window.api.searchHistory(q)
        : await window.api.getHistory();
      setClips(data);
      setPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const off = window.api.onHistory(load);
    return off;
  }, [q]);

  const toggleFav = async (id: number) => {
    await window.api.toggleFav(id);
    await load();
    notify("Favorite updated");
  };

  const copy = async (c: ClipRow) => {
    await window.api.copy(c);
    notify("Copied!", "success");
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalPages = Math.max(1, Math.ceil(clips.length / PAGE_SIZE));
  const shown = clips.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box sx={{ p: 2 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Input
          placeholder="Search…"
          startDecorator={<SearchRounded />}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          variant="outlined"
          sx={{
            flex: 1,
            border: "1px solid",
            borderColor: "neutral.300",
            borderRadius: "md",
            boxShadow: "sm",
            "&:hover": { boxShadow: "md" },
          }}
        />
        {loading && <CircularProgress size="sm" />}
      </Box>

      {/* Responsive Grid: 1 column under sm (600px), 2 columns at sm+ */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
        }}
      >
        {shown.map((c) => {
          const isExpanded = expanded.has(c.id);
          const isLong = c.type !== "image" && c.content.length > PREVIEW_CHARS;
          const displayText =
            !isLong || isExpanded
              ? c.content
              : `${c.content.slice(0, PREVIEW_CHARS)}…`;

          return (
            <Card
              key={c.id}
              onClick={() => onSelect(c)}
              variant="outlined"
              sx={{
                p: 2,
                height: isExpanded ? "auto" : COLLAPSED_HEIGHT,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "sm",
                borderRadius: "md",
                bgcolor: "background.surface",
                borderColor:
                  selected?.id === c.id ? "primary.500" : "neutral.300",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": { boxShadow: "md", borderColor: "primary.300" },
              }}
            >
              {/* Content */}
              <CardContent
                sx={{
                  p: 0,
                  flex: 1,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {c.type === "image" ? (
                  <Box
                    component="img"
                    src={`file://${c.content}`}
                    alt=""
                    sx={{
                      width: "100%",
                      height: isExpanded ? "auto" : "100%",
                      objectFit: "contain",
                      borderRadius: 1,
                    }}
                  />
                ) : (
                  <Typography
                    level="body-sm"
                    whiteSpace="pre-wrap"
                    sx={{
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    {displayText}
                  </Typography>
                )}
              </CardContent>

              {/* Footer */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color={c.favorite ? "danger" : "neutral"}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(c.id);
                    }}
                  >
                    {c.favorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <Tooltip title="Copy back">
                    <IconButton
                      size="sm"
                      variant="plain"
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(c);
                      }}
                    >
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                </Box>
                {isLong && (
                  <IconButton
                    size="sm"
                    variant="plain"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(c.id);
                    }}
                  >
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* Prev/Next Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            size="sm"
            variant="outlined"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft />
          </IconButton>
          <Typography level="body-sm">
            Page {page} / {totalPages}
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
