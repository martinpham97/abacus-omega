import { useState } from "react";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import CourseFormDialog from "components/CourseFormDialog/CourseFormDialog";
import GradeForm from "components/GradeForm/GradeForm";

import useStyles from "./styles";

export const HomePage = () => {
  const classes = useStyles();
  const { t } = useTranslation(["app", "pages"]);

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  let assessmentData = {};

  const handleSubmitCourse = ({ name }) => {
    console.log({
      name,
      ...assessmentData,
    });
    setIsCourseFormOpen(false);
  };

  const handleSubmitAssessments = ({ assessments, desiredGrade }) =>
    console.log(assessments, desiredGrade);

  const handleSave = (data) => {
    console.log(data);
    assessmentData = data;
  };

  return (
    <>
      <Card className={classes.paper}>
        <CardHeader
          title={t("pages:home.grade_calculator.title", "Grade Calculator")}
          subheader={t("pages:home.grade_calculator.description", {
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
          <GradeForm
            handleSubmit={handleSubmitAssessments}
            handleSave={handleSave}
          />
        </CardContent>
      </Card>
      <CourseFormDialog
        isOpen={isCourseFormOpen}
        handleClose={() => setIsCourseFormOpen(false)}
        handleSubmit={handleSubmitCourse}
      />
    </>
  );
};

export default HomePage;
