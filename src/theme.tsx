import { createTheme } from "@mui/material/styles";

export type ModeTypes = "dark" | "light";

export const layoutSpacing = {
  desktopMargin: 8,
  mobileMargin: 2,
  gridGutter: 3,
} as const;

export const getTheme = (mode: ModeTypes = "light") =>
  createTheme({
    shape: {
      borderRadius: 4,
    },
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#e7c269" : "#765b06",
      },
      secondary: {
        main: mode === "dark" ? "#99cdf1" : "#2d6483",
      },
      error: {
        main: "#ba1a1a",
      },
      background: {
        default: mode === "dark" ? "#1f1d18" : "#fff9eb",
        paper: mode === "dark" ? "#333027" : "#fffdf5",
      },
      text: {
        primary: mode === "dark" ? "#f2efe8" : "#241f10",
        secondary: mode === "dark" ? "#ddd6c6" : "#544b36",
      },
    },
    typography: {
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      h1: {
        fontFamily: "Playfair Display, Georgia, serif",
        fontWeight: 900,
        fontSize: "3rem",
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: "Playfair Display, Georgia, serif",
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.25,
      },
      h3: {
        fontFamily: "Playfair Display, Georgia, serif",
        fontWeight: 700,
        fontSize: "1.75rem",
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: "Playfair Display, Georgia, serif",
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.35,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.65,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 20,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: "1px solid rgba(36, 31, 16, 0.12)",
            boxShadow: "none",
            transition: "transform .2s ease, box-shadow .2s ease",
          },
        },
      },
    },
  });