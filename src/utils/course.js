export const validateAssessmentGrades = (assessment) =>
  !!assessment.grade &&
  !!assessment.maxGrade &&
  assessment.weight <= 100 &&
  assessment.grade <= assessment.maxGrade;

export const calculateRecommendedGrade = (assessments, desiredGrade) => {
  // recommendedGrade = (desiredGrade - knownGrades) / remainingWeights
  let recommendedGrade = 0;
  let knownGrades = 0;
  let weights = 0;
  for (let i = 0; i < assessments.length; i += 1) {
    const currAssessment = assessments[i];
    if (validateAssessmentGrades(currAssessment)) {
      const currGrade = currAssessment.grade / currAssessment.maxGrade;
      const currGradeWeight = currGrade * currAssessment.weight;
      knownGrades += currGradeWeight;
      weights += currAssessment.weight;
    }
  }
  const remainingWeights = 100 - weights;
  recommendedGrade = ((desiredGrade - knownGrades) / remainingWeights) * 100;
  return Math.round(recommendedGrade);
};
