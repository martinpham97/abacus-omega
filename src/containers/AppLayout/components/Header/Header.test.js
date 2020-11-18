import { render, screen, fireEvent } from "@testing-library/react";

import Header from "./Header";

describe("<Header />", () => {
  let mockHandleToggleSidebar;
  let mockHandleToggleDarkMode;

  beforeEach(() => {
    mockHandleToggleSidebar = jest.fn();
    mockHandleToggleDarkMode = jest.fn();
  });

  it("should display title", () => {
    const title = "Some App title";
    render(
      <Header
        title={title}
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        theme="light"
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should call handleToggleSidebar when sidebar icon is clicked", () => {
    render(
      <Header
        title="some title"
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        theme="light"
      />,
    );

    expect(screen.getByTestId(/sidebar-open-svg/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/toggle-sidebar/i));

    expect(mockHandleToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("should call handleToggleDarkMode when dark mode icon is clicked", () => {
    render(
      <Header
        title="some title"
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        theme="light"
      />,
    );

    expect(screen.getByTestId(/moon-svg/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/toggle-dark/i));

    expect(mockHandleToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it("should change dark mode icon when theme is dark", () => {
    render(
      <Header
        title="some title"
        isSidebarOpened={true}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        theme="dark"
      />,
    );

    expect(screen.getByTestId(/sun-svg/i)).toBeInTheDocument();
  });
});
