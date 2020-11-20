import { Grid, CircularProgress } from "@material-ui/core";

export const Loading = () => (
  <Grid container direction="column" alignItems="center" justify="center">
    <Grid item xs={12}>
      <CircularProgress aria-label="loading" />
    </Grid>
  </Grid>
);

export default Loading;
