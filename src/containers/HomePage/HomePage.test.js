import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<HomePage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
