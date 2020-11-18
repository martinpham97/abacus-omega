import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    color: theme.palette.text.primary,
  },
  linkText: {
    padding: 0,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
