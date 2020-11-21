import { Grid, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useStyles from "./styles";

export const NotFoundPage = () => {
  const classes = useStyles();
  const { t } = useTranslation("pages");

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            {t("not_found.title", "404 - NOT FOUND")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            {t(
              "not_found.description",
              "The content you're looking for could not be found on this page",
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            aria-label="back-home-button"
            variant="contained"
            color="primary"
            component={NavLink}
            to="/"
          >
            {t("not_found.home_button", "Back to home")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFoundPage;
