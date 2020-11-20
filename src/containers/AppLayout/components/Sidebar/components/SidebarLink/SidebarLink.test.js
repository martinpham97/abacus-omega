import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import SidebarLink from "./SidebarLink";

describe("<SidebarLink />", () => {
  it("should display title text when type is title", () => {
    const label = "Some App title";
    render(
      <SidebarLink isSidebarOpened={false} id={1} type="title" label={label} />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should display divider when type is divider", () => {
    render(<SidebarLink isSidebarOpened={false} id={1} type="divider" />);

    expect(screen.getByTestId(/divider/i)).toBeInTheDocument();
  });

  it("should display link icon and text when type is link", () => {
    const Icon = () => <i data-testid="icon">icon</i>;
    const label = "Home";

    render(
      <SidebarLink
        isSidebarOpened
        id={1}
        type="link"
        label={label}
        icon={<Icon />}
        selected={false}
      />,
    );

    expect(screen.getByTestId(/icon/i)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <SidebarLink
        isSidebarOpened
        id={1}
        type="link"
        label="home"
        selected={false}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
