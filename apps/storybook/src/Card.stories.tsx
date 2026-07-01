import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  DethinkProvider,
  Flex,
  Grid,
  Link,
  Separator,
  Stack,
  Text,
  type CardBorder,
  type CardElement,
  type CardRadius,
  type CardShadow,
  type CardSpacing,
  type CardSurface,
} from "@dethink/components";
import { forwardRef, type HTMLAttributes } from "react";

const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    as: "div",
    border: "default",
    radius: "lg",
    shadow: "sm",
    spacing: "md",
    surface: "default",
  },
  argTypes: {
    as: {
      control: "inline-radio",
      options: ["div", "article", "section", "aside", "li"],
    },
    border: {
      control: "inline-radio",
      options: ["default", "muted", "none"],
    },
    radius: {
      control: "inline-radio",
      options: ["md", "lg"],
    },
    shadow: {
      control: "inline-radio",
      options: ["none", "sm", "md"],
    },
    spacing: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    surface: {
      control: "inline-radio",
      options: ["default", "muted", "transparent"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const elements: CardElement[] = ["div", "article", "section", "aside", "li"];
const surfaces: CardSurface[] = ["default", "muted", "transparent"];
const borders: CardBorder[] = ["default", "muted", "none"];
const radii: CardRadius[] = ["md", "lg"];
const shadows: CardShadow[] = ["none", "sm", "md"];
const spacings: CardSpacing[] = ["sm", "md", "lg"];

const RouterArticle = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { to: string }
>(({ to: _to, ...props }, ref) => <article ref={ref} {...props} />);
RouterArticle.displayName = "RouterArticle";

function MetricCard({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <Card as="article">
      <CardHeader>
        <CardTitle as="h3">{label}</CardTitle>
        <CardDescription>{detail}</CardDescription>
      </CardHeader>
      <CardContent>
        <Text as="p" size="xl" weight="semibold">
          {value}
        </Text>
      </CardContent>
    </Card>
  );
}

export const Base: Story = {
  render: ({ as, border, radius, shadow, spacing, surface }) => (
    <DethinkProvider theme="light" className="p-6">
      <Card
        as={as}
        border={border}
        radius={radius}
        shadow={shadow}
        spacing={spacing}
        surface={surface}
      >
        <CardHeader>
          <CardTitle>Workspace usage</CardTitle>
          <CardDescription>Track usage across your active workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text tone="muted">
            Card owns the framed surface and anatomy while content remains regular React.
          </Text>
        </CardContent>
      </Card>
    </DethinkProvider>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Card as="article">
        <CardHeader as="header">
          <CardTitle as="h2">Team workspace</CardTitle>
          <CardDescription>Members, usage, and billing state in one surface.</CardDescription>
          <CardAction>
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Stack gap="2">
            <Text size="sm">12 active members</Text>
            <Text size="sm" tone="muted">
              Invite limits reset at the start of the next billing cycle.
            </Text>
          </Stack>
        </CardContent>
        <CardFooter justify="between">
          <Text as="span" size="sm" tone="muted">
            Updated 2 minutes ago
          </Text>
          <Link href="#card-anatomy">View details</Link>
        </CardFooter>
      </Card>
    </DethinkProvider>
  ),
};

export const Variants: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Stack gap="5">
        <Grid columns="auto-fit-xs" gap="3">
          {surfaces.map((surface) => (
            <Card key={surface} surface={surface}>
              <CardHeader>
                <CardTitle as="h3">surface {surface}</CardTitle>
                <CardDescription>Token-backed surface treatment.</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </Grid>
        <Grid columns="auto-fit-xs" gap="3">
          {borders.map((border) => (
            <Card key={border} border={border}>
              <CardHeader>
                <CardTitle as="h3">border {border}</CardTitle>
                <CardDescription>Constrained border treatment.</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </Grid>
        <Grid columns="auto-fit-xs" gap="3">
          {radii.map((radius) =>
            shadows.map((shadow) => (
              <Card key={`${radius}-${shadow}`} radius={radius} shadow={shadow}>
                <CardHeader>
                  <CardTitle as="h3">
                    {radius} / {shadow}
                  </CardTitle>
                  <CardDescription>Radius and shadow stay tokenized.</CardDescription>
                </CardHeader>
              </Card>
            )),
          )}
        </Grid>
      </Stack>
    </DethinkProvider>
  ),
};

export const SpacingAndDensity: Story = {
  render: () => (
    <Grid columns="1" gap="4">
      <DethinkProvider theme="light" density="compact" className="p-6">
        <Grid columns="auto-fit-xs" gap="3">
          {spacings.map((spacing) => (
            <Card key={spacing} spacing={spacing}>
              <CardHeader>
                <CardTitle as="h3">compact {spacing}</CardTitle>
                <CardDescription>Padding reacts to density tokens.</CardDescription>
              </CardHeader>
              <CardContent>
                <Text size="sm">Compact card content remains readable.</Text>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </DethinkProvider>
      <DethinkProvider theme="light" density="comfortable" className="p-6">
        <Card spacing="md">
          <CardHeader>
            <CardTitle>comfortable density</CardTitle>
            <CardDescription>Cards inherit the provider density context.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text tone="muted">The same spacing token expands in comfortable mode.</Text>
          </CardContent>
        </Card>
      </DethinkProvider>
    </Grid>
  ),
};

export const DashboardCards: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Grid columns="auto-fit-xs" gap="3">
        <MetricCard detail="Up 12% this week" label="Requests" value="2.4M" />
        <MetricCard detail="Within target" label="Latency" value="132ms" />
        <MetricCard detail="No active incident" label="Reliability" value="99.98%" />
      </Grid>
    </DethinkProvider>
  ),
};

export const SettingsPanel: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Container size="md">
        <Card as="section">
          <CardHeader>
            <CardTitle as="h2">Notification routing</CardTitle>
            <CardDescription>Choose where operational updates are delivered.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                Test route
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Grid columns="auto-fit-xs" gap="3">
              {["Email", "Slack", "Pager"].map((label) => (
                <div key={label} className="rounded-md border border-border p-3">
                  <Text size="sm" weight="medium">
                    {label}
                  </Text>
                  <Text size="sm" tone="muted">
                    Enabled
                  </Text>
                </div>
              ))}
            </Grid>
          </CardContent>
          <CardFooter justify="end">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </Container>
    </DethinkProvider>
  ),
};

export const ResourceCards: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Grid columns="auto-fit-sm" gap="3">
        {["North America workspace", "EU billing group", "AI review queue"].map(
          (name) => (
            <Card key={name} as="article">
              <CardHeader>
                <CardTitle as="h3">{name}</CardTitle>
                <CardDescription>Production resource summary.</CardDescription>
              </CardHeader>
              <CardContent>
                <Flex align="center" gap="2" wrap="wrap">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs">Active</span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs">Healthy</span>
                </Flex>
              </CardContent>
            </Card>
          ),
        )}
      </Grid>
    </DethinkProvider>
  ),
};

export const CompositionAndAsChild: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Stack gap="4">
        <Card>
          <CardHeader>
            <CardTitle>Sectioned card</CardTitle>
            <CardDescription>Separator divides content without custom borders.</CardDescription>
          </CardHeader>
          <Separator decorative />
          <CardContent>
            <Text tone="muted">
              Card stays structural while Separator owns the static boundary.
            </Text>
          </CardContent>
        </Card>
        <Card asChild surface="muted">
          <RouterArticle to="#card-as-child">
            <CardHeader>
              <CardTitle as="h3">asChild article</CardTitle>
              <CardDescription>Compatible semantic wrappers receive Card styling.</CardDescription>
            </CardHeader>
          </RouterArticle>
        </Card>
      </Stack>
    </DethinkProvider>
  ),
};

export const ElementModes: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Grid columns="auto-fit-xs" gap="3">
        {elements.map((element) => (
          <Card key={element} as={element}>
            <CardHeader>
              <CardTitle as="h3">as {element}</CardTitle>
              <CardDescription>Card preserves the selected static element.</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </Grid>
    </DethinkProvider>
  ),
};

export const ThemeDensityAndRTL: Story = {
  render: () => (
    <Grid columns="1" gap="4">
      <DethinkProvider theme="dark" density="compact" className="bg-background p-6">
        <Card as="section" dir="rtl">
          <CardHeader>
            <CardTitle as="h2">RTL compact dark</CardTitle>
            <CardDescription>Header action uses logical inline spacing.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                Export
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Text tone="muted">Content remains readable in dark mode and RTL.</Text>
          </CardContent>
        </Card>
      </DethinkProvider>
      <DethinkProvider theme="light" density="comfortable" className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Comfortable light</CardTitle>
            <CardDescription>Density changes flow through CSS variables.</CardDescription>
          </CardHeader>
          <CardFooter justify="between">
            <Text as="span" size="sm" tone="muted">
              Ready
            </Text>
            <Button size="sm">Continue</Button>
          </CardFooter>
        </Card>
      </DethinkProvider>
    </Grid>
  ),
};
