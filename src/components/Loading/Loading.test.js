import { screen } from "@testing-library/react";

import { renderWithWrappers } from "utils/testing";

import Loading from "./Loading";

describe("<Loading />", () => {
  it("should load and display progress", async () => {
    renderWithWrappers(<Loading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
