import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { deleteMultipleCourses } from "features/courses/coursesSlice";

import CourseSearchInput from "./components/CourseSearchInput/CourseSearchInput";
import SelectModeSwitch from "./components/SelectModeSwitch/SelectModeSwitch";
import SelectAllCheckbox from "./components/SelectAllCheckbox/SelectAllCheckbox";
import SortMenu from "./components/SortMenu/SortMenu";
import SelectModeSnackbar from "./components/SelectModeSnackbar/SelectModeSnackbar";
import CourseCard from "./components/CourseCard/CourseCard";

export const CourseListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation("app");

  const courses = useSelector((state) => state.courses);

  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    items: [],
  });
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({
    text: "",
    type: "name",
    direction: "asc",
  });
  const [filterMenu, setFilterMenu] = useState(null);

  const filteredCourses = courses
    .filter((course) =>
      course.name.toLowerCase().includes(filters.text.toLowerCase()),
    )
    .sort((a, b) => {
      const { direction, type } = filters;
      return direction === "asc"
        ? (a[type] || "").localeCompare(b[type] || "")
        : (b[type] || "").localeCompare(a[type] || "");
    });

  const handleCloseDeleteConfirm = () => {
    // Prevent text flashing
    setDeleteConfirm((oldConfirm) => ({
      ...oldConfirm,
      isOpen: false,
    }));
  };

  const handleDeleteConfirm = (items) => {
    setDeleteConfirm({
      isOpen: true,
      items,
    });
  };

  const handleDeleteCourse = () => {
    dispatch(deleteMultipleCourses({ ids: deleteConfirm.items }));
    setSelectMode(false);
    setSelected([]);
  };

  const handleEditCourse = (id) => {
    history.push(`/courses/${id}`);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenu(event.currentTarget);
  };

  const handleFilterMenuItemClick = ({ direction, type }) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      direction,
      type,
    }));
    setFilterMenu(null);
  };

  const handleFilterTextChange = (text) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      text,
    }));
  };

  const handleFilterMenuClose = () => {
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
        <CourseSearchInput handleTextChange={handleFilterTextChange} />
      </Grid>
      <Grid item container xs={12} justify="space-between" alignItems="center">
        <Grid item container xs={6} justify="flex-start">
          <SelectModeSwitch
            selectMode={selectMode}
            handleToggleSelectMode={handleToggleSelectMode}
          />
        </Grid>
        <Grid item container xs={6} justify="flex-end">
          {selectMode && (
            <SelectAllCheckbox
              selected={selected.length}
              total={courses.length}
              handleSelectAll={handleSelectAll}
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
          <SortMenu
            anchorEl={filterMenu}
            sortDirection={filters.direction}
            sortType={filters.type}
            handleMenuClose={handleFilterMenuClose}
            handleMenuOpen={handleFilterMenuOpen}
            handleMenuItemClick={handleFilterMenuItemClick}
          />
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
      <SelectModeSnackbar
        open={selectMode}
        selected={selected.length}
        handleDeleteClick={() => handleDeleteConfirm(selected)}
      />
      <Dialog
        open={deleteConfirm.isOpen}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          {selectMode
            ? t(
                "delete_confirm_dialog.title_multiple",
                "Delete selected courses?",
              )
            : t("delete_confirm_dialog.title", "Delete this course?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(() => {
              if (selectMode) {
                return t("delete_confirm_dialog.content_multiple", {
                  count: selected.length,
                  defaultValue: `Are you sure you want to delete ${selected.length} courses?`,
                });
              }

              const courseToBeDeleted = courses.find(
                (course) => course.id === deleteConfirm.items?.[0],
              );

              if (courseToBeDeleted && courseToBeDeleted.name) {
                return t("delete_confirm_dialog.content", {
                  course: courseToBeDeleted.name,
                  defaultValue: `Are you sure you want to delete ${courseToBeDeleted.name}?`,
                });
              }

              return t(
                "delete_confirm_dialog.content_default",
                "Are you sure you want to delete this course?",
              );
            })()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} aria-label="no-delete">
            {t("button.no", "No")}
          </Button>
          <Button
            onClick={() => {
              handleDeleteCourse();
              handleCloseDeleteConfirm();
            }}
            color="primary"
            aria-label="yes-delete"
          >
            {t("button.yes", "Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CourseListPage;
