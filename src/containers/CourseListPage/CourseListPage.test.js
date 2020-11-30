import { axe } from "jest-axe";

import { renderWithWrappers } from "utils/testing";

import CourseListPage from "./CourseListPage";

describe("<CourseListPage />", () => {
  it("should be accessible", async () => {
    const { container } = renderWithWrappers(<CourseListPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
