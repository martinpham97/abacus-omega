import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { courseWithId as course } from "__fixtures__/courses";

import GradeResultsList from "./GradeResultsList";

describe("<GradeResultsList />", () => {
  it("should be accessible", async () => {
    const { container } = render(<GradeResultsList course={course} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
