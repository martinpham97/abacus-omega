import { screen, fireEvent, render, waitFor } from "@testing-library/react";
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

  it("should call handleSubmit on submit with correct values", async () => {
    const name = "COMP2511";

    render(
      <CourseForm courseData={{ name }} handleSubmit={mockHandleSubmit} />,
    );

    await waitFor(async () => {
      await fireEvent.submit(screen.getByRole("textbox"));
    });

    expect(mockHandleSubmit).toHaveBeenCalledWith({ name });
  });

  it("should show errors on empty name field", async () => {
    render(<CourseForm handleSubmit={mockHandleSubmit} />);

    await waitFor(async () => {
      await fireEvent.submit(screen.getByRole("textbox"));
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
