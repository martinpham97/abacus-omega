import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Drawer, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  LibraryBooks as LibraryBooksIcon,
  Info as InfoIcon,
} from "@material-ui/icons";

import ToggleSidebarButton from "components/ToggleSidebarButton/ToggleSidebarButton";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import useStyles from "./styles";

const structure = [
  { id: 0, label: "Home", link: "/", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Courses",
    link: "/courses",
    icon: <LibraryBooksIcon />,
  },
  {
    id: 2,
    label: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
  { id: 3, type: "divider" },
  { id: 4, label: "About", link: "/about", icon: <InfoIcon /> },
];

export const Sidebar = ({
  isSidebarOpened,
  handleToggleSidebar,
  isSmallScreen,
}) => {
  const location = useLocation();
  const classes = useStyles();

  const isLinkSelected = (link) =>
    link &&
    (link === location.pathname ||
      (link !== "/" && location.pathname.indexOf(link) !== -1));

  return (
    <Drawer
      variant={!isSmallScreen ? "permanent" : "temporary"}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
      onClose={handleToggleSidebar}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <ToggleSidebarButton
          isSidebarOpened={isSidebarOpened}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
      <List data-testid="sidebar-list">
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            id={link.id}
            isSidebarOpened={isSidebarOpened}
            selected={isLinkSelected(link.link)}
            link={link.link}
            type={link.type}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  isSidebarOpened: PropTypes.bool.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};

export default Sidebar;
