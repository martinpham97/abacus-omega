import PropTypes from "prop-types";
import { Button, Snackbar } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import { deleteButtonTheme } from "config/theme";

export const SelectModeSnackbar = ({
  open = false,
  selected = 0,
  handleDeleteClick,
}) => {
  const { t } = useTranslation("app");

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      message={t("select_mode.snack_bar.message", {
        count: selected,
        defaultValue: `${selected} courses selected`,
      })}
      action={
        <ThemeProvider theme={createMuiTheme(deleteButtonTheme)}>
          <Button
            color="primary"
            type="primary"
            variant="contained"
            aria-label="delete-multiple"
            disabled={selected === 0}
            onClick={handleDeleteClick}
            size="small"
          >
            {t("button.delete", "Delete")}
          </Button>
        </ThemeProvider>
      }
    />
  );
};

SelectModeSnackbar.propTypes = {
  open: PropTypes.bool,
  selected: PropTypes.number,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default SelectModeSnackbar;
