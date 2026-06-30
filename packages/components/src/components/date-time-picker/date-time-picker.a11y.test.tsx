import { CalendarDate, parseDateTime } from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import { DateTimePicker } from ".";

expect.extend(toHaveNoViolations);

describe("DateTimePicker accessibility", () => {
  it("has no axe violations for labeled field states", async () => {
    const { container } = render(
      <DethinkProvider theme="light">
        <form aria-label="Schedule event">
          <DateTimePicker
            clearable
            defaultValue={parseDateTime("2026-07-02T11:00")}
            description="Weekends are unavailable."
            errorMessage="Choose a weekday."
            invalid
            isDateUnavailable={(date) => date.day === 4}
            label="Deployment slot"
            maxValue={new CalendarDate(2026, 7, 10)}
            minValue={new CalendarDate(2026, 7, 1)}
            name="deploymentAt"
            required
          />
        </form>
      </DethinkProvider>,
    );

    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("has no axe violations when the calendar popover is open", async () => {
    const user = userEvent.setup();
    render(
      <DethinkProvider theme="light">
        <DateTimePicker
          defaultValue={parseDateTime("2026-07-02T11:00")}
          label="Deployment slot"
        />
      </DethinkProvider>,
    );

    await user.click(screen.getByRole("button", { name: /Open calendar/ }));

    await expect(axe(document.body)).resolves.toHaveNoViolations();
  });
});
