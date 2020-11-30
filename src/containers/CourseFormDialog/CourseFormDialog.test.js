import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "jest-axe";

import CourseFormDialog from "./CourseFormDialog";

describe("<CourseFormDialog />", () => {
  let mockHandleClose;
  let mockHandleSubmit;

  beforeEach(() => {
    mockHandleClose = jest.fn();
    mockHandleSubmit = jest.fn();
  });

  it("should display dialog", () => {
    render(
      <CourseFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeNull();
  });

  it("should not display dialog when isOpen is false", () => {
    render(
      <CourseFormDialog
        isOpen={false}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("should call handleClose on clicking cancel button", () => {
    render(
      <CourseFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    fireEvent.click(screen.getByLabelText(/cancel-button/i));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("should call handleSubmit on clicking save button", async () => {
    render(
      <CourseFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        course={{ name: "some name" }}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByLabelText(/save-button/i));
    });

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should be accessible", async () => {
    const { container } = render(
      <CourseFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
