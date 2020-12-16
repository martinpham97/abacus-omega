import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import AboutPage from "./AboutPage";

describe("<AboutPage />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<AboutPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
