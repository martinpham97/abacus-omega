import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import SidebarLink from "./SidebarLink";

describe("<SidebarLink />", () => {
  it("should display title text when type is title", () => {
    const label = "Some App title";
    render(
      <SidebarLink isSidebarOpened={false} id={1} type="title" label={label} />,
    );

    expect(screen.getByText(label)).not.toBeNull();
  });

  it("should display divider when type is divider", () => {
    render(<SidebarLink isSidebarOpened={false} id={1} type="divider" />);

    expect(screen.getByTestId(/divider/i)).not.toBeNull();
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

    expect(screen.getByTestId(/icon/i)).not.toBeNull();
    expect(screen.getByText(label)).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <ul>
        <SidebarLink
          isSidebarOpened
          id={1}
          type="link"
          label="home"
          selected={false}
        />
      </ul>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
