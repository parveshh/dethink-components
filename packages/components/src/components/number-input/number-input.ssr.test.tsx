import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../form-field";
import { NumberInput } from ".";

describe("NumberInput SSR", () => {
  it("renders native input markup on the server", () => {
    const markup = renderToString(
      <Field id="server-number-input" invalid>
        <FieldLabel>Server number input</FieldLabel>
        <FieldControl asChild>
          <NumberInput name="serverNumberInput" defaultValue="10.5" />
        </FieldControl>
        <FieldDescription>Rendered on the server.</FieldDescription>
        <FieldError>Server number input is invalid.</FieldError>
      </Field>,
    );

    expect(markup).toContain('data-slot="field-control"');
    expect(markup).toContain('name="serverNumberInput"');
    expect(markup).toContain('type="text"');
    expect(markup).toContain('inputMode="decimal"');
    expect(markup).toContain('value="10.5"');
    expect(markup).toContain(
      'aria-describedby="server-number-input-description server-number-input-error"',
    );
    expect(markup).toContain('aria-errormessage="server-number-input-error"');
    expect(markup).toContain('aria-invalid="true"');
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    const field = (
      <Field invalid>
        <FieldLabel>Hydrate number input</FieldLabel>
        <FieldControl asChild>
          <NumberInput defaultValue="25" />
        </FieldControl>
        <FieldDescription>Stable generated description.</FieldDescription>
        <FieldError>Stable generated error.</FieldError>
      </Field>
    );

    container.innerHTML = renderToString(field);

    await act(async () => {
      hydrateRoot(container, field);
    });

    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).toLowerCase().includes("hydration"),
      ),
    ).toBe(false);

    consoleError.mockRestore();
  });
});
