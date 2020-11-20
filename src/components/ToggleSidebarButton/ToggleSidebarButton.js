import PropTypes from "prop-types";
import clsx from "clsx";
import { Tooltip, IconButton } from "@material-ui/core";
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import useStyles from "./styles";

export const ToggleSidebarButton = ({
  handleToggleSidebar,
  isSidebarOpened,
}) => {
  const classes = useStyles();
  const { t } = useTranslation("app");

  return (
    <Tooltip title={t("toggle_sidebar", "Toggle Sidebar")}>
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
