import { screen, fireEvent } from "@testing-library/react";
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

    expect(screen.queryByText("Test Child")).not.toBeNull();
  });

  it("should toggle sidebar on clicking sidebar button", async () => {
    const { container } = renderWithWrappers(<AppLayout />);

    fireEvent.click(screen.queryAllByLabelText(/toggle-sidebar/i)[0]);

    expect(container).toMatchSnapshot();
  });

  it("should toggle light/dark mode on clicking toggle dark mode button", async () => {
    const { container } = renderWithWrappers(<AppLayout />);

    fireEvent.click(screen.getByLabelText(/toggle-dark/i));
    fireEvent.click(screen.getByLabelText(/toggle-dark/i));
    fireEvent.click(screen.getByLabelText(/toggle-dark/i));

    expect(container).toMatchSnapshot();
  });

  it("should change language when language is selected", async () => {
    const { container } = renderWithWrappers(<AppLayout />);

    fireEvent.click(screen.getByLabelText(/change-language/i));

    fireEvent.click(screen.queryAllByRole("menuitem")[1]);

    expect(container).toMatchSnapshot();
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
