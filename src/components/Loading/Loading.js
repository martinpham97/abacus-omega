import { Backdrop, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

export const Loading = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress aria-label="loading" color="primary" />
    </Backdrop>
  );
};

export default Loading;
