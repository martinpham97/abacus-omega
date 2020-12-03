import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import GradeCalculator from "./GradeCalculator";

describe("<GradeCalculator />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<GradeCalculator />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
