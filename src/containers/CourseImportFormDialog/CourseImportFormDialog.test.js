import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { axe } from "jest-axe";

import CourseImportFormDialog from "./CourseImportFormDialog";

describe("<CourseImportFormDialog />", () => {
  let mockHandleClose;
  let mockHandleSubmit;

  beforeEach(() => {
    mockHandleClose = jest.fn();
    mockHandleSubmit = jest.fn();
  });

  it("should display dialog", () => {
    render(
      <CourseImportFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeNull();
  });

  it("should not display dialog when isOpen is false", () => {
    render(
      <CourseImportFormDialog
        isOpen={false}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("should call handleClose on clicking cancel button", () => {
    render(
      <CourseImportFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    fireEvent.click(screen.getByLabelText(/cancel-button/i));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("should call handleSubmit on clicking create button", async () => {
    render(
      <CourseImportFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    await waitFor(async () => {
      const courseSelect = screen.queryAllByLabelText(/courses/i)[0];
      await fireEvent.mouseDown(courseSelect);
      await fireEvent.click(screen.getByText(/acct2507 - .*/i));
      await fireEvent.blur(courseSelect);
    });

    await act(async () => {
      fireEvent.click(screen.getByLabelText(/create-button/i));
    });

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should be accessible", async () => {
    const { container } = render(
      <CourseImportFormDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
