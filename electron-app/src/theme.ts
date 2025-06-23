import { extendTheme } from "@mui/joy/styles";

const common = {
  fontFamily: {
    body: '"Inter", var(--joy-fontFamily-fallback)',
  },
  radius: { sm: "6px", md: "10px", lg: "16px" },
};

const indigo = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
};

export const lightTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: indigo,
        background: { body: "#ffffff", surface: "#f9fafb" },
        neutral: {
          50: "#fafafa",
          100: "#f4f4f5",
          500: "#71717a",
          900: "#18181b",
        },
      },
    },
  },
  ...common,
});

export const darkTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: indigo[100],
          100: indigo[200],
          200: indigo[300],
          300: indigo[400],
          400: indigo[500],
          500: indigo[600],
          600: indigo[700],
          700: indigo[800],
          800: indigo[900],
          900: "#1e1b4b",
        },
        background: { body: "#0d0d0d", surface: "#1a1a1a" },
        neutral: {
          50: "#18181b",
          100: "#27272a",
          500: "#a1a1aa",
          900: "#ffffff",
        },
      },
    },
  },
  ...common,
});
