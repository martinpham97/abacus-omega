import { screen } from "@testing-library/react";

import { renderWithWrappers } from "utils/testing";

import NotFoundPage from "./NotFoundPage";

describe("<NotFoundPage />", () => {
  it("should load and display button to go back home", async () => {
    renderWithWrappers(<NotFoundPage />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
