import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  fieldClassNames,
} from ".";

describe("Field", () => {
  it("renders a structural field with safe defaults", () => {
    render(
      <Field>
        <FieldLabel>Workspace name</FieldLabel>
        <FieldControl asChild>
          <input />
        </FieldControl>
      </Field>,
    );

    const field = screen.getByText("Workspace name").closest('[data-slot="field"]');
    const input = screen.getByLabelText("Workspace name");

    expect(field).toHaveAttribute("data-slot", "field");
    expect(field).toHaveAttribute("data-orientation", "vertical");
    expect(field).not.toHaveAttribute("role");
    expect(field).not.toHaveAttribute("tabindex");
    expect(input).toHaveAttribute("data-slot", "field-control");
    expect(input.id).toBeTruthy();
  });

  it("uses explicit IDs for label and control association", async () => {
    const user = userEvent.setup();

    render(
      <Field id="workspace-slug">
        <FieldLabel>Workspace slug</FieldLabel>
        <FieldControl asChild>
          <input id="ignored-child-id" />
        </FieldControl>
      </Field>,
    );

    const label = screen.getByText("Workspace slug");
    const input = screen.getByLabelText("Workspace slug");

    expect(label).toHaveAttribute("for", "workspace-slug");
    expect(input).toHaveAttribute("id", "workspace-slug");

    await user.click(label);

    expect(input).toHaveFocus();
  });

  it("composes description and error relationships for invalid controls", async () => {
    render(
      <Field id="email" invalid required>
        <FieldLabel>Email</FieldLabel>
        <FieldControl asChild>
          <input type="email" aria-describedby="existing-help" />
        </FieldControl>
        <FieldDescription id="email-help">Use your work email.</FieldDescription>
        <FieldError id="email-error">Enter a valid email address.</FieldError>
      </Field>,
    );

    const input = screen.getByLabelText(/Email/);

    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");

    await waitFor(() => {
      expect(input).toHaveAttribute(
        "aria-describedby",
        "existing-help email-help email-error",
      );
    });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-errormessage", "email-error");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(screen.getByText("Enter a valid email address.")).toHaveAttribute(
      "data-invalid",
      "true",
    );
  });

  it("does not reference visible errors while the field is valid", async () => {
    render(
      <Field id="project">
        <FieldLabel>Project</FieldLabel>
        <FieldControl asChild>
          <input />
        </FieldControl>
        <FieldDescription id="project-help">Pick an active project.</FieldDescription>
        <FieldError id="project-error">Project is required.</FieldError>
      </Field>,
    );

    const input = screen.getByLabelText("Project");

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-describedby", "project-help");
    });

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-errormessage");
    expect(input).not.toHaveAttribute("aria-describedby", "project-error");
  });

  it("propagates disabled, required, and read-only state", () => {
    render(
      <Field id="review-note" disabled required readOnly>
        <FieldLabel>Review note</FieldLabel>
        <FieldControl asChild>
          <input />
        </FieldControl>
      </Field>,
    );

    const field = screen.getByText("Review note").closest('[data-slot="field"]');
    const input = screen.getByLabelText(/Review note/);

    expect(field).toHaveAttribute("data-disabled", "true");
    expect(field).toHaveAttribute("data-required", "true");
    expect(field).toHaveAttribute("data-readonly", "true");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveAttribute("data-disabled", "true");
    expect(input).toHaveAttribute("data-required", "true");
    expect(input).toHaveAttribute("data-readonly", "true");
  });

  it("renders error lists from form-library shaped errors", () => {
    render(
      <Field id="name" invalid>
        <FieldLabel>Name</FieldLabel>
        <FieldControl asChild>
          <input />
        </FieldControl>
        <FieldError
          errors={[
            { message: "Name is required." },
            { message: "Name must be under 80 characters." },
          ]}
        />
      </Field>,
    );

    expect(screen.getByText("Name is required.").closest("li")).not.toBeNull();
    expect(
      screen.getByText("Name must be under 80 characters.").closest("li"),
    ).not.toBeNull();
  });

  it("composes consumer classes and forwards refs", () => {
    const fieldRef = createRef<HTMLElement>();
    const controlRef = createRef<HTMLInputElement>();

    render(
      <Field ref={fieldRef} id="team" className="custom-field">
        <FieldLabel>Team</FieldLabel>
        <FieldControl ref={controlRef} asChild className="custom-control">
          <input className="consumer-control" />
        </FieldControl>
      </Field>,
    );

    const input = screen.getByLabelText("Team");

    expect(fieldClassNames({ className: "custom-field" })).toContain(
      "custom-field",
    );
    expect(fieldRef.current).toHaveAttribute("data-slot", "field");
    expect(controlRef.current).toBe(input);
    expect(input).toHaveClass("custom-control", "consumer-control");
  });

  it("rejects asChild usage without a direct element child", () => {
    const invalidChild = "Text" as never;

    expect(() =>
      render(
        <FieldControl asChild>
          {invalidChild}
        </FieldControl>,
      ),
    ).toThrow("FieldControl with asChild expects a single React element child.");
  });
});
