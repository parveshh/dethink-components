import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from ".";

expect.extend(toHaveNoViolations);

describe("Field accessibility", () => {
  it("has no axe violations for visible labels, descriptions, and errors", async () => {
    const { container } = render(
      <DethinkProvider theme="light">
        <main aria-label="Field accessibility smoke">
          <Field id="a11y-email" invalid required>
            <FieldLabel>Email</FieldLabel>
            <FieldControl asChild>
              <input type="email" name="email" />
            </FieldControl>
            <FieldDescription id="a11y-email-help">
              Use your work email address.
            </FieldDescription>
            <FieldError id="a11y-email-error">
              Enter a valid work email address.
            </FieldError>
          </Field>
        </main>
      </DethinkProvider>,
    );

    const input = screen.getByLabelText(/Email/);

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-errormessage", "a11y-email-error");

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
