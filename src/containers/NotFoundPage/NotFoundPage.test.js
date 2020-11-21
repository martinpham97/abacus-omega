import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import NotFoundPage from "./NotFoundPage";

describe("<NotFoundPage />", () => {
  it("should load and display button to go back home", () => {
    renderWithWrappers(<NotFoundPage />);

    expect(screen.queryByRole("button")).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<NotFoundPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
