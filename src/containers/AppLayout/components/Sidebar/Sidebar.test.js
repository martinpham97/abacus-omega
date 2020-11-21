import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { axe } from "jest-axe";

import * as useSmallScreenHook from "hooks/useSmallScreen";

import Sidebar from "./Sidebar";

describe("<Sidebar />", () => {
  let mockHandleToggleSidebar;

  beforeEach(() => {
    mockHandleToggleSidebar = jest.fn();
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set drawer to temporary on small screens", () => {
    render(
      <Sidebar
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId(/sidebar-list/i)).toBeNull();
  });

  it("should set drawer to permanent on large screens", () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    render(
      <Sidebar
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId(/sidebar-list/i)).not.toBeNull();
  });

  it("should toggle sidebar when sidebar button is clicked", () => {
    render(
      <Sidebar handleToggleSidebar={mockHandleToggleSidebar} isSidebarOpened />,
      { wrapper: BrowserRouter },
    );

    fireEvent.click(screen.getByLabelText(/toggle-sidebar/i));

    expect(mockHandleToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("should be accessible", async () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    const { container } = render(
      <Sidebar handleToggleSidebar={mockHandleToggleSidebar} isSidebarOpened />,
      { wrapper: BrowserRouter },
    );

    expect(
      await axe(container, {
        rules: {
          list: { enabled: false },
        },
      }),
    ).toHaveNoViolations();
  });
});
