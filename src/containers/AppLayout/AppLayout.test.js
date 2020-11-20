import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

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

  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<AppLayout />);

    expect(
      await axe(container, {
        rules: {
          list: { enabled: false },
        },
      }),
    ).toHaveNoViolations();
  });
});
