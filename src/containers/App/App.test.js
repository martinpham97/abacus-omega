import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import App from "./App";

jest.setTimeout(10000);

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
