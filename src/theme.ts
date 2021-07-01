import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { PaletteType } from '@material-ui/core';

export const getTheme = (type: PaletteType): Theme => {
  return createMuiTheme({
    palette: {
      type,
      primary: {
        main: green[500],
      },
    }
  });
}

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: green[500],
    },
  }
});

export default theme;