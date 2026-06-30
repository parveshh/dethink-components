import { parseDateTime, parseZonedDateTime } from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateTimePicker } from ".";

describe("DateTimePicker", () => {
  it("renders a segmented field with label, description, and form value", () => {
    const { container } = render(
      <DateTimePicker
        label="Starts at"
        description="Choose the launch window."
        name="startsAt"
        value={parseDateTime("2026-01-12T09:30")}
      />,
    );

    expect(screen.getByText("Starts at")).toBeInTheDocument();
    expect(screen.getByText("Choose the launch window.")).toBeInTheDocument();
    expect(container.querySelector('[data-slot="date-time-picker"]')).toBeTruthy();
    expect(
      container.querySelectorAll('[data-slot="date-time-picker-segment"]').length,
    ).toBeGreaterThan(4);
    expect(
      container.querySelector<HTMLInputElement>(
        'input[type="hidden"][name="startsAt"]',
      ),
    ).toHaveValue("2026-01-12T09:30:00");
  });

  it("supports controlled clearing through onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DateTimePicker
        clearable
        label="Deploy at"
        value={parseDateTime("2026-02-03T14:45")}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Clear date and time" }));

    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it("updates uncontrolled form serialization when cleared", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DateTimePicker
        clearable
        defaultValue={parseDateTime("2026-03-18T10:15")}
        label="Release at"
        name="releaseAt"
      />,
    );

    const input = container.querySelector<HTMLInputElement>(
      'input[type="hidden"][name="releaseAt"]',
    );
    expect(input).toHaveValue("2026-03-18T10:15:00");

    await user.click(screen.getByRole("button", { name: "Clear date and time" }));

    expect(input).toHaveValue("");
  });

  it("renders disabled, read only, required, and invalid states", () => {
    const { container } = render(
      <DateTimePicker
        disabled
        errorMessage="Choose a valid time."
        invalid
        label="Review at"
        readOnly
        required
        value={parseDateTime("2026-04-04T11:00")}
      />,
    );

    const root = container.querySelector('[data-slot="date-time-picker"]');
    const field = container.querySelector('[data-slot="date-time-picker-field"]');

    expect(root).toHaveAttribute("data-disabled", "true");
    expect(root).toHaveAttribute("data-readonly", "true");
    expect(root).toHaveAttribute("data-required", "true");
    expect(root).toHaveAttribute("data-invalid", "true");
    expect(field).toHaveAttribute("data-disabled", "true");
    expect(field).toHaveAttribute("data-invalid", "true");
    expect(screen.getByText("Choose a valid time.")).toBeInTheDocument();
  });

  it("shows a timezone label for zoned values and configured timezones", () => {
    const { rerender } = render(
      <DateTimePicker
        label="Event time"
        value={parseZonedDateTime("2026-01-12T09:30[America/New_York]")}
      />,
    );

    expect(screen.getByText("America/New_York")).toBeInTheDocument();

    rerender(
      <DateTimePicker
        label="Event time"
        timeZone="UTC"
        value={parseDateTime("2026-01-12T09:30")}
      />,
    );

    expect(screen.getByText("UTC")).toBeInTheDocument();

    rerender(
      <DateTimePicker
        hideTimeZone
        label="Event time"
        value={parseZonedDateTime("2026-01-12T09:30[America/New_York]")}
      />,
    );

    expect(screen.queryByText("America/New_York")).not.toBeInTheDocument();
  });
});
