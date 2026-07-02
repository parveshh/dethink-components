import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Form,
} from "../form-field";
import { Input } from "../input";
import { NumberInput } from "../number-input";
import { Textarea } from "../textarea";

describe("Input controls suite SSR", () => {
  it("server-renders all native controls", () => {
    const markup = renderToString(
      <Form>
        <Field id="server-name">
          <FieldLabel>Name</FieldLabel>
          <FieldControl asChild>
            <Input name="name" defaultValue="Operations" />
          </FieldControl>
        </Field>
        <Field id="server-notes">
          <FieldLabel>Notes</FieldLabel>
          <FieldControl asChild>
            <Textarea name="notes" defaultValue="Review weekly." />
          </FieldControl>
        </Field>
        <Field id="server-quota">
          <FieldLabel>Quota</FieldLabel>
          <FieldControl asChild>
            <NumberInput name="quota" defaultValue="025" />
          </FieldControl>
          <FieldDescription>Values remain strings.</FieldDescription>
        </Field>
      </Form>,
    );

    expect(markup).toContain('name="name"');
    expect(markup).toContain("<textarea");
    expect(markup).toContain('name="quota"');
    expect(markup).toContain('inputMode="decimal"');
    expect(markup).toContain('aria-describedby="server-quota-description"');
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    const form = (
      <Form>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldControl asChild>
            <Input defaultValue="Operations" />
          </FieldControl>
        </Field>
        <Field>
          <FieldLabel>Notes</FieldLabel>
          <FieldControl asChild>
            <Textarea defaultValue="Review weekly." />
          </FieldControl>
        </Field>
        <Field>
          <FieldLabel>Quota</FieldLabel>
          <FieldControl asChild>
            <NumberInput defaultValue="025" />
          </FieldControl>
        </Field>
      </Form>
    );

    container.innerHTML = renderToString(form);

    await act(async () => {
      hydrateRoot(container, form);
    });

    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).toLowerCase().includes("hydration"),
      ),
    ).toBe(false);

    consoleError.mockRestore();
  });
});
