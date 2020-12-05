import PropTypes from "prop-types";
import { Tooltip, Button, IconButton } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { useSmallScreen } from "hooks/useSmallScreen";

export const ResponsiveAddButton = ({ disabled, handleClick }) => {
  const isSmallScreen = useSmallScreen();
  const { t } = useTranslation("app");

  return isSmallScreen ? (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={handleClick}
      startIcon={<AddIcon />}
      aria-label="add-button"
    >
      {t("button.add", "Add")}
    </Button>
  ) : (
    <Tooltip title={t("grade_form.add_assessment", "Add an assessment")}>
      <span>
        <IconButton
          color="primary"
          disabled={disabled}
          onClick={handleClick}
          aria-label="add-icon"
        >
          <AddIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

ResponsiveAddButton.propTypes = {
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default ResponsiveAddButton;
