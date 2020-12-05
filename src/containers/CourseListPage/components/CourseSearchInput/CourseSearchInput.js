import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

export const CourseSearchInput = ({ handleTextChange }) => {
  const { t } = useTranslation("app");

  return (
    <TextField
      type="search"
      variant="outlined"
      placeholder={t(
        "filter.search_input.placeholder",
        "Search by course name",
      )}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      inputProps={{
        "aria-label": "search",
      }}
      onChange={(e) => handleTextChange(e.target.value)}
      fullWidth
    />
  );
};

CourseSearchInput.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
};

export default CourseSearchInput;
