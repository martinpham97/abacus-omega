import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import Loading from "./Loading";

describe("<Loading />", () => {
  it("should load and display progress", () => {
    render(<Loading />);

    expect(
      screen.getByRole("progressbar", { hidden: true }),
    ).toBeInTheDocument();
  });

  it("should be accessible", async () => {
    const { container } = render(<Loading />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
