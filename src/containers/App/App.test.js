import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import App from "./App";

describe("<App />", () => {
  it("should load and display children", async () => {
    renderWithWrappers(<App />);

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<App />);

    expect(
      await axe(container, {
        rules: {
          list: { enabled: false },
        },
      }),
    ).toHaveNoViolations();
  });
});
