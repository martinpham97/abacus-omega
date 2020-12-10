import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { calculateRecommendedGrade } from "utils/course";
import { course as courseType } from "types";

import GradeForm from "./components/GradeForm/GradeForm";
import GradeResults from "./components/GradeResults/GradeResults";

import useStyles from "./styles";

export const GradeCalculator = ({
  title,
  subheader,
  action,
  course,
  handleSave,
}) => {
  const classes = useStyles();
  const { t } = useTranslation("app");

  const [courseTemp, setCourseTemp] = useState(course || {});

  const handleSubmitAssessments = ({ assessments, desiredGrade }) => {
    const recommendedGrade = calculateRecommendedGrade(
      assessments,
      desiredGrade,
    );

    const courseWithRecommended = {
      assessments,
      desiredGrade,
      recommendedGrade,
    };

    setCourseTemp({ ...courseWithRecommended });

    if (handleSave) {
      handleSave({ ...courseWithRecommended });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            title={title || t("grade_calculator.title", "Grade Calculator")}
            subheader={
              subheader ||
              t("grade_calculator.description", {
                button: t("button.calculate", "Calculate"),
                defaultValue: "Add your course assessments to calculate",
              })
            }
            action={action}
          />
          <CardContent>
            <GradeForm
              course={courseTemp}
              handleSubmit={handleSubmitAssessments}
              handleSave={handleSave}
            />
          </CardContent>
        </Card>
      </Grid>
      {courseTemp.recommendedGrade && (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader title={t("grade_calculator.results", "Results")} />
            <CardContent>
              <GradeResults course={courseTemp} />
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

GradeCalculator.propTypes = {
  handleSave: PropTypes.func,
  title: PropTypes.node,
  subheader: PropTypes.node,
  action: PropTypes.node,
  course: courseType,
};

export default GradeCalculator;
