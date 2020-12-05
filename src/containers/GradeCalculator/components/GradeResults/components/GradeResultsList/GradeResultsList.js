import React from "react";
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { course as courseType } from "types";
import { getPercentage, getPercentageOf } from "utils/math";

export const GradeResultsList = ({ course }) => {
  const { t } = useTranslation("app");

  return (
    <List
      aria-labelledby="summary-list"
      subheader={
        <ListSubheader id="summary-list">
          {t("grade_results_list.list_header", "Details")}
        </ListSubheader>
      }
    >
      {course.assessments.map((assessment, index) => {
        const key = `${assessment.description || "assessment"}-${index}`;

        const assessmentDescription = `${
          assessment.description ||
          t("grade_results_list.assessment_placeholder", {
            num: index + 1,
            defaultValue: `Assessment #${index + 1}`,
          })
        } (${assessment.weight}%)`;

        let assessmentRecommendation;

        if (assessment.grade && assessment.maxGrade) {
          const resultsPercentage = getPercentage(
            assessment.grade,
            assessment.maxGrade,
          );

          assessmentRecommendation = t("grade_results_list.results", {
            grade: assessment.grade,
            maxGrade: assessment.maxGrade,
            resultsPercentage: resultsPercentage,
            defaultValue: `Results: ${assessment.grade}/${assessment.maxGrade} (${resultsPercentage}%)`,
          });
        } else if (assessment.maxGrade) {
          const recommended = getPercentageOf(
            course.recommendedGrade,
            assessment.maxGrade,
          );
          const recommendedPercentage = getPercentage(
            recommended,
            assessment.maxGrade,
          );

          assessmentRecommendation = t(
            "grade_results_list.recommended_with_max_grade",
            {
              recommended: recommended,
              maxGrade: assessment.maxGrade,
              recommendedPercentage: recommendedPercentage,
              defaultValue: `Recommended: ${recommended}/${assessment.maxGrade} (${recommendedPercentage}%)`,
            },
          );
        } else {
          assessmentRecommendation = t("grade_results_list.recommended", {
            recommended: course.recommendedGrade,
            defaultValue: `Recommended: ${course.recommendedGrade}%`,
          });
        }

        // Include future assessments if is last item in list
        if (index === course.assessments.length - 1) {
          const totalWeight = course.assessments.reduce(
            (acc, curr) => acc + curr.weight,
            0,
          );
          const remainingWeight = 100 - totalWeight;

          const futureDescription = `${t(
            "grade_results_list.future_assessments",
            "Remaining assessments",
          )} (${remainingWeight}%)`;
          const futureRecommendation = t(
            "grade_results_list.future_recommendation",
            {
              recommended: course.recommendedGrade,
              defaultValue: `Recommended: ${course.recommendedGrade}% for each remaining assessment`,
            },
          );

          if (remainingWeight) {
            return (
              <React.Fragment key={key}>
                <li>
                  <ListItem button>
                    <ListItemText
                      primary={assessmentDescription}
                      secondary={assessmentRecommendation}
                    />
                  </ListItem>
                </li>
                <li>
                  <ListItem button>
                    <ListItemText
                      primary={futureDescription}
                      secondary={futureRecommendation}
                    />
                  </ListItem>
                </li>
              </React.Fragment>
            );
          }
        }

        return (
          assessment.weight && (
            <li key={key}>
              <ListItem button>
                <ListItemText
                  primary={assessmentDescription}
                  secondary={assessmentRecommendation}
                />
              </ListItem>
            </li>
          )
        );
      })}
    </List>
  );
};

GradeResultsList.propTypes = {
  course: courseType.isRequired,
};

export default GradeResultsList;
