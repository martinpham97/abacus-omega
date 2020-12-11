import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 0,
  },
  content: {
    overflow: "hidden",
  },
  cardHeaderTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    minHeight: 46,
  },
  cardSelectOverlay: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  hidden: {
    display: "none",
  },
  disableClick: {
    pointerEvents: "none",
  },
}));
