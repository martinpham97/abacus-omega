import PropTypes from "prop-types";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const SelectAllCheckbox = ({
  selected = 0,
  total = 0,
  handleSelectAll,
}) => {
  const { t } = useTranslation("app");

  return (
    <FormControlLabel
      control={
        <Checkbox
          indeterminate={selected < total && selected > 0}
          checked={selected > 0}
          onChange={handleSelectAll}
          color="primary"
          name="select-all"
        />
      }
      label={
        selected === total
          ? t("select_mode.select_all_checkbox.label_none", "Deselect all")
          : t("select_mode.select_all_checkbox.label_all", "Select all")
      }
      style={{
        marginRight: 0,
      }}
    />
  );
};

SelectAllCheckbox.propTypes = {
  selected: PropTypes.number,
  total: PropTypes.number,
  handleSelectAll: PropTypes.func.isRequired,
};

export default SelectAllCheckbox;
