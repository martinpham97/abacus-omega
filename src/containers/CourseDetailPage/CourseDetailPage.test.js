import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import CourseDetailPage from "./CourseDetailPage";

describe("<CourseDetailPage />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<CourseDetailPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
