import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import {
  courseWithRecommended,
  courseWithRecommendedNoRemaining,
} from "__fixtures__/courses";

import GradeResultsList from "./GradeResultsList";

describe("<GradeResultsList />", () => {
  it("should display result list correctly", () => {
    render(<GradeResultsList course={courseWithRecommended} />);

    const listItems = screen.queryAllByRole("button");
    expect(listItems.length).toEqual(4);
    expect(listItems[0].querySelector("span").textContent).toEqual(
      "Assessment #1 (20%)",
    );
    expect(listItems[0].querySelector("p").textContent).toEqual(
      "Results: 41/50 (82%)",
    );
    expect(listItems[1].querySelector("span").textContent).toEqual(
      "Assignment 2 (10%)",
    );
    expect(listItems[1].querySelector("p").textContent).toEqual(
      "Recommended: 13.63/25 (54.52%)",
    );
    expect(listItems[2].querySelector("span").textContent).toEqual(
      "Mid-term Exam (30%)",
    );
    expect(listItems[2].querySelector("p").textContent).toEqual(
      "Recommended: 54.5%",
    );
    expect(listItems[3].querySelector("span").textContent).toEqual(
      "Remaining assessments (40%)",
    );
    expect(listItems[3].querySelector("p").textContent).toEqual(
      "Recommended: 54.5% for each remaining assessment",
    );
  });

  it("should not display remaining assessments if results add up to 100%", () => {
    render(<GradeResultsList course={courseWithRecommendedNoRemaining} />);

    const listItems = screen.queryAllByRole("button");
    expect(listItems.length).toEqual(2);
    expect(listItems[0].querySelector("span").textContent).toEqual(
      "Assignment 1 (20%)",
    );
    expect(listItems[0].querySelector("p").textContent).toEqual(
      "Results: 80/100 (80%)",
    );
    expect(listItems[1].querySelector("span").textContent).toEqual(
      "Assignment 2 (80%)",
    );
    expect(listItems[1].querySelector("p").textContent).toEqual(
      "Results: 50/100 (50%)",
    );
  });

  it("should display list header", () => {
    render(<GradeResultsList course={courseWithRecommended} />);
    expect(screen.queryByText(/details/i)).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <GradeResultsList course={courseWithRecommended} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
