import { createTheme } from "@mui/material/styles";

export type ModeTypes = "dark" | "light";
export const getTheme = (mode: ModeTypes = "light") => {
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#ab003c",
      },
    },
  });

  theme.spacing(2); // `${8 * 2}px` = '16px'

  return theme;
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
  },
});
