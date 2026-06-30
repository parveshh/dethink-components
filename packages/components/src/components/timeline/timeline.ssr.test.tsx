import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Timeline, type TimelineItemData } from ".";

const items: TimelineItemData[] = [
  {
    id: "kickoff",
    title: "Kickoff",
    datetime: "2026-01-01T09:00:00Z",
    dateLabel: "Jan 1, 2026",
  },
  {
    id: "launch",
    title: "Launch",
    datetime: "2026-03-01T09:00:00Z",
    dateLabel: "Mar 1, 2026",
  },
];

describe("Timeline SSR", () => {
  it("renders semantic timeline markup on the server", () => {
    const html = renderToString(<Timeline items={items} />);

    expect(html).toContain('data-slot="timeline"');
    expect(html).toContain("<ol");
    expect(html).toContain("<time");
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    container.innerHTML = renderToString(<Timeline items={items} />);

    await act(async () => {
      hydrateRoot(container, <Timeline items={items} />);
    });

    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).toLowerCase().includes("hydration"),
      ),
    ).toBe(false);

    consoleError.mockRestore();
  });
});
