import {
  CalendarDate,
  parseDateTime,
  parseZonedDateTime,
} from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateTimePicker } from ".";

function getCalendarCell(grid: HTMLElement, day: string) {
  return Array.from(
    grid.querySelectorAll<HTMLElement>(
      '[data-slot="date-time-picker-calendar-cell"]',
    ),
  ).find((cell) => cell.textContent === day);
}

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

  it("opens the calendar popover from the trigger", async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Starts at"
        value={parseDateTime("2026-01-12T09:30")}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Open calendar/ }));

    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getAllByText(/January 2026/).length).toBeGreaterThan(0);
  });

  it("selects calendar dates while preserving the time portion", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DateTimePicker
        label="Starts at"
        value={parseDateTime("2026-01-12T09:30")}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Open calendar/ }));
    const grid = screen.getByRole("grid");
    const day13 = getCalendarCell(grid, "13");

    expect(day13).toBeTruthy();

    await user.click(day13!);

    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({
        day: 13,
        hour: 9,
        minute: 30,
      }),
    );
  });

  it("renders constrained and unavailable calendar dates", async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Starts at"
        minValue={new CalendarDate(2026, 1, 10)}
        maxValue={new CalendarDate(2026, 1, 20)}
        value={parseDateTime("2026-01-12T09:30")}
        isDateUnavailable={(date) => date.day === 15}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Open calendar/ }));

    const grid = screen.getByRole("grid");
    const day9 = getCalendarCell(grid, "9");
    const day15 = getCalendarCell(grid, "15");

    expect(day9).toHaveAttribute("data-disabled", "true");
    expect(day15).toHaveAttribute("data-unavailable", "true");
  });

  it("applies presets through the same value change path", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const presetValue = parseDateTime("2026-01-15T08:00");

    render(
      <DateTimePicker
        label="Starts at"
        value={parseDateTime("2026-01-12T09:30")}
        onValueChange={onValueChange}
        presets={[
          {
            label: "Tomorrow morning",
            value: presetValue,
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Open calendar/ }));
    await user.click(screen.getByRole("button", { name: "Tomorrow morning" }));

    expect(onValueChange).toHaveBeenCalledWith(presetValue);
  });

  it("closes the popover with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Starts at"
        value={parseDateTime("2026-01-12T09:30")}
      />,
    );

    const trigger = screen.getByRole("button", { name: /Open calendar/ });

    await user.click(trigger);
    expect(screen.getByRole("grid")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
