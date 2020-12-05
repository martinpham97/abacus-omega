import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@material-ui/core";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";

export const SortMenu = ({
  anchorEl,
  sortDirection = "asc",
  sortType = "name",
  handleMenuClose,
  handleMenuOpen,
  handleMenuItemClick,
}) => {
  const { t } = useTranslation("app");

  const sortOptions = [
    {
      label: t("sort.sort_name_asc", "Sort by name ascending"),
      typeLabel: t("sort.sort_name", "Name"),
      type: "name",
      direction: "asc",
    },
    {
      label: t("sort.sort_name_desc", "Sort by name descending"),
      typeLabel: t("sort.sort_name", "Name"),
      type: "name",
      direction: "desc",
    },
    {
      label: t("sort.sort_date_asc", "Sort by date ascending"),
      typeLabel: t("sort.sort_date", "Date"),
      type: "createdAt",
      direction: "asc",
    },
    {
      label: t("sort.sort_date_desc", "Sort by date descending"),
      typeLabel: t("sort.sort_date", "Date"),
      type: "createdAt",
      direction: "desc",
    },
  ];

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-controls="sort-menu"
        aria-label="sort-by"
        size="small"
        onClick={handleMenuOpen}
        startIcon={
          sortDirection === "asc" ? (
            <ArrowUpwardIcon data-testid="arrow-up-svg" />
          ) : (
            <ArrowDownwardIcon data-testid="arrow-down-svg" />
          )
        }
      >
        {
          sortOptions.find(
            (option) =>
              option.type === sortType && option.direction === sortDirection,
          )?.typeLabel
        }
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.label}
            selected={
              option.type === sortType && option.direction === sortDirection
            }
            onClick={() =>
              handleMenuItemClick({
                type: option.type,
                direction: option.direction,
              })
            }
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

SortMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
  sortType: PropTypes.oneOf(["name", "createdAt"]),
  handleMenuClose: PropTypes.func.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
};

export default SortMenu;
