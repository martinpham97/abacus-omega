import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import App from "./App";

describe("<App />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<App />);

    expect(
      await axe(container, {
        rules: {
          list: { enabled: false },
        },
      }),
    ).toHaveNoViolations();
  });
});
