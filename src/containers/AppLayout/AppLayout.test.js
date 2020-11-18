import { screen } from "@testing-library/react";

import { renderWithWrappers } from "utils/testing";

import AppLayout from "./AppLayout";

describe("<AppLayout />", () => {
  it("should display children", async () => {
    const Child = () => <div>Test Child</div>;

    renderWithWrappers(
      <AppLayout>
        <Child />
      </AppLayout>,
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
