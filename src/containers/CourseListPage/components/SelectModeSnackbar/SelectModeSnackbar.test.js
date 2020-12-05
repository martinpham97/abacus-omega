import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import SelectModeSnackbar from "./SelectModeSnackbar";

describe("<SelectModeSnackbar />", () => {
  let mockHandleDeleteClick;

  beforeEach(() => {
    mockHandleDeleteClick = jest.fn();
  });

  it("should display the number of selected courses", () => {
    render(
      <SelectModeSnackbar
        open
        selected={5}
        handleDeleteClick={mockHandleDeleteClick}
      />,
    );

    expect(screen.queryAllByText(/5 courses selected/i)).not.toBeNull();
  });

  it("should disable delete button when selected is zero", () => {
    render(
      <SelectModeSnackbar
        open
        selected={0}
        handleDeleteClick={mockHandleDeleteClick}
      />,
    );

    expect(screen.getByRole("button").disabled).toEqual(true);
  });

  it("should call handleDeleteClick on delete button click", () => {
    render(
      <SelectModeSnackbar
        open
        selected={2}
        handleDeleteClick={mockHandleDeleteClick}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockHandleDeleteClick).toHaveBeenCalled();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <SelectModeSnackbar
        open
        selected={2}
        handleDeleteClick={mockHandleDeleteClick}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
