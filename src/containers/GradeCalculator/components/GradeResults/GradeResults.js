/* eslint-disable prettier/prettier */
import { Grid, Box } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Trans, useTranslation } from "react-i18next";

import { course as courseType } from "types";

import GradeResultsList from "./components/GradeResultsList/GradeResultsList";

export const GradeResults = ({ course }) => {
  const { t } = useTranslation("app");

  const { desiredGrade, recommendedGrade } = course;

  if (recommendedGrade <= 0) {
    return (
      <Alert variant="filled" severity="success" data-testid="alert-success">
        <AlertTitle>{t("grade_results.title", "Outcome")}</AlertTitle>
        <Box fontSize={16} fontWeight={400}>
          {t("grade_results.results_success", {
            desiredGrade,
            defaultValue: `You are guaranteed to reach ${desiredGrade}% because the minimum grade for remaining assessments is less than 0%`,
          })}
        </Box>
      </Alert>
    );
  }

  const results = (
    <Trans
      i18nKey="app:grade_results.results"
      desiredGrade={desiredGrade}
      recommendedGrade={recommendedGrade}
    >
      In order to reach your goal of {{ desiredGrade }}%, you will need to
      achieve at least <strong>{{ recommendedGrade }}%</strong> for each of your
      remaining assessments
    </Trans>
  );

  if (recommendedGrade > 100) {
    return (
      <Alert variant="filled" severity="warning" data-testid="alert-warning">
        <AlertTitle>{t("grade_results.title", "Outcome")}</AlertTitle>
        <Box fontSize={16} fontWeight={400}>
          {results}
        </Box>
      </Alert>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Alert variant="filled" severity="info" data-testid="alert-info">
          <AlertTitle>{t("grade_results.title", "Outcome")}</AlertTitle>
          <Box fontSize={16} fontWeight={400}>
            {results}
          </Box>
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <GradeResultsList course={course} />
      </Grid>
    </Grid>
  );
};

GradeResults.propTypes = {
  course: courseType,
};

export default GradeResults;
