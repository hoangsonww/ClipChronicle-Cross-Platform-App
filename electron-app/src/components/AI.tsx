import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  CircularProgress,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ClipRow } from "../global";

const actions = ["summarize", "rewrite", "translate", "extract"] as const;
type Action = (typeof actions)[number];

export default function AI({
  selected,
  apiKey,
  notify,
}: {
  selected: ClipRow | null;
  apiKey: string;
  notify: (msg: string, color?: any) => void;
}) {
  const theme = useTheme();
  // @ts-ignore
  const isDark = theme.colorScheme === "dark";

  const [loading, setLoading] = useState<Action | null>(null);
  const [resp, setResp] = useState("");

  const run = async (act: Action) => {
    if (!selected) {
      notify("Please select a clip first", "warning");
      return;
    }
    if (!apiKey) {
      notify("Add your API key in Settings", "warning");
      return;
    }
    setLoading(act);
    try {
      const out = await window.api.ai(act, selected.content, apiKey);
      setResp(out);
      notify("AI operation completed", "success");
    } catch (err) {
      notify((err as Error).message, "danger");
    } finally {
      setLoading(null);
    }
  };

  const subtitle = selected
    ? "Now choose an AI action above to process the selected clip."
    : "Select an item from the left to enable AI actions.";

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "background.surface",
        borderRadius: "sm",
        boxShadow: "sm",
        border: "1px solid",
        borderColor: "neutral.300",
      }}
    >
      {/* @ts-ignore */}
      <Typography level="h5" color="text.primary" sx={{ mb: 0.5 }}>
        AI Snippets
      </Typography>
      {/* @ts-ignore */}
      <Typography level="body-sm" color="text.secondary" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>

      <Stack spacing={1}>
        {actions.map((act) => (
          <Button
            key={act}
            size="sm"
            onClick={() => run(act)}
            loading={loading === act}
            disabled={!selected}
          >
            {act.charAt(0).toUpperCase() + act.slice(1)}
          </Button>
        ))}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <CircularProgress size="sm" />
          </Box>
        )}

        {resp && (
          <Sheet
            variant="soft"
            sx={{
              p: 1,
              mt: 1,
              maxHeight: 220,
              overflowY: "auto",
              borderRadius: "sm",
              bgcolor: "#fff",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  // @ts-ignore
                  <Typography
                    level="body-sm"
                    sx={{
                      color: isDark ? "text.primary" : "text.primary",
                      mb: 1,
                    }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  // @ts-ignore
                  <Typography
                    component="li"
                    level="body-sm"
                    sx={{
                      color: isDark ? "text.primary" : "text.primary",
                      pl: 1,
                      mb: 0.5,
                    }}
                    {...props}
                  />
                ),
                // @ts-ignore
                code: ({ node, inline, ...props }) => (
                  <Box
                    component="code"
                    sx={{
                      px: inline ? 0.5 : 1,
                      py: inline ? 0 : 0.5,
                      bgcolor: "neutral.100",
                      color: isDark ? "common.black" : "primary.700",
                      borderRadius: "xs",
                      fontFamily: "monospace",
                      fontSize: "0.8em",
                      display: inline ? "inline" : "block",
                      mb: inline ? 0 : 1,
                      overflowX: "auto",
                    }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  // @ts-ignore
                  <Typography
                    component="a"
                    level="body-sm"
                    sx={{
                      color: "primary.400",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
              }}
            >
              {resp}
            </ReactMarkdown>
          </Sheet>
        )}
      </Stack>
    </Sheet>
  );
}
