import { render, screen } from "@testing-library/react";

import AppLayout from "./AppLayout";

describe("<AppLayout />", () => {
  it("should display children", async () => {
    const Child = () => <h1>Test Child</h1>;

    render(
      <AppLayout>
        <Child />
      </AppLayout>,
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Test Child");
  });
});
