import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import CourseSearchInput from "./CourseSearchInput";

describe("<CourseSearchInput />", () => {
  let mockHandleTextChange;

  beforeEach(() => {
    mockHandleTextChange = jest.fn();
  });

  it("should call handleTextChange on input change", () => {
    const value = "Example course";

    render(<CourseSearchInput handleTextChange={mockHandleTextChange} />);

    fireEvent.change(screen.getByRole("searchbox"), { target: { value } });

    expect(mockHandleTextChange).toHaveBeenLastCalledWith(value);
  });

  it("should be accessible", async () => {
    const { container } = render(
      <CourseSearchInput handleTextChange={mockHandleTextChange} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
