import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import GradeResultsList from "./GradeResultsList";

describe("<GradeResultsList />", () => {
  const course = {
    assessments: [
      {
        description: "Assignment 1",
        weight: 20,
        maxGrade: 50,
        grade: 41,
      },
      {
        description: "Assignment 2",
        weight: 10,
        maxGrade: 25,
        grade: 15,
      },
      {
        description: "Mid-term Exam",
        weight: 30,
        maxGrade: 80,
        grade: 56,
      },
    ],
    desiredGrade: 60,
    recommendedGrade: 90,
  };

  it("should be accessible", async () => {
    const { container } = render(<GradeResultsList course={course} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
