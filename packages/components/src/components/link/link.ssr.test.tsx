import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Link } from ".";

describe("Link SSR", () => {
  it("renders native and asChild anchor markup on the server", () => {
    expect(renderToString(<Link href="/docs">Server docs</Link>)).toContain(
      'data-slot="link"',
    );
    expect(
      renderToString(
        <Link asChild>
          <a href="/router">Router docs</a>
        </Link>,
      ),
    ).toContain("<a");
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <Link aria-current="page" href="/docs" variant="nav">
        Hydrate docs
      </Link>,
    );

    await act(async () => {
      hydrateRoot(
        container,
        <Link aria-current="page" href="/docs" variant="nav">
          Hydrate docs
        </Link>,
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
