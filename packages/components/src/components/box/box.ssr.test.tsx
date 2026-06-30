import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Box } from ".";

describe("Box SSR", () => {
  it("renders native and asChild markup on the server", () => {
    expect(renderToString(<Box as="section">Server box</Box>)).toContain(
      'data-slot="box"',
    );
    expect(
      renderToString(
        <Box asChild p="4">
          <a href="/docs">Docs</a>
        </Box>,
      ),
    ).toContain("<a");
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <Box as="section" border="default" p="4" radius="md" surface="muted">
        Hydrate box
      </Box>,
    );

    await act(async () => {
      hydrateRoot(
        container,
        <Box as="section" border="default" p="4" radius="md" surface="muted">
          Hydrate box
        </Box>,
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
