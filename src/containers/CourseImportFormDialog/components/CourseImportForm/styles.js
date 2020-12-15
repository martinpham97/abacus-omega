import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  courseMenu: {
    maxHeight: 430,
  },
  courseMenuItemText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
