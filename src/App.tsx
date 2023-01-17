import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import Navbar from "./components/Navbar";
import { useColorMode } from "./hooks/useColorMode";
import { Routes } from "./routes";
import { getTheme } from "./theme";

export function App() {
  const { mode } = useColorMode();

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
