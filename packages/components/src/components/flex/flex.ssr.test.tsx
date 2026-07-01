import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Flex, FlexItem } from ".";

describe("Flex SSR", () => {
  it("renders Flex and FlexItem markup on the server", () => {
    expect(renderToString(<Flex as="section">Server flex</Flex>)).toContain(
      'data-slot="flex"',
    );
    expect(renderToString(<FlexItem grow="1">Server item</FlexItem>)).toContain(
      'data-slot="flex-item"',
    );
    expect(
      renderToString(
        <Flex asChild gap="4">
          <a href="/docs">Docs</a>
        </Flex>,
      ),
    ).toContain("<a");
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <Flex as="section" gap="4" justify="between" wrap="wrap">
        <FlexItem grow="1" minInlineSize="0">
          Hydrate flex
        </FlexItem>
      </Flex>,
    );

    await act(async () => {
      hydrateRoot(
        container,
        <Flex as="section" gap="4" justify="between" wrap="wrap">
          <FlexItem grow="1" minInlineSize="0">
            Hydrate flex
          </FlexItem>
        </Flex>,
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
