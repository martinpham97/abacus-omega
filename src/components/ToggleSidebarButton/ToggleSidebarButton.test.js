import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import ToggleSidebarButton from "./ToggleSidebarButton";

describe("<ToggleSidebarButton />", () => {
  let mockHandleToggleSidebar;

  beforeEach(() => {
    mockHandleToggleSidebar = jest.fn();
  });

  it("should call handleToggleSidebar when sidebar icon is clicked", () => {
    render(
      <ToggleSidebarButton
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
      />,
    );

    expect(screen.getByTestId(/sidebar-open-svg/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/toggle-sidebar/i));

    expect(mockHandleToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("should change sidebar icon when isSidebarOpened is true", () => {
    render(
      <ToggleSidebarButton
        isSidebarOpened={true}
        handleToggleSidebar={mockHandleToggleSidebar}
      />,
    );

    expect(screen.getByTestId(/sidebar-close-svg/i)).toBeInTheDocument();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <ToggleSidebarButton
        isSidebarOpened={true}
        handleToggleSidebar={mockHandleToggleSidebar}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
