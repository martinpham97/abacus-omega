import { render, screen } from "@testing-library/react";

import App from "./App";

describe("<App />", () => {
  it("should load and display children", async () => {
    render(<App />);

    expect(screen.getByText(/hello world/i)).toBeDefined();
  });
});
