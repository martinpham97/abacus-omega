import { screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import Header from "./Header";

describe("<Header />", () => {
  let mockHandleToggleSidebar;
  let mockHandleToggleDarkMode;
  let mockHandleChangeLanguage;

  beforeEach(() => {
    mockHandleToggleSidebar = jest.fn();
    mockHandleToggleDarkMode = jest.fn();
    mockHandleChangeLanguage = jest.fn();
  });

  it("should display title", () => {
    const title = "Some App title";
    renderWithWrappers(
      <Header
        title={title}
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        handleChangeLanguage={mockHandleChangeLanguage}
        language="en"
        themeType="light"
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should call handleToggleSidebar when sidebar icon is clicked", () => {
    renderWithWrappers(
      <Header
        title="some title"
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        handleChangeLanguage={mockHandleChangeLanguage}
        language="en"
        themeType="light"
      />,
    );

    expect(screen.getByTestId(/sidebar-open-svg/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/toggle-sidebar/i));

    expect(mockHandleToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("should call handleToggleDarkMode when dark mode icon is clicked", () => {
    renderWithWrappers(
      <Header
        title="some title"
        isSidebarOpened={false}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        handleChangeLanguage={mockHandleChangeLanguage}
        language="en"
        themeType="light"
      />,
    );

    expect(screen.getByTestId(/moon-svg/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/toggle-dark/i));

    expect(mockHandleToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it("should change dark mode icon when themeType is dark", () => {
    renderWithWrappers(
      <Header
        title="some title"
        isSidebarOpened={true}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        handleChangeLanguage={mockHandleChangeLanguage}
        language="en"
        themeType="dark"
      />,
    );

    expect(screen.getByTestId(/sun-svg/i)).toBeInTheDocument();
  });

  it("should change language when language button is clicked", async () => {
    renderWithWrappers(
      <Header
        title="some title"
        isSidebarOpened={true}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        handleChangeLanguage={mockHandleChangeLanguage}
        language="en"
        themeType="dark"
      />,
    );

    fireEvent.click(screen.getByLabelText(/change-language/i));

    fireEvent.click(screen.queryAllByRole("menuitem")[1]);

    expect(mockHandleChangeLanguage).toHaveBeenCalled();
  });

  it("should be accessible", async () => {
    const { container } = renderWithWrappers(
      <Header
        title="some title"
        isSidebarOpened={true}
        handleToggleSidebar={mockHandleToggleSidebar}
        handleToggleDarkMode={mockHandleToggleDarkMode}
        handleChangeLanguage={mockHandleChangeLanguage}
        language="en"
        themeType="dark"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
