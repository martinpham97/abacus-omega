import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { RotateLeft as RotateLeftIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";

import useStyles from "./styles";

export const SettingsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["app", "pages"]);

  const [resetConfirm, setResetConfirm] = useState(false);

  const handleCloseResetConfirm = () => {
    setResetConfirm(false);
  };

  const handleOpenResetConfirm = () => {
    setResetConfirm(true);
  };

  const handleResetApplicationData = () => {
    localStorage.clear();
    enqueueSnackbar(
      t("snackbar.application_reset", "Application data has been reset"),
      {
        variant: "success",
      },
    );
    history.go(0);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader title={t("pages:settings.title", "Settings")} />
        <CardContent>
          <List
            aria-labelledby="application-subheader"
            subheader={
              <ListSubheader component="li" id="application-subheader">
                {t("pages:settings.application.title", "Application")}
              </ListSubheader>
            }
          >
            <li>
              <ListItem button onClick={handleOpenResetConfirm}>
                <ListItemIcon>
                  <RotateLeftIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t(
                    "pages:settings.application.reset_data",
                    "Reset application data",
                  )}
                />
              </ListItem>
            </li>
          </List>
        </CardContent>
      </Card>
      <Dialog
        open={resetConfirm}
        onClose={handleCloseResetConfirm}
        aria-labelledby="reset-dialog-title"
      >
        <DialogTitle id="reset-dialog-title">
          {t("app:reset_confirm_dialog.title", "Reset application data?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              "app:reset_confirm_dialog.content",
              "Resetting the application data will clear out all settings including all saved course data. Are you sure you want to continue?",
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetConfirm} aria-label="no-reset">
            {t("app:button.no", "No")}
          </Button>
          <Button
            onClick={() => {
              handleResetApplicationData();
              handleCloseResetConfirm();
            }}
            color="primary"
            aria-label="yes-reset"
          >
            {t("app:button.yes", "Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingsPage;
