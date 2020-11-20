import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import Loading from "./Loading";

describe("<Loading />", () => {
  it("should load and display progress", async () => {
    renderWithWrappers(<Loading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<Loading />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
