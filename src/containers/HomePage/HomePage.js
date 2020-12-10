import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import CourseFormDialog from "containers/CourseFormDialog/CourseFormDialog";
import GradeCalculator from "containers/GradeCalculator/GradeCalculator";

import { addCourse } from "features/courses/coursesSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    setTimeout(() => history.push("/courses"), 100);
  };

  return (
    <>
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
    </>
  );
};

export default HomePage;
