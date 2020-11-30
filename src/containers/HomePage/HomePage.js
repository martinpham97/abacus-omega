import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import CourseFormDialog from "containers/CourseFormDialog/CourseFormDialog";
import GradeCalculator from "containers/GradeCalculator/GradeCalculator";

import { addCourse } from "features/courses/coursesSlice";

import useStyles from "./styles";

export const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(["app", "pages"]);

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  let assessmentData = {};

  const handleSubmitCourse = ({ name }) => {
    dispatch(
      addCourse({
        name,
        ...assessmentData,
      }),
    );
    setIsCourseFormOpen(false);
    history.push("/courses");
  };

  const handleSave = (data) => {
    console.log(data);
    assessmentData = data;
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          title={t("app:grade_calculator.title", "Grade Calculator")}
          subheader={t("app:grade_calculator.description", {
            button: t("app:button.calculate", "Calculate"),
            defaultValue: "Add your course assessments to calculate",
          })}
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
        />
        <CardContent>
          <GradeCalculator handleSave={handleSave} />
        </CardContent>
      </Card>
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
