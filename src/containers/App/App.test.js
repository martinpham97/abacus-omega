import { screen } from "@testing-library/react";

import { renderWithWrappers } from "utils/testing";

import App from "./App";

describe("<App />", () => {
  it("should load and display children", async () => {
    renderWithWrappers(<App />);

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
