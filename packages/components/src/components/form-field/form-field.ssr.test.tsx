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
} from ".";

describe("Field SSR", () => {
  it("renders Field markup on the server", () => {
    const markup = renderToString(
      <Field id="server-field" invalid required>
        <FieldLabel>Server field</FieldLabel>
        <FieldControl asChild>
          <input />
        </FieldControl>
        <FieldDescription>Rendered on the server.</FieldDescription>
        <FieldError>Server field is invalid.</FieldError>
      </Field>,
    );

    expect(markup).toContain('data-slot="field"');
    expect(markup).toContain('data-slot="field-label"');
    expect(markup).toContain('data-slot="field-control"');
    expect(markup).toContain('data-slot="field-description"');
    expect(markup).toContain('data-slot="field-error"');
    expect(markup).toContain('id="server-field"');
    expect(markup).toContain('aria-invalid="true"');
  });

  it("hydrates generated IDs without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    const field = (
      <Field invalid>
        <FieldLabel>Hydrate field</FieldLabel>
        <FieldControl asChild>
          <input />
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
