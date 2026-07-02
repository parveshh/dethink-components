import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { CardStack } from ".";

describe("CardStack SSR", () => {
  it("renders CardStack markup on the server", () => {
    const markup = renderToString(
      <CardStack mode="open" defaultActiveIndex={1}>
        <Card>
          <CardHeader>
            <CardTitle>First</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>Second</CardContent>
        </Card>
      </CardStack>,
    );

    expect(markup).toContain('data-slot="card-stack"');
    expect(markup).toContain('data-mode="open"');
    expect(markup).toContain('data-count="2"');
    expect(markup).toContain('data-active-index="1"');
    expect(markup).toContain('data-card-stack-active="true"');
    expect(markup).toContain('data-card-stack-active="false"');
  });

  it("hydrates without mismatch warnings", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const element = (
      <CardStack defaultActiveIndex={0}>
        <Card>
          <CardHeader>
            <CardTitle>Hydrate first</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>Hydrate second</CardContent>
        </Card>
      </CardStack>
    );
    const container = document.createElement("div");

    container.innerHTML = renderToString(element);

    await act(async () => {
      hydrateRoot(container, element);
    });

    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).toLowerCase().includes("hydration"),
      ),
    ).toBe(false);

    consoleError.mockRestore();
  });
});
