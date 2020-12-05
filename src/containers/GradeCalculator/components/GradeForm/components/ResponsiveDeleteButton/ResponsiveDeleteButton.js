import PropTypes from "prop-types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Tooltip, Button, IconButton } from "@material-ui/core";
import { Remove as RemoveIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { useSmallScreen } from "hooks/useSmallScreen";
import { deleteButtonTheme } from "config/theme";

export const ResponsiveAddButton = ({ disabled, handleClick }) => {
  const isSmallScreen = useSmallScreen();
  const { t } = useTranslation("app");

  return (
    <ThemeProvider theme={createMuiTheme(deleteButtonTheme)}>
      {isSmallScreen ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={disabled}
          startIcon={<RemoveIcon />}
          aria-label="delete-button"
        >
          {t("button.delete", "Delete")}
        </Button>
      ) : (
        <Tooltip
          title={t("grade_form.delete_assessment", "Delete this assessment")}
        >
          <span>
            <IconButton
              color="primary"
              onClick={handleClick}
              disabled={disabled}
              aria-label="delete-icon"
            >
              <RemoveIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </ThemeProvider>
  );
};

ResponsiveAddButton.propTypes = {
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default ResponsiveAddButton;
