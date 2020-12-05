import { Grid, Box } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { course as courseType } from "types";

import GradeResultsList from "./components/GradeResultsList/GradeResultsList";

export const GradeResults = ({ course }) => {
  if (course.recommendedGrade <= 0) {
    return (
      <Alert variant="filled" severity="success">
        <AlertTitle>You are highly likely to reach your goal</AlertTitle>
        <Box fontSize={16} fontWeight={400}>
          {`You are all set to reach ${course.desiredGrade}%, as the minimum grade for future assessments is less than or equal to 0%`}
        </Box>
      </Alert>
    );
  }

  if (course.recommendedGrade > 100) {
    return (
      <Alert variant="filled" severity="warning">
        <AlertTitle>You are unlikely to reach your goal</AlertTitle>
        <Box fontSize={16} fontWeight={400}>
          {`In order to reach your goal of ${course.desiredGrade}%, you will need to achieve at least `}
          <strong>{course.recommendedGrade}</strong>
          {`% for each of your future assessments`}
        </Box>
      </Alert>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Alert variant="filled" severity="info">
          <AlertTitle>You are likely to reach your goal</AlertTitle>
          <Box fontSize={16} fontWeight={400}>
            {`In order to reach your goal of ${course.desiredGrade}%, you will need to a achieve at least `}
            <strong>{course.recommendedGrade}</strong>
            {"% for each of your future assessments"}
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
