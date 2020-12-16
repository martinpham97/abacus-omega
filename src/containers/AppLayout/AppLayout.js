import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
// Prevent errors when using strict-mode.
// TODO: Use createMuiTheme as normal when this is fixed in material-ui v5
// https://stackoverflow.com/a/64135466https://stackoverflow.com/a/64135466
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { Container, Box, CssBaseline } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SnackbarProvider } from "notistack";

import theme from "config/theme";
import { useSmallScreen } from "hooks/useSmallScreen";
import { setThemeType } from "features/app/appSlice";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import useStyles from "./styles";

export const AppLayout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("app");

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

  const isSmallScreen = useSmallScreen();

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

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <SnackbarProvider maxSnack={3}>
        <div className={classes.root}>
          <CssBaseline />
          <Header
            title={t("title", "Abacus Omega")}
            isSidebarOpened={isSidebarOpened}
            handleToggleSidebar={handleToggleSidebar}
            handleToggleDarkMode={handleToggleDarkMode}
            handleChangeLanguage={handleChangeLanguage}
            themeType={themeType}
            language={i18n.language}
          />
          <Sidebar
            isSidebarOpened={isSidebarOpened}
            handleToggleSidebar={handleToggleSidebar}
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
      </SnackbarProvider>
    </ThemeProvider>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
