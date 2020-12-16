import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import {
  courseWithRecommendedNoRemaining,
  courseWithRecommendedGreaterThan100,
  courseWithRecommendedLessThanZero,
  courseWithRecommended,
} from "__fixtures__/courses";

import GradeResults from "./GradeResults";

describe("<GradeResults />", () => {
  it("should show error for recommendedGrade === null", () => {
    render(<GradeResults course={courseWithRecommendedNoRemaining} />);
    expect(screen.queryByTestId(/alert-error/i)).not.toBeNull();
  });

  it("should show success for recommendedGrade <= 0", () => {
    render(<GradeResults course={courseWithRecommendedLessThanZero} />);
    expect(screen.queryByTestId(/alert-success/i)).not.toBeNull();
  });

  it("should show warning for recommendedGrade > 100", () => {
    render(<GradeResults course={courseWithRecommendedGreaterThan100} />);
    expect(screen.queryByTestId(/alert-warning/i)).not.toBeNull();
  });

  it("should show info and result list for valid recommendedGrade", () => {
    render(<GradeResults course={courseWithRecommended} />);
    expect(screen.queryByTestId(/alert-info/i)).not.toBeNull();
    expect(screen.queryAllByRole("listitem")).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <GradeResults course={courseWithRecommended} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
