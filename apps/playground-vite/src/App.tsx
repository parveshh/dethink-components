import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  DateTimePicker,
  DethinkProvider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  Divider,
  Separator,
  Stack,
  Text,
} from "@dethink/components";

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path
        d="M13 4.5V1.75h-2.75M3 11.5v2.75h2.75M12.15 6A4.5 4.5 0 0 0 4.2 3.7L3 5M3.85 10A4.5 4.5 0 0 0 11.8 12.3L13 11"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function App() {
  return (
    <DethinkProvider className="min-h-screen p-8" theme="light">
      <Container as="main" size="md">
        <Stack gap="4">
          <Text size="sm" tone="muted" weight="medium">
            @dethink/components playground
          </Text>
          <Heading level={1} visualLevel={2}>
            Foundation scaffold is active
          </Heading>
          <Text tone="muted">
            This app verifies package imports, style imports, Tailwind tokens, the
            foundation provider, and the first wrapper, container, layout, action,
            navigation, typography, and date/time components.
          </Text>
          <Flex gap="2" align="center" wrap="wrap">
            <Button>Primary action</Button>
            <Button variant="outline">Secondary action</Button>
            <Button variant="ghost">Quiet action</Button>
            <Button loading>Saving</Button>
            <Button asChild rightIcon={<ArrowRightIcon />}>
              <a href="#smoke-input">Jump to input</a>
            </Button>
            <Link href="#smoke-link-target" underline="always">
              Smoke link
            </Link>
            <IconButton aria-label="Refresh playground" variant="outline">
              <RefreshIcon />
            </IconButton>
          </Flex>
          <Flex gap="3" align="center" className="rounded-lg border border-border p-3">
            <FlexItem shrink="0">
              <Text size="sm" weight="medium">
                Flex smoke
              </Text>
            </FlexItem>
            <FlexItem grow="1" minInlineSize="0">
              <Text className="truncate" size="sm" tone="muted">
                Long content can shrink inside a FlexItem without forcing row overflow.
              </Text>
            </FlexItem>
            <FlexItem shrink="0">
              <Button size="sm" variant="outline">
                Inspect
              </Button>
            </FlexItem>
          </Flex>
          <Grid columns="auto-fit-xs" gap="3">
            {["Grid smoke", "Auto-fit tracks", "Token gaps"].map((label) => (
              <GridItem key={label} minInlineSize="0">
                <Box border="default" p="3" radius="md" surface="background">
                  <Text size="sm" weight="medium">
                    {label}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
          <Separator spacing="1" />
          <Flex align="center" gap="3">
            <Text size="sm" weight="medium">
              Separator smoke
            </Text>
            <Separator as="div" orientation="vertical" decorative />
            <Text size="sm" tone="muted">
              Divider alias follows the same contract.
            </Text>
          </Flex>
          <Divider decorative spacing="1" tone="muted" />
          <Card as="section">
            <CardHeader>
              <CardTitle>Card smoke</CardTitle>
              <CardDescription>
                Verifies the package export path for Card and its anatomy slots.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" tone="muted">
                Card composes existing layout, text, and action primitives.
              </Text>
            </CardContent>
            <CardFooter justify="end">
              <Button size="sm" variant="outline">
                Inspect card
              </Button>
            </CardFooter>
          </Card>
          <Box
            border="default"
            p="4"
            radius="lg"
            surface="muted"
            className="focus-within:ring-2 focus-within:ring-ring"
          >
            <label className="block text-sm font-medium" htmlFor="smoke-input">
              Smoke input
            </label>
            <input
              id="smoke-input"
              className="mt-2 h-density-control rounded-md border border-input bg-background px-3"
              placeholder="Token-backed field"
            />
          </Box>
          <Text id="smoke-link-target" size="sm" tone="muted">
            Link smoke target reached through native anchor behavior.
          </Text>
          <DateTimePicker
            clearable
            description="Verifies the date/time registry dependency path."
            label="Smoke date and time"
            name="smokeDateTime"
          />
        </Stack>
      </Container>
    </DethinkProvider>
  );
}
