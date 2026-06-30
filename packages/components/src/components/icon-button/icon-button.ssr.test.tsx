import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from ".";

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

describe("IconButton SSR", () => {
  it("renders native button markup on the server", () => {
    expect(
      renderToString(
        <IconButton aria-label="Server action">
          <PlusIcon />
        </IconButton>,
      ),
    ).toContain('data-slot="icon-button"');
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <IconButton aria-label="Hydrate action">
        <PlusIcon />
      </IconButton>,
    );

    await act(async () => {
      hydrateRoot(
        container,
        <IconButton aria-label="Hydrate action">
          <PlusIcon />
        </IconButton>,
      );
    });

    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).toLowerCase().includes("hydration"),
      ),
    ).toBe(false);

    consoleError.mockRestore();
  });
});
