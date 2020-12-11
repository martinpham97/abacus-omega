import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

import { deleteButtonTheme } from "config/theme";
import { editCourse, deleteCourse } from "features/courses/coursesSlice";

import GradeCalculator from "containers/GradeCalculator/GradeCalculator";
import CourseFormDialog from "containers/CourseFormDialog/CourseFormDialog";
import NotFoundPage from "containers/NotFoundPage/NotFoundPage";

export const CourseDetailPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["app", "pages"]);

  const courses = useSelector((state) => state.courses);

  const course = courses.find((c) => c.id === courseId);

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseTemp, setCourseTemp] = useState(course);

  let autoSaveData = {};

  const handleEditCourseName = ({ name }) => {
    setCourseTemp((oldCourseTemp) => ({
      ...oldCourseTemp,
      name,
    }));
    setIsCourseFormOpen(false);
  };

  const handleAutoSave = (data) => {
    autoSaveData = { ...autoSaveData, ...data };
  };

  const handleSaveCourse = () => {
    dispatch(
      editCourse({
        id: course.id,
        ...courseTemp,
        ...autoSaveData,
      }),
    );
  };

  const handleDeleteCourse = () => {
    dispatch(deleteCourse({ id: course.id }));
    setIsDeleteDialogOpen(false);
    enqueueSnackbar(t("snackbar.course_deleted", "Course deleted"), {
      variant: "warning",
    });
    history.push("/courses");
  };

  return course ? (
    <>
      <GradeCalculator
        title={courseTemp.name}
        course={course}
        action={
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={4}>
              <Tooltip title={t("app:button.edit", "Edit")}>
                <IconButton
                  variant="contained"
                  color="inherit"
                  aria-label="edit-button"
                  onClick={() => setIsCourseFormOpen(true)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <ThemeProvider theme={createMuiTheme(deleteButtonTheme)}>
                <Tooltip title={t("app:button.delete", "Delete")}>
                  <IconButton
                    variant="contained"
                    color="primary"
                    aria-label="delete-button"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ThemeProvider>
            </Grid>
            <Grid item xs={4}>
              <Tooltip title={t("app:button.save", "Save")}>
                <span>
                  <IconButton
                    variant="contained"
                    color="primary"
                    aria-label="save-button"
                    onClick={handleSaveCourse}
                  >
                    <SaveIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        }
        handleSave={handleAutoSave}
      />
      <CourseFormDialog
        title={t(
          "pages:course_detail.course_form_dialog.title",
          "Edit course name",
        )}
        course={courseTemp}
        isOpen={isCourseFormOpen}
        handleClose={() => setIsCourseFormOpen(false)}
        handleSubmit={handleEditCourseName}
      />
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          {t("app:delete_confirm_dialog.title", "Delete this course?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("app:delete_confirm_dialog.content", {
              course: courseTemp.name,
              defaultValue: `Are you sure you want to delete ${courseTemp.name}?`,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteDialogOpen(false)}
            aria-label="no-delete"
          >
            {t("app:button.no", "No")}
          </Button>
          <Button
            onClick={handleDeleteCourse}
            color="primary"
            aria-label="yes-delete"
          >
            {t("app:button.yes", "Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <NotFoundPage />
  );
};

export default CourseDetailPage;
