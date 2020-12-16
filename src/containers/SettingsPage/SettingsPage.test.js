import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import SettingsPage from "./SettingsPage";

describe("<SettingsPage />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<SettingsPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
