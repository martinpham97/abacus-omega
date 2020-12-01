import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  logotype: {
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    textDecoration: "none",
    whiteSpace: "nowrap",
    userSelect: "none",
    msUserSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  grow: {
    flexGrow: 1,
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));
