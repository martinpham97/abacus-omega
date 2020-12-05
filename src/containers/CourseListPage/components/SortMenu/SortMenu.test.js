import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import SortMenu from "./SortMenu";

describe("<SortMenu />", () => {
  let mockAnchorEl;
  let mockHandleMenuClose;
  let mockHandleMenuOpen;
  let mockHandleMenuItemClick;

  beforeEach(() => {
    mockAnchorEl = document.body;
    mockHandleMenuClose = jest.fn();
    mockHandleMenuOpen = jest.fn();
    mockHandleMenuItemClick = jest.fn();
  });

  it("should select sort by name ascending by default", () => {
    render(
      <SortMenu
        anchorEl={mockAnchorEl}
        handleMenuOpen={mockHandleMenuOpen}
        handleMenuClose={mockHandleMenuClose}
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );

    expect(screen.queryByTestId(/arrow-up-svg/i)).not.toBeNull();
    expect(screen.getByLabelText(/sort-by/i).textContent).toEqual("Name");
  });

  it("should change to arrow down when sorting in descending order", () => {
    render(
      <SortMenu
        sortDirection="desc"
        anchorEl={mockAnchorEl}
        handleMenuOpen={mockHandleMenuOpen}
        handleMenuClose={mockHandleMenuClose}
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );

    expect(screen.queryByTestId(/arrow-down-svg/i)).not.toBeNull();
  });

  it("should call mockHandleMenuOpen on click", () => {
    render(
      <SortMenu
        anchorEl={mockAnchorEl}
        handleMenuOpen={mockHandleMenuOpen}
        handleMenuClose={mockHandleMenuClose}
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );

    fireEvent.click(screen.getByLabelText(/sort-by/i));

    expect(mockHandleMenuOpen).toHaveBeenCalled();
  });

  it("should call handleMenuItemClick with correct values on clicking sort option", () => {
    render(
      <SortMenu
        anchorEl={mockAnchorEl}
        handleMenuOpen={mockHandleMenuOpen}
        handleMenuClose={mockHandleMenuClose}
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );

    fireEvent.click(screen.getByLabelText(/sort-by/i));
    fireEvent.click(screen.queryAllByRole("menuitem")[2]);

    expect(mockHandleMenuItemClick).toHaveBeenCalledWith({
      direction: "asc",
      type: "createdAt",
    });
  });

  it("should be accessible", async () => {
    const { container } = render(
      <SortMenu
        anchorEl={mockAnchorEl}
        handleMenuOpen={mockHandleMenuOpen}
        handleMenuClose={mockHandleMenuClose}
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
