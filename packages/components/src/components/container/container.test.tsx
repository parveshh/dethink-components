import { createRef, forwardRef, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Container,
  containerClassNames,
  type ContainerAlign,
  type ContainerElement,
  type ContainerGutter,
  type ContainerSize,
} from ".";

const elements: ContainerElement[] = [
  "div",
  "main",
  "section",
  "article",
  "header",
  "footer",
  "aside",
  "nav",
];
const sizes: ContainerSize[] = ["sm", "md", "lg", "xl", "2xl", "full"];
const gutters: ContainerGutter[] = ["none", "sm", "md", "lg", "xl"];
const alignments: ContainerAlign[] = ["start", "center", "end"];

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-[40rem]",
  md: "max-w-[48rem]",
  lg: "max-w-[64rem]",
  xl: "max-w-[80rem]",
  "2xl": "max-w-[96rem]",
  full: "max-w-none",
};

const gutterClasses: Record<ContainerGutter, string[]> = {
  none: ["[--container-gutter:0rem]", "px-0"],
  sm: ["[--container-gutter:0.75rem]", "sm:[--container-gutter:1rem]", "px-3", "sm:px-4"],
  md: ["[--container-gutter:1rem]", "sm:[--container-gutter:1.5rem]", "px-4", "sm:px-6"],
  lg: ["[--container-gutter:1.25rem]", "sm:[--container-gutter:2rem]", "px-5", "sm:px-8"],
  xl: ["[--container-gutter:1.5rem]", "sm:[--container-gutter:2.5rem]", "px-6", "sm:px-10"],
};

const alignClasses: Record<ContainerAlign, string> = {
  start: "me-auto",
  center: "mx-auto",
  end: "ms-auto",
};

const RouterAnchor = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
>(({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />);
RouterAnchor.displayName = "RouterAnchor";

describe("Container", () => {
  it("renders a neutral centered container with safe defaults", () => {
    render(<Container>Content</Container>);

    const container = screen.getByText("Content");

    expect(container.tagName).toBe("DIV");
    expect(container).toHaveAttribute("data-slot", "container");
    expect(container).toHaveAttribute("data-element", "div");
    expect(container).toHaveAttribute("data-size", "xl");
    expect(container).toHaveAttribute("data-gutter", "md");
    expect(container).toHaveAttribute("data-align", "center");
    expect(container).toHaveAttribute("data-fluid", "false");
    expect(container).toHaveAttribute("data-safe-area", "false");
    expect(container).toHaveClass("box-border", "w-full", "min-w-0", "max-w-[80rem]", "mx-auto");
  });

  it.each(elements)("renders a semantic %s element", (as) => {
    render(<Container as={as}>Semantic {as}</Container>);

    expect(screen.getByText(`Semantic ${as}`).tagName).toBe(as.toUpperCase());
  });

  it.each(sizes)("applies %s size data and max-width class", (size) => {
    render(<Container size={size}>size {size}</Container>);

    const container = screen.getByText(`size ${size}`);

    expect(container).toHaveAttribute("data-size", size);
    expect(container).toHaveClass(sizeClasses[size]);
  });

  it.each(gutters)("applies %s gutter data and classes", (gutter) => {
    render(<Container gutter={gutter}>gutter {gutter}</Container>);

    const container = screen.getByText(`gutter ${gutter}`);

    expect(container).toHaveAttribute("data-gutter", gutter);
    for (const className of gutterClasses[gutter]) {
      expect(container.className).toContain(className);
    }
  });

  it("uses max-width none when fluid", () => {
    render(
      <Container fluid size="sm">
        Fluid
      </Container>,
    );

    const container = screen.getByText("Fluid");

    expect(container).toHaveAttribute("data-fluid", "true");
    expect(container).toHaveAttribute("data-size", "sm");
    expect(container).toHaveClass("max-w-none");
    expect(container).not.toHaveClass("max-w-[40rem]");
  });

  it.each(alignments)("applies %s inline alignment", (align) => {
    render(<Container align={align}>align {align}</Container>);

    const container = screen.getByText(`align ${align}`);

    expect(container).toHaveAttribute("data-align", align);
    expect(container).toHaveClass(alignClasses[align]);
  });

  it("uses safe-area padding classes without dropping the gutter variable", () => {
    const className = containerClassNames({ gutter: "lg", safeArea: true });

    expect(className).toContain("[--container-gutter:1.25rem]");
    expect(className).toContain("sm:[--container-gutter:2rem]");
    expect(className).toContain(
      "pl-[max(var(--container-gutter),env(safe-area-inset-left))]",
    );
    expect(className).toContain(
      "pr-[max(var(--container-gutter),env(safe-area-inset-right))]",
    );
    expect(className).not.toContain("px-5");
  });

  it("composes consumer classes after baseline classes", () => {
    expect(containerClassNames({ className: "custom-container" })).toContain(
      "custom-container",
    );
  });

  it("rejects unsupported token values at the TypeScript boundary", () => {
    const valid = <Container align="center" gutter="md" size="xl" />;
    // @ts-expect-error Container sizes use constrained token values.
    const invalidSize = <Container size="3xl" />;
    // @ts-expect-error Container gutters use constrained token values.
    const invalidGutter = <Container gutter="2" />;
    // @ts-expect-error Container does not support arbitrary elements.
    const invalidElement = <Container as="span" />;
    // @ts-expect-error Container does not expose arbitrary CSS prop parsing.
    const invalidStyleProp = <Container backgroundColor="red" />;

    expect(valid).toBeTruthy();
    expect(invalidSize).toBeTruthy();
    expect(invalidGutter).toBeTruthy();
    expect(invalidElement).toBeTruthy();
    expect(invalidStyleProp).toBeTruthy();
  });

  it("forwards refs to the native element", () => {
    const ref = createRef<HTMLElement>();

    render(
      <Container ref={ref} as="main">
        Ref container
      </Container>,
    );

    expect(ref.current?.tagName).toBe("MAIN");
  });

  it("composes classes, refs, events, and data attributes onto a child element", async () => {
    const user = userEvent.setup();
    const containerClick = vi.fn();
    const childClick = vi.fn((event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    });

    render(
      <Container asChild onClick={containerClick} size="lg" gutter="sm">
        <RouterAnchor className="custom-child" onClick={childClick} to="/docs">
          Container child
        </RouterAnchor>
      </Container>,
    );

    const link = screen.getByRole("link", { name: "Container child" });

    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("data-slot", "container");
    expect(link).toHaveAttribute("data-as-child", "true");
    expect(link).toHaveAttribute("data-size", "lg");
    expect(link).toHaveAttribute("data-gutter", "sm");
    expect(link.className).toContain("custom-child");

    await user.click(link);

    expect(containerClick).toHaveBeenCalledTimes(1);
    expect(childClick).toHaveBeenCalledTimes(1);
  });

  it("composes matching asChild event handlers beyond click", async () => {
    const user = userEvent.setup();
    const containerFocus = vi.fn();
    const childFocus = vi.fn();

    render(
      <Container asChild onFocus={containerFocus}>
        <button onFocus={childFocus} type="button">
          Focus container child
        </button>
      </Container>,
    );

    await user.tab();

    expect(
      screen.getByRole("button", { name: "Focus container child" }),
    ).toHaveFocus();
    expect(containerFocus).toHaveBeenCalledTimes(1);
    expect(childFocus).toHaveBeenCalledTimes(1);
  });
});
