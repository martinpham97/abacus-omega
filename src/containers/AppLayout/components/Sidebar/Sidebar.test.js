import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Sidebar from "./Sidebar";

describe("<Sidebar />", () => {
  let mockHandleToggleSidebar;

  beforeEach(() => {
    mockHandleToggleSidebar = jest.fn();
  });

  it("should set drawer to temporary on small screens", () => {
    render(
      <Sidebar
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        isSmallScreen
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId(/sidebar-list/i)).not.toBeInTheDocument();
  });

  it("should set drawer to permanent on large screens", () => {
    render(
      <Sidebar
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        isSmallScreen={false}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId(/sidebar-list/i)).toBeInTheDocument();
  });

  it("should toggle sidebar when sidebar button is clicked", () => {
    render(
      <Sidebar
        handleToggleSidebar={mockHandleToggleSidebar}
        isSidebarOpened
        isSmallScreen
      />,
      { wrapper: BrowserRouter },
    );

    fireEvent.click(screen.getByLabelText(/toggle-sidebar/i));

    expect(mockHandleToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
