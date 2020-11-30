// import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Snackbar,
  FormControlLabel,
  Switch,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from "@material-ui/core";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import CourseCard from "./components/CourseCard/CourseCard";

const courses = [
  {
    id: 0,
    name: "COMP1511",
    assessments: [
      {
        description: "Assignment 1",
        weight: 20,
        maxGrade: 50,
        grade: 41,
      },
      {
        description: "Assignment 2",
        weight: 10,
        maxGrade: 25,
        grade: 15,
      },
      {
        description: "Mid-term Exam",
        weight: 30,
        maxGrade: 80,
        grade: 56,
      },
    ],
    desiredGrade: 55,
  },
  {
    id: 1,
    name: "COMP2511",
    assessments: [
      {
        description: "Assignment 1",
        weight: 20,
        maxGrade: 50,
        grade: 41,
      },
      {
        description: "Assignment 2",
        weight: 10,
        maxGrade: 25,
        grade: 15,
      },
    ],
    desiredGrade: 35,
  },
  {
    id: 2,
    name: "COMP3900",
    assessments: [
      {
        description: "Assignment 1",
        weight: 20,
        maxGrade: 50,
        grade: 41,
      },
    ],
    desiredGrade: 75,
  },
  {
    id: 3,
    name: "COMP4920",
    desiredGrade: 95,
  },
  {
    id: 4,
    name: "COMP1511",
    assessments: [],
    desiredGrade: null,
  },
];

export const CourseListPage = () => {
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

  // const courses = useSelector((state) => state.courses);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    items: [],
  });
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({
    text: "",
    sortIndex: 0,
  });
  const [filterMenu, setFilterMenu] = useState(null);

  const filteredCourses = courses
    .filter((course) =>
      course.name.toLowerCase().includes(filters.text.toLowerCase()),
    )
    .sort((a, b) => {
      const { direction, type } = sortOptions[filters.sortIndex];
      return direction === "asc"
        ? (a[type] || "").localeCompare(b[type] || "")
        : (b[type] || "").localeCompare(a[type] || "");
    });

  const handleCloseDeleteConfirm = () => {
    // Prevent flashes of text if items array is cleared out
    setDeleteConfirm((oldConfirm) => ({
      ...oldConfirm,
      isOpen: false,
    }));
  };

  const handleEditCourse = (id) => console.log(id);
  const handleDeleteConfirm = (items) => {
    setDeleteConfirm({
      isOpen: true,
      items,
    });
  };

  const handleDeleteCourse = () => {
    console.log(deleteConfirm.items);
  };

  const handleFilterButtonClick = (event) => {
    setFilterMenu(event.currentTarget);
  };

  const handleFilterMenuClick = (index) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      sortIndex: index,
    }));
    setFilterMenu(null);
  };

  const handleFilterTextChange = (text) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      text,
    }));
  };

  const handleCloseFilterMenu = () => {
    setFilterMenu(null);
  };

  const handleSelectCourse = (id, checked) => {
    if (!checked) {
      return setSelected((oldSelected) =>
        oldSelected.filter((courseId) => courseId !== id),
      );
    }
    return setSelected((oldSelected) => [...oldSelected, id]);
  };

  const handleToggleSelectMode = () => {
    setSelectMode((oldMode) => !oldMode);
    setSelected([]);
  };

  const handleSelectAll = () => {
    if (selected.length === courses.length) {
      return setSelected([]);
    }
    return setSelected(courses.map((course) => course.id));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
          onChange={(e) => handleFilterTextChange(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item container xs={12} justify="space-between" alignItems="center">
        <Grid item container xs={6} justify="flex-start">
          <FormControlLabel
            control={
              <Switch
                checked={selectMode}
                onChange={handleToggleSelectMode}
                name="select-mode"
                color="primary"
              />
            }
            label={t("select_mode.select_switch.label", "Select multiple")}
          />
        </Grid>
        <Grid item container xs={6} justify="flex-end">
          {selectMode && (
            <FormControlLabel
              control={
                <Checkbox
                  indeterminate={
                    selected.length < courses.length && selected.length > 0
                  }
                  checked={selected.length > 0}
                  onChange={handleSelectAll}
                  color="primary"
                  name="select-all"
                />
              }
              label={
                selected.length === courses.length
                  ? t(
                      "select_mode.select_all_checkbox.label_none",
                      "Deselect all",
                    )
                  : t("select_mode.select_all_checkbox.label_all", "Select all")
              }
              style={{
                marginRight: 0,
              }}
            />
          )}
        </Grid>
      </Grid>
      <Grid container item xs={12} justify="space-between" alignItems="center">
        <Grid item container xs={6} justify="flex-start">
          <Box fontStyle="italic">
            <Typography variant="body2" color="textSecondary">
              {t("filter.showing_count", {
                num: filteredCourses.length,
                count: courses.length,
                defaultValue: `Showing ${filteredCourses.length} of ${courses.length} courses`,
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item container xs={6} justify="flex-end">
          <Button
            aria-haspopup="true"
            aria-controls="sort-menu"
            aria-label="sort-by"
            size="small"
            onClick={handleFilterButtonClick}
            startIcon={
              sortOptions[filters.sortIndex].direction === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )
            }
          >
            {sortOptions[filters.sortIndex].typeLabel}
          </Button>
          <Menu
            id="sort-menu"
            anchorEl={filterMenu}
            keepMounted
            open={Boolean(filterMenu)}
            onClose={handleCloseFilterMenu}
          >
            {sortOptions.map((option, index) => (
              <MenuItem
                key={option.label}
                selected={index === filters.sortIndex}
                onClick={() => handleFilterMenuClick(index)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {filteredCourses.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            <CourseCard
              course={course}
              handleEdit={handleEditCourse}
              handleDelete={() => handleDeleteConfirm([course.id])}
              handleSelect={handleSelectCourse}
              selectMode={selectMode}
              selected={selected.includes(course.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={selectMode}
        message={t("select_mode.snack_bar.message", {
          count: selected.length,
          defaultValue: `${selected.length} courses selected`,
        })}
        action={
          <Button
            color="primary"
            type="primary"
            variant="contained"
            aria-label="delete-multiple"
            disabled={selected.length === 0}
            onClick={() => handleDeleteConfirm(selected)}
            size="small"
          >
            {t("button.delete", "Delete")}
          </Button>
        }
      />
      <Dialog
        open={deleteConfirm.isOpen}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {selectMode ? `Delete selected courses?` : `Delete this course?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectMode
              ? `Are you sure you want to delete ${selected.length} courses?`
              : `Are you sure you want to delete ${
                  courses.find(
                    (course) => course.id === deleteConfirm.items?.[0],
                  )?.name || "this course"
                }?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} aria-label="no-delete">
            No
          </Button>
          <Button
            onClick={() => {
              handleDeleteCourse();
              handleCloseDeleteConfirm();
            }}
            color="primary"
            aria-label="yes-delete"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CourseListPage;
