import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import { Heading, Text } from "../typography";
import { Stack } from ".";

expect.extend(toHaveNoViolations);

describe("Stack accessibility", () => {
  it("has no axe violations for semantic stack patterns", async () => {
    const { container } = render(
      <DethinkProvider theme="light">
        <Stack as="main" aria-label="Stack accessibility smoke" gap="6">
          <Stack as="section" aria-labelledby="stack-heading" gap="3">
            <Heading id="stack-heading" level={1} visualLevel={3}>
              Account summary
            </Heading>
            <Text tone="muted">
              Stack preserves the semantic element chosen by the consumer.
            </Text>
          </Stack>
          <Stack as="ul" gap="2">
            <Stack as="li" gap="1">
              List semantics remain native.
            </Stack>
            <Stack as="li" gap="1">
              No ARIA role is added by default.
            </Stack>
          </Stack>
          <Stack as="form" aria-label="Example filter form" gap="2">
            <label htmlFor="stack-filter">Filter</label>
            <input id="stack-filter" name="filter" />
          </Stack>
        </Stack>
      </DethinkProvider>,
    );

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
