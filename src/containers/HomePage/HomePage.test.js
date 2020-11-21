import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("should be accessible", async () => {
    const { container } = render(<HomePage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
