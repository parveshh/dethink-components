import { parseDateTime } from "@internationalized/date";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { DateTimePicker } from ".";

describe("DateTimePicker SSR", () => {
  it("renders field markup on the server", () => {
    const html = renderToString(
      <DateTimePicker
        defaultValue={parseDateTime("2026-07-02T11:00")}
        label="Deployment slot"
        name="deploymentAt"
      />,
    );

    expect(html).toContain('data-slot="date-time-picker"');
    expect(html).toContain('data-slot="date-time-picker-field"');
    expect(html).toContain('name="deploymentAt"');
    expect(html).toContain("2026-07-02T11:00:00");
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const props = {
      defaultValue: parseDateTime("2026-07-02T11:00"),
      label: "Deployment slot",
      name: "deploymentAt",
    };
    const container = document.createElement("div");
    container.innerHTML = renderToString(<DateTimePicker {...props} />);

    await act(async () => {
      hydrateRoot(container, <DateTimePicker {...props} />);
    });

    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).toLowerCase().includes("hydration"),
      ),
    ).toBe(false);

    consoleError.mockRestore();
  });
});
