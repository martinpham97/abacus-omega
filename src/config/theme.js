import { red } from "@material-ui/core/colors";

export const theme = {
  palette: {
    primary: {
      light: "#ffff55",
      main: "#ffe600",
      dark: "#c7b400",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ff6434",
      main: "#dd2c00",
      dark: "#a30000",
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
