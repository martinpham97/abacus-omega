import { shape, number, string, oneOfType, arrayOf } from "prop-types";

export const assessment = shape({
  description: oneOfType([number, string]),
  grade: oneOfType([number, string]),
  maxGrade: oneOfType([number, string]),
  weight: oneOfType([number, string]),
});

export const course = shape({
  id: oneOfType([number, string]),
  name: oneOfType([number, string]),
  assessments: arrayOf(assessment),
  desiredGrade: oneOfType([number, string]),
  recommendedGrade: oneOfType([number, string]),
});
