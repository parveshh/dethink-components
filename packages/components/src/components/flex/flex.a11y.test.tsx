import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import { Heading, Text } from "../typography";
import { Flex, FlexItem } from ".";

expect.extend(toHaveNoViolations);

describe("Flex accessibility", () => {
  it("has no axe violations for semantic flex patterns", async () => {
    const { container } = render(
      <DethinkProvider theme="light">
        <Flex
          as="main"
          aria-label="Flex accessibility smoke"
          direction="column"
          gap="6"
        >
          <Flex as="section" aria-labelledby="flex-heading" direction="column" gap="3">
            <Heading id="flex-heading" level={1} visualLevel={3}>
              Integration filters
            </Heading>
            <Text tone="muted">
              Flex preserves the semantic element chosen by the consumer.
            </Text>
          </Flex>
          <Flex as="ul" direction="column" gap="2">
            <FlexItem as="li">List semantics remain native.</FlexItem>
            <FlexItem as="li">No ARIA role is added by default.</FlexItem>
          </Flex>
          <Flex as="form" aria-label="Example flex filter form" gap="3" wrap="wrap">
            <FlexItem minInlineSize="0">
              <label htmlFor="flex-filter">Filter</label>
            </FlexItem>
            <FlexItem grow="1" minInlineSize="0">
              <input id="flex-filter" name="filter" />
            </FlexItem>
          </Flex>
        </Flex>
      </DethinkProvider>,
    );

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
