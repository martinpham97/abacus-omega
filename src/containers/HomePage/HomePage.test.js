import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("should load and display children", async () => {
    render(<HomePage />);

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it("should be accessible", async () => {
    const { container } = render(<HomePage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
