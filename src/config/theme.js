import { red } from "@material-ui/core/colors";

export const theme = {
  palette: {
    primary: {
      light: "#ffff72",
      main: "#ffeb3b",
      dark: "#c8b900",
      contrastText: "#000000",
    },
    secondary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#ffffff",
    },
  },
};

export const deleteButtonTheme = {
  palette: {
    primary: red,
  },
};

export default theme;
