import { render, screen } from "@testing-library/react";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("should load and display children", async () => {
    render(<HomePage />);

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
