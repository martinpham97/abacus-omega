import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
// Prevent errors when using strict-mode.
// TODO: Use createMuiTheme as normal when this is fixed in material-ui v5
// https://stackoverflow.com/a/64135466https://stackoverflow.com/a/64135466
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { Container, Box, useMediaQuery } from "@material-ui/core";

import theme from "config/theme";
import { setThemeType } from "features/app/appSlice";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import useStyles from "./styles";

export const AppLayout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { themeType } = useSelector((state) => state.app);

  const muiTheme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          ...theme,
          palette: {
            ...theme.palette,
            type: themeType,
          },
        }),
      ),
    [themeType],
  );

  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  const handleToggleDarkMode = () => {
    if (themeType === "light") {
      dispatch(setThemeType({ type: "dark" }));
    } else {
      dispatch(setThemeType({ type: "light" }));
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header
          title="Pass or Fail"
          isSidebarOpened={isSidebarOpened}
          handleToggleSidebar={handleToggleSidebar}
          handleToggleDarkMode={handleToggleDarkMode}
          theme={themeType}
        />
        <Sidebar
          isSidebarOpened={isSidebarOpened}
          handleToggleSidebar={handleToggleSidebar}
          isSmallScreen={isSmallScreen}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: !isSmallScreen && isSidebarOpened,
          })}
        >
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Box>{children}</Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
