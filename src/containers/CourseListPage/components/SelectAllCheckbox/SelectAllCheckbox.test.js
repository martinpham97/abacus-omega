import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import SelectAllCheckbox from "./SelectAllCheckbox";

describe("<SelectAllCheckbox />", () => {
  let mockHandleSelectAll;

  beforeEach(() => {
    mockHandleSelectAll = jest.fn();
  });

  it("should call handleSelectAll on click", () => {
    render(<SelectAllCheckbox handleSelectAll={mockHandleSelectAll} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(mockHandleSelectAll).toHaveBeenCalled();
  });

  it("should set checked and 'Deselect all' text if selected is equal to total", () => {
    render(
      <SelectAllCheckbox
        selected={5}
        total={5}
        handleSelectAll={mockHandleSelectAll}
      />,
    );

    expect(screen.getByRole("checkbox").checked).toEqual(true);
    expect(screen.queryByText(/deselect all/i)).not.toBeNull();
  });

  it("should set unchecked if selected is zero", () => {
    render(
      <SelectAllCheckbox
        selected={0}
        total={5}
        handleSelectAll={mockHandleSelectAll}
      />,
    );

    expect(screen.getByRole("checkbox").checked).toEqual(false);
  });

  it("should set intermediate if selected is less than total but greater than zero", () => {
    render(
      <SelectAllCheckbox
        selected={2}
        total={5}
        handleSelectAll={mockHandleSelectAll}
      />,
    );

    expect(screen.getByRole("checkbox").checked).toEqual(true);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-indeterminate");
  });

  it("should be accessible", async () => {
    const { container } = render(
      <SelectAllCheckbox handleSelectAll={mockHandleSelectAll} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
