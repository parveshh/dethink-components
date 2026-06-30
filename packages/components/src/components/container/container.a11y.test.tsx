import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import { Box } from "../box";
import { Heading, Text } from "../typography";
import { Container } from ".";

expect.extend(toHaveNoViolations);

describe("Container accessibility", () => {
  it("has no axe violations for semantic page wrapper patterns", async () => {
    const { container } = render(
      <DethinkProvider theme="light">
        <Container as="main" aria-label="Container accessibility smoke">
          <Container as="section" aria-labelledby="container-heading" size="md">
            <Heading id="container-heading" level={1} visualLevel={3}>
              Account summary
            </Heading>
            <Text tone="muted">
              Container constrains page width while preserving chosen semantics.
            </Text>
          </Container>
          <Container as="nav" aria-label="Container story navigation" size="sm">
            <Box as="ul" m="none" p="none">
              <Box as="li">Overview</Box>
              <Box as="li">Settings</Box>
            </Box>
          </Container>
        </Container>
      </DethinkProvider>,
    );

    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("does not add fake roles or tab stops by default", () => {
    render(<Container>Neutral layout wrapper</Container>);

    const container = screen.getByText("Neutral layout wrapper");

    expect(container).not.toHaveAttribute("role");
    expect(container).not.toHaveAttribute("tabindex");
  });
});
