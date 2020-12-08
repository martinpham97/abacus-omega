import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import GradeCalculator from "./GradeCalculator";

describe("<GradeCalculator />", () => {
  it("should be accessible", async () => {
    const { container } = render(<GradeCalculator />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
