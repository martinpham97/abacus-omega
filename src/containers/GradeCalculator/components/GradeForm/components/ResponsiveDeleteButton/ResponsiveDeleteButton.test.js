import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import * as useSmallScreenHook from "hooks/useSmallScreen";

import ResponsiveDeleteButton from "./ResponsiveDeleteButton";

describe("<ResponsiveDeleteButton />", () => {
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn();
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call handleClick on click", () => {
    render(<ResponsiveDeleteButton handleClick={mockHandleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("should show text on small screens", () => {
    render(<ResponsiveDeleteButton handleClick={mockHandleClick} />);

    expect(screen.queryByText(/delete/i)).not.toBeNull();
  });

  it("should not show text on large screens", () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    render(<ResponsiveDeleteButton handleClick={mockHandleClick} />);

    expect(screen.queryByText(/delete/i)).toBeNull();
  });

  it("should be accessible", async () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    const { container } = render(
      <ResponsiveDeleteButton handleClick={mockHandleClick} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
