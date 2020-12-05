import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const SelectModeSwitch = ({ selectMode, handleToggleSelectMode }) => {
  const { t } = useTranslation("app");

  return (
    <FormControlLabel
      control={
        <Switch
          checked={selectMode}
          onChange={handleToggleSelectMode}
          name="select-mode"
          color="primary"
        />
      }
      label={t("select_mode.select_switch.label", "Select mode")}
    />
  );
};

SelectModeSwitch.propTypes = {
  selectMode: PropTypes.bool,
  handleToggleSelectMode: PropTypes.func.isRequired,
};

export default SelectModeSwitch;
