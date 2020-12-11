import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

import { addCourse } from "features/courses/coursesSlice";

import CourseFormDialog from "containers/CourseFormDialog/CourseFormDialog";
import GradeCalculator from "containers/GradeCalculator/GradeCalculator";

export const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["app", "pages"]);

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  let autoSaveData = {};

  const handleAutoSave = (data) => {
    autoSaveData = { ...autoSaveData, ...data };
  };

  const handleSubmitCourse = ({ name }) => {
    dispatch(
      addCourse({
        name,
        ...autoSaveData,
      }),
    );
    setIsCourseFormOpen(false);
    enqueueSnackbar(t("app:snackbar.course_saved", "Course saved"), {
      variant: "success",
    });
    setTimeout(() => history.push("/courses"), 100);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Alert
          variant="filled"
          severity="info"
          data-testid="alert-new"
          action={
            <Button
              component={NavLink}
              to="/courses"
              color="inherit"
              size="small"
              aria-label="try-new-feature"
            >
              {t("pages:home.new_alert.action", "Try it now")}
            </Button>
          }
        >
          {t(
            "pages:home.new_alert.content",
            "You can now import courses from the official UNSW Handbook!",
          )}
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <GradeCalculator
          action={
            <Button
              variant="contained"
              color="primary"
              aria-label="save-button"
              startIcon={<SaveIcon />}
              onClick={() => setIsCourseFormOpen(true)}
            >
              {t("app:button.save", "Save")}
            </Button>
          }
          handleSave={handleAutoSave}
        />
        <CourseFormDialog
          title={t("pages:home.course_form_dialog.title", "Save course")}
          isOpen={isCourseFormOpen}
          handleClose={() => setIsCourseFormOpen(false)}
          handleSubmit={handleSubmitCourse}
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
