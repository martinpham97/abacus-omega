import PropTypes from "prop-types";
import clsx from "clsx";
import { Tooltip, IconButton } from "@material-ui/core";
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from "@material-ui/icons";

import useStyles from "./styles";

export const ToggleSidebarButton = ({
  handleToggleSidebar,
  isSidebarOpened,
}) => {
  const classes = useStyles();
  return (
    <Tooltip title="Toggle Sidebar">
      <IconButton
        aria-label="toggle-sidebar"
        color="inherit"
        onClick={handleToggleSidebar}
        className={clsx(
          classes.headerMenuButton,
          classes.headerMenuButtonCollapse,
        )}
      >
        {isSidebarOpened ? (
          <MenuOpenIcon
            data-testid="sidebar-close-svg"
            classes={{
              root: classes.buttonIcon,
            }}
          />
        ) : (
          <MenuIcon
            data-testid="sidebar-open-svg"
            classes={{
              root: classes.buttonIcon,
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};
ToggleSidebarButton.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
  isSidebarOpened: PropTypes.bool.isRequired,
};

export default ToggleSidebarButton;
