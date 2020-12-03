import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import GradeForm from "components/GradeForm/GradeForm";
import GradeResults from "components/GradeResults/GradeResults";

import { calculateRecommendedGrade } from "utils/course";

import useStyles from "./styles";

export const GradeCalculator = ({ title, subheader, action, handleSave }) => {
  const classes = useStyles();
  const { t } = useTranslation(["app", "pages"]);

  const [course, setCourse] = useState({});

  const handleSubmitAssessments = ({ assessments, desiredGrade }) => {
    const recommendedGrade = calculateRecommendedGrade(
      assessments,
      desiredGrade,
    );

    setCourse({
      assessments,
      desiredGrade,
      recommendedGrade,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            title={title || t("app:grade_calculator.title", "Grade Calculator")}
            subheader={
              subheader ||
              t("app:grade_calculator.description", {
                button: t("app:button.calculate", "Calculate"),
                defaultValue: "Add your course assessments to calculate",
              })
            }
            action={action}
          />
          <CardContent>
            <GradeForm
              handleSubmit={handleSubmitAssessments}
              handleSave={handleSave}
            />
          </CardContent>
        </Card>
      </Grid>
      {course.recommendedGrade !== undefined && course.recommendedGrade > 0 && (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader
              title="Results"
              subheader={`In order to get ${
                course.desiredGrade
              }%, you will need at least a
              total of ${course.recommendedGrade.toFixed(
                2,
              )}% in all of your future
              assessments`}
            />
            <CardContent>
              <GradeResults course={course} />
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
};

export default GradeCalculator;
