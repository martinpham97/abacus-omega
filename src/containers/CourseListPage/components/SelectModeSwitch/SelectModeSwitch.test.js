import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import SelectModeSwitch from "./SelectModeSwitch";

describe("<SelectModeSwitch />", () => {
  let mockHandleToggleSelectMode;

  beforeEach(() => {
    mockHandleToggleSelectMode = jest.fn();
  });

  it("should call handleToggleSelectMode on click", () => {
    render(
      <SelectModeSwitch handleToggleSelectMode={mockHandleToggleSelectMode} />,
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(mockHandleToggleSelectMode).toHaveBeenCalled();
  });

  it("should handle switch checked state with selectMode prop", () => {
    render(
      <SelectModeSwitch
        selectMode
        handleToggleSelectMode={mockHandleToggleSelectMode}
      />,
    );

    expect(screen.getByRole("checkbox").checked).toEqual(true);
  });

  it("should be accessible", async () => {
    const { container } = render(
      <SelectModeSwitch handleToggleSelectMode={mockHandleToggleSelectMode} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
