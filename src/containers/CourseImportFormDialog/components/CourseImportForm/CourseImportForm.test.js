import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";

import CourseImportForm from "./CourseImportForm";

describe("<CourseImportForm />", () => {
  let id;
  let mockHandleSubmit;

  beforeEach(() => {
    id = "some-id";
    mockHandleSubmit = jest.fn();
  });

  it("should call handleSubmit on submit with correct values", async () => {
    render(<CourseImportForm id={id} handleSubmit={mockHandleSubmit} />);

    await waitFor(async () => {
      const programSelect = screen.queryAllByLabelText(
        /program\/specialisation/i,
      )[0];
      const courseSelect = screen.queryAllByLabelText(/courses/i)[0];
      await fireEvent.change(programSelect, {
        target: {
          value: "ACCTA2 - Accounting (Undergraduate)",
        },
      });
      await fireEvent.click(screen.queryAllByRole(/option/i)[0]);
      await fireEvent.mouseDown(courseSelect);
      await fireEvent.click(screen.getByText(/acct2507 - .*/i));
      await fireEvent.click(screen.getByText(/acct2511 - .*/i));
      await fireEvent.blur(courseSelect);
      await fireEvent.submit(courseSelect);
    });

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      courses: [
        "ACCT2507 - Introduction to Accounting Research",
        "ACCT2511 - Financial Accounting Fundamentals",
      ],
      specialisation: {
        code: "ACCTA2",
        courses: expect.arrayContaining([expect.any(String)]),
        level: "Undergraduate",
        title: "Accounting",
        uoc: "30",
      },
      university: "unsw",
    });
  });

  it("should show errors on empty courses field", async () => {
    render(<CourseImportForm id={id} handleSubmit={mockHandleSubmit} />);

    await waitFor(async () => {
      const courseSelect = screen.queryAllByLabelText(/courses/i)[0];
      await fireEvent.submit(courseSelect);
    });

    expect(
      screen.queryByText(/a minimum of 1 course is required/i),
    ).not.toBeNull();
  });

  it("should display empty courses message on program with no courses", async () => {
    render(<CourseImportForm id={id} handleSubmit={mockHandleSubmit} />);

    await waitFor(async () => {
      const programSelect = screen.queryAllByLabelText(
        /program\/specialisation/i,
      )[0];
      const courseSelect = screen.queryAllByLabelText(/courses/i)[0];
      await fireEvent.change(programSelect, {
        target: {
          value: "3778 - Computer Science (Undergraduate)",
        },
      });
      await fireEvent.click(screen.queryAllByRole(/option/i)[0]);
      await fireEvent.mouseDown(courseSelect);
    });

    expect(
      screen.queryByText(
        /no courses available, please refer to the official handbook/i,
      ),
    ).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <CourseImportForm id={id} handleSubmit={mockHandleSubmit} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
