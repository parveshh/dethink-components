import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Button } from ".";

describe("Button SSR", () => {
  it("renders native and asChild markup on the server", () => {
    expect(renderToString(<Button>Server action</Button>)).toContain(
      'data-slot="button"',
    );
    expect(
      renderToString(
        <Button asChild>
          <a href="/docs">Server link</a>
        </Button>,
      ),
    ).toContain("<a");
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <Button leftIcon={<span aria-hidden="true">+</span>}>Hydrate</Button>,
    );

    await act(async () => {
      hydrateRoot(
        container,
        <Button leftIcon={<span aria-hidden="true">+</span>}>Hydrate</Button>,
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
