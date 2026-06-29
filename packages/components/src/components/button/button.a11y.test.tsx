import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import { Button, type ButtonSize, type ButtonVariant } from ".";

expect.extend(toHaveNoViolations);

const variants: ButtonVariant[] = [
  "solid",
  "soft",
  "outline",
  "ghost",
  "link",
  "destructive",
];

const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl", "icon"];

describe("Button accessibility", () => {
  it("has no axe violations for baseline variants and sizes", async () => {
    const { container } = render(
      <DethinkProvider theme="light">
        <main aria-label="Button accessibility smoke">
          <div>
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
          <div>
            {sizes.map((size) => (
              <Button key={size} aria-label={`button ${size}`} size={size}>
                {size === "icon" ? "+" : size}
              </Button>
            ))}
          </div>
          <div>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button variant="destructive">Delete project</Button>
          </div>
        </main>
      </DethinkProvider>,
    );

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
