import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@material-ui/icons";

import ToggleSidebarButton from "components/ToggleSidebarButton/ToggleSidebarButton";
import useStyles from "./styles";

export const Header = ({
  title,
  isSidebarOpened,
  handleToggleSidebar,
  handleToggleDarkMode,
  theme,
}) => {
  const classes = useStyles();

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
        <Tooltip title="Toggle Dark Mode">
          <IconButton
            aria-label="toggle-dark"
            color="inherit"
            onClick={handleToggleDarkMode}
          >
            {theme === "light" ? (
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
  isSidebarOpened: PropTypes.bool.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
  handleToggleDarkMode: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};

export default Header;
