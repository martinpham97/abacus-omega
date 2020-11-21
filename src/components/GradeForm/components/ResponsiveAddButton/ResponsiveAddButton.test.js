import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import * as useSmallScreenHook from "hooks/useSmallScreen";

import ResponsiveAddButton from "./ResponsiveAddButton";

describe("<ResponsiveAddButton />", () => {
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn();
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call handleClick on click", () => {
    render(<ResponsiveAddButton handleClick={mockHandleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("should show text on small screens", () => {
    render(<ResponsiveAddButton handleClick={mockHandleClick} />);

    expect(screen.queryByText(/add/i)).not.toBeNull();
  });

  it("should not show text on large screens", () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    render(<ResponsiveAddButton handleClick={mockHandleClick} />);

    expect(screen.queryByText(/add/i)).toBeNull();
  });

  it("should be accessible", async () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    const { container } = render(
      <ResponsiveAddButton handleClick={mockHandleClick} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
