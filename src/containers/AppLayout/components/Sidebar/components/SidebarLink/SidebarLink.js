import PropTypes from "prop-types";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip,
} from "@material-ui/core";

import useStyles from "./styles";

export const SidebarLink = ({
  isSidebarOpened,
  id,
  link,
  type,
  label,
  icon,
  selected,
}) => {
  const classes = useStyles();

  if (type === "title") {
    return (
      <Typography
        className={clsx(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );
  }

  if (type === "divider") {
    return <Divider className={classes.divider} data-testid="divider" />;
  }

  const linkIcon = (
    <ListItemIcon
      className={clsx(classes.linkIcon, {
        [classes.linkIconActive]: selected,
      })}
    >
      {icon}
    </ListItemIcon>
  );

  return (
    <ListItem
      key={id}
      button
      component={link && NavLink}
      className={classes.link}
      to={link}
      disableRipple
      selected={selected}
    >
      {isSidebarOpened ? linkIcon : <Tooltip title={label}>{linkIcon}</Tooltip>}
      <ListItemText
        classes={{
          primary: clsx(classes.linkText, {
            [classes.linkTextActive]: selected,
            [classes.linkTextHidden]: !isSidebarOpened,
          }),
        }}
        primary={label}
      />
    </ListItem>
  );
};

SidebarLink.propTypes = {
  isSidebarOpened: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  link: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  selected: PropTypes.bool,
};

export default SidebarLink;
