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
import { Textarea } from ".";

describe("Textarea SSR", () => {
  it("renders native textarea markup on the server", () => {
    const markup = renderToString(
      <Field id="server-textarea" invalid>
        <FieldLabel>Server textarea</FieldLabel>
        <FieldControl asChild>
          <Textarea name="serverTextarea" defaultValue="server" />
        </FieldControl>
        <FieldDescription>Rendered on the server.</FieldDescription>
        <FieldError>Server textarea is invalid.</FieldError>
      </Field>,
    );

    expect(markup).toContain("<textarea");
    expect(markup).toContain('data-slot="field-control"');
    expect(markup).toContain('name="serverTextarea"');
    expect(markup).toContain("server</textarea>");
    expect(markup).toContain(
      'aria-describedby="server-textarea-description server-textarea-error"',
    );
    expect(markup).toContain('aria-errormessage="server-textarea-error"');
    expect(markup).toContain('aria-invalid="true"');
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    const field = (
      <Field invalid>
        <FieldLabel>Hydrate textarea</FieldLabel>
        <FieldControl asChild>
          <Textarea defaultValue="Hydrated" />
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
