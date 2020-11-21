import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  NoSsr,
} from "@material-ui/core";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Translate as TranslateIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { LANGUAGES } from "config/constants";
import ToggleSidebarButton from "components/ToggleSidebarButton/ToggleSidebarButton";
import useStyles from "./styles";

export const Header = ({
  title,
  isSidebarOpened,
  handleToggleSidebar,
  handleToggleDarkMode,
  handleChangeLanguage,
  language,
  themeType,
}) => {
  const classes = useStyles();
  const { t } = useTranslation("app");

  const [languageMenu, setLanguageMenu] = useState(null);

  const handleLanguageButtonClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuItemClick = (event, lang) => {
    handleChangeLanguage(lang);
    handleLanguageMenuClose();
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <ToggleSidebarButton
          isSidebarOpened={isSidebarOpened}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Typography
          variant="h6"
          className={classes.logotype}
          color="inherit"
          component={NavLink}
          to="/"
        >
          {title}
        </Typography>
        <div className={classes.grow} />
        <Tooltip
          title={t("change_language", "Change Language")}
          enterDelay={300}
        >
          <Button
            aria-controls="lang-menu"
            aria-owns={languageMenu ? "lang-menu" : undefined}
            aria-haspopup="true"
            aria-label="change-language"
            color="inherit"
            onClick={handleLanguageButtonClick}
          >
            <TranslateIcon />
            <span className={classes.language}>{LANGUAGES[language]}</span>
            <ExpandMoreIcon fontSize="small" />
          </Button>
        </Tooltip>
        <NoSsr>
          <Menu
            id="lang-menu"
            anchorEl={languageMenu}
            keepMounted
            open={Boolean(languageMenu)}
            onClose={handleLanguageMenuClose}
          >
            {Object.keys(LANGUAGES).map((lang) => (
              <MenuItem
                key={lang}
                selected={lang === language}
                onClick={(event) => handleLanguageMenuItemClick(event, lang)}
              >
                {LANGUAGES[lang]}
              </MenuItem>
            ))}
          </Menu>
        </NoSsr>
        <Tooltip title={t("toggle_darkmode", "Toggle Dark Mode")}>
          <IconButton
            aria-label="toggle-dark"
            color="inherit"
            onClick={handleToggleDarkMode}
          >
            {themeType === "light" ? (
              <Brightness4Icon data-testid="moon-svg" />
            ) : (
              <Brightness7Icon data-testid="sun-svg" />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSidebarOpened: PropTypes.bool,
  handleToggleSidebar: PropTypes.func.isRequired,
  handleToggleDarkMode: PropTypes.func.isRequired,
  handleChangeLanguage: PropTypes.func.isRequired,
  themeType: PropTypes.oneOf(["light", "dark"]).isRequired,
  language: PropTypes.string.isRequired,
};

export default Header;
