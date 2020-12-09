import { courseWithRecommended } from "__fixtures__/courses";

import { validateAssessmentGrades, calculateRecommendedGrade } from "./course";

describe("validateAssessmentGrades", () => {
  it("should return true for valid assessment objects", () => {
    expect(
      validateAssessmentGrades({
        grade: 10,
        maxGrade: 20,
        weight: 30,
      }),
    ).toBeTruthy();

    expect(
      validateAssessmentGrades({
        grade: 20,
        maxGrade: 20,
        weight: 30,
      }),
    ).toBeTruthy();

    expect(
      validateAssessmentGrades({
        grade: 0,
        maxGrade: 20,
        weight: 0,
      }),
    ).toBeTruthy();
  });

  it("should return false for invalid assessment objects", () => {
    expect(validateAssessmentGrades({})).toBeFalsy();

    expect(
      validateAssessmentGrades({
        grade: 100,
        maxGrade: 90,
        weight: 30,
      }),
    ).toBeFalsy();

    expect(
      validateAssessmentGrades({
        grade: 20,
        maxGrade: 30,
        weight: 101,
      }),
    ).toBeFalsy();

    expect(
      validateAssessmentGrades({ grade: null, maxGrade: null, weight: 30 }),
    ).toBeFalsy();

    expect(validateAssessmentGrades({ grade: 20 })).toBeFalsy();
  });
});

describe("calculateRecommendedGrade", () => {
  it("should return correct recommended grade", () => {
    const {
      assessments,
      desiredGrade,
      recommendedGrade,
    } = courseWithRecommended;

    expect(calculateRecommendedGrade(assessments, desiredGrade)).toEqual(
      recommendedGrade,
    );
  });
});
