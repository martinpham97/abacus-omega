import { screen, fireEvent, render, act } from "@testing-library/react";
import { axe } from "jest-axe";

import CourseForm from "./CourseForm";

describe("<CourseForm />", () => {
  let mockHandleSubmit;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
  });

  it("should fill default values", () => {
    const name = "COMP1511";

    render(
      <CourseForm courseData={{ name }} handleSubmit={mockHandleSubmit} />,
    );

    expect(screen.queryByDisplayValue(name)).not.toBeNull();
  });

  it("should show errors on empty name field", async () => {
    render(<CourseForm handleSubmit={mockHandleSubmit} />);

    await act(async () => {
      fireEvent.blur(screen.getByLabelText("course-name"));
    });

    expect(screen.queryByText(/course name is required/i)).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <CourseForm handleSubmit={mockHandleSubmit} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
