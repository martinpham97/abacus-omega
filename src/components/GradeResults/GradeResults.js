import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

import { course as courseType } from "types";
import { getPercentage, getPercentageOf } from "utils/math";

export const GradeResults = ({ course }) => {
  console.log(course);
  return (
    <List aria-labelledby="summary-list">
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      {course.assessments.map((assessment, index) => {
        const assessmentDescription = `${
          assessment.description || `Assessment #${index + 1}`
        } (${assessment.weight}%)`;
        let assessmentRecommendation;
        if (assessment.grade && assessment.maxGrade) {
          assessmentRecommendation = `Results: ${assessment.grade}/${
            assessment.maxGrade
          } (${getPercentageOf(
            getPercentage(assessment.grade, assessment.maxGrade),
            assessment.weight,
          ).toFixed(2)}%)`;
        } else if (assessment.maxGrade) {
          assessmentRecommendation = `Recommended: ${getPercentageOf(
            course.recommendedGrade,
            assessment.maxGrade,
          ).toFixed(2)}/${assessment.maxGrade}`;
        } else {
          assessmentRecommendation = `Recommended: ${getPercentageOf(
            assessment.weight,
            course.recommendedGrade,
          ).toFixed(2)}%`;
        }

        // Include future assessments if is last item in list
        if (index === course.assessments.length - 1) {
          const totalWeight = course.assessments.reduce(
            (acc, curr) => acc + curr.weight,
            0,
          );
          const remainingWeight = 100 - totalWeight;

          const futureDescription = `Future Assessments (${remainingWeight}%)`;
          const futureRecommendation = `Recommended: ${course.recommendedGrade.toFixed(
            2,
          )}% for each future assessment`;

          if (remainingWeight) {
            return (
              <React.Fragment key={`${assessment.description}-${index}`}>
                <ListItem button>
                  <ListItemText
                    primary={assessmentDescription}
                    secondary={assessmentRecommendation}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={futureDescription}
                    secondary={futureRecommendation}
                  />
                </ListItem>
              </React.Fragment>
            );
          }
        }

        return (
          assessment.weight && (
            <ListItem button>
              <ListItemText
                key={`${assessment.description}-${index}`}
                primary={assessmentDescription}
                secondary={assessmentRecommendation}
              />
            </ListItem>
          )
        );
      })}
    </List>
  );
};

GradeResults.propTypes = {
  course: courseType.isRequired,
};

export default GradeResults;
