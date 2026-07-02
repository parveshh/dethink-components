import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState, type ReactNode, type SVGProps } from "react";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardStack,
  CardTitle,
  Container,
  DethinkProvider,
  Flex,
  Grid,
  Stack,
  Text,
  type CardStackMode,
} from "@dethink/components";

const meta = {
  title: "Components/CardStack",
  component: CardStack,
  args: {
    angle: 15,
    loop: true,
    mode: "stack",
    stackOffset: 8,
  },
  argTypes: {
    angle: {
      control: { max: 30, min: 0, step: 1, type: "range" },
    },
    loop: {
      control: "boolean",
    },
    mode: {
      control: "inline-radio",
      options: ["stack", "open"],
    },
    stackOffset: {
      control: { max: 32, min: 0, step: 1, type: "range" },
    },
  },
} satisfies Meta<typeof CardStack>;

export default meta;

type Story = StoryObj<typeof meta>;

const deckItems = [
  {
    description: "Review product, design, and engineering readiness for launch.",
    meta: "Today",
    title: "Launch review",
  },
  {
    description: "Confirm regions, capacity headroom, and incident owner routing.",
    meta: "Operations",
    title: "Production readiness",
  },
  {
    description: "Summarize adoption, retention, and account expansion signals.",
    meta: "Analytics",
    title: "Growth signals",
  },
  {
    description: "Collect unanswered questions before the next planning cycle.",
    meta: "Planning",
    title: "Open decisions",
  },
] as const;

function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      {...props}
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-4" />
      <path d="M12 15V8" />
      <path d="M16 15v-6" />
    </svg>
  );
}

function WorkflowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      {...props}
    >
      <path d="M7 7h10" />
      <path d="M7 12h10" />
      <path d="M7 17h6" />
      <path d="M4 7h.01" />
      <path d="M4 12h.01" />
      <path d="M4 17h.01" />
    </svg>
  );
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground"
    >
      {children}
    </span>
  );
}

function MetricsMedia() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/9] overflow-hidden border-b border-border bg-muted/40 p-5"
    >
      <div className="grid h-full grid-cols-[1fr_auto] items-end gap-4 rounded-md border border-border bg-background/90 p-4 shadow-sm">
        <div className="flex h-full items-end gap-2">
          <span className="h-1/3 w-5 rounded-t-sm bg-info/70" />
          <span className="h-1/2 w-5 rounded-t-sm bg-success/70" />
          <span className="h-2/3 w-5 rounded-t-sm bg-warning/80" />
          <span className="h-4/5 w-5 rounded-t-sm bg-primary/70" />
          <span className="h-3/5 w-5 rounded-t-sm bg-info/80" />
        </div>
        <div className="flex h-full w-24 flex-col justify-between py-1">
          <span className="h-2 rounded-full bg-muted" />
          <span className="h-2 w-5/6 rounded-full bg-muted" />
          <span className="h-2 w-2/3 rounded-full bg-muted" />
          <span className="h-2 w-3/4 rounded-full bg-primary/20" />
        </div>
      </div>
    </div>
  );
}

function LaunchTasksMedia() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/9] overflow-hidden border-b border-border bg-muted/40 p-5"
    >
      <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-4 rounded-md border border-border bg-background/90 p-4 shadow-sm">
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-3 py-2">
            <span className="size-2.5 rounded-full bg-success" />
            <span className="h-2 flex-1 rounded-full bg-success/30" />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-info/30 bg-info/10 px-3 py-2">
            <span className="size-2.5 rounded-full bg-info" />
            <span className="h-2 w-2/3 rounded-full bg-info/30" />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-warning/40 bg-warning/10 px-3 py-2">
            <span className="size-2.5 rounded-full bg-warning" />
            <span className="h-2 w-3/4 rounded-full bg-warning/40" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2 rounded-md bg-muted/70 p-2">
            <span className="h-2 rounded-full bg-primary/20" />
            <span className="h-10 rounded-md border border-border bg-background" />
            <span className="h-8 rounded-md border border-border bg-background" />
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-muted/70 p-2">
            <span className="h-2 rounded-full bg-primary/30" />
            <span className="h-8 rounded-md border border-info/30 bg-info/10" />
            <span className="h-10 rounded-md border border-border bg-background" />
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-muted/70 p-2">
            <span className="h-2 rounded-full bg-primary/40" />
            <span className="h-12 rounded-md border border-success/30 bg-success/10" />
            <span className="h-6 rounded-md border border-border bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
}

function createDeckCard({
  description,
  meta,
  title,
}: {
  description: string;
  meta: string;
  title: string;
}) {
  return (
    <Card key={title} as="article">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            {meta}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Stack gap="2">
          <div aria-hidden="true" className="h-2 rounded-full bg-muted">
            <div className="h-2 w-2/3 rounded-full bg-primary" />
          </div>
          <Text size="sm" tone="muted">
            Active cards keep nested controls available while inactive cards remain inert.
          </Text>
        </Stack>
      </CardContent>
      <CardFooter justify="end">
        <Button size="sm" variant="outline">
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}

function CardStackExample({
  angle,
  loop,
  mode,
  stackOffset,
}: {
  angle?: number;
  loop?: boolean;
  mode?: CardStackMode;
  stackOffset?: number;
}) {
  return (
    <CardStack angle={angle} loop={loop} mode={mode} stackOffset={stackOffset}>
      {deckItems.map((item) => (
        createDeckCard(item)
      ))}
    </CardStack>
  );
}

export const BaseStack: Story = {
  render: ({ angle, loop, mode, stackOffset }) => (
    <DethinkProvider theme="light" className="p-6">
      <Container size="sm">
        <CardStackExample
          angle={angle}
          loop={loop}
          mode={mode}
          stackOffset={stackOffset}
        />
      </Container>
    </DethinkProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stack = canvas.getByRole("group", { name: "Card stack" });

    await expect(stack).toHaveAttribute("data-active-index", "0");

    await userEvent.click(canvas.getByRole("button", { name: "Show next card" }));
    await expect(stack).toHaveAttribute("data-active-index", "1");

    stack.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(stack).toHaveAttribute("data-active-index", "2");

    await userEvent.click(canvas.getByRole("button", { name: "Show previous card" }));
    await expect(stack).toHaveAttribute("data-active-index", "1");
  },
};

export const OpenFan: Story = {
  args: {
    angle: 15,
    mode: "open",
  },

  render: ({ angle, loop, mode, stackOffset }) => (
    <DethinkProvider theme="light" className="p-6">
      <Container size="md">
        <CardStack
          angle={angle}
          loop={loop}
          mode={mode}
          stackOffset={stackOffset}
        >
          {deckItems.map((item) => (
            createDeckCard(item)
          ))}
        </CardStack>
      </Container>
    </DethinkProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stack = canvas.getByRole("group", { name: "Card stack" });
    const secondCardItem = canvas
      .getByText("Production readiness")
      .closest('[data-slot="card-stack-item"]');

    await expect(stack).toHaveAttribute("data-active-index", "0");
    await expect(secondCardItem).not.toBeNull();

    await userEvent.click(secondCardItem as HTMLElement);

    await expect(stack).toHaveAttribute("data-active-index", "1");
  },
};

export const AngleTuning: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Grid columns="auto-fit-sm" gap="5">
        {[10, 20, 30].map((angle) => (
          <Stack key={angle} gap="3">
            <Text size="sm" weight="medium">
              {angle} degrees
            </Text>
            <CardStack mode="open" angle={angle}>
              {deckItems.slice(0, 3).map((item) => (
                createDeckCard(item)
              ))}
            </CardStack>
          </Stack>
        ))}
      </Grid>
    </DethinkProvider>
  ),
};

export const ControlledActiveIndex: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(1);

    return (
      <DethinkProvider theme="light" className="p-6">
        <Container size="sm">
          <Stack gap="4">
            <Flex align="center" gap="2" wrap="wrap">
              {deckItems.map((item, index) => (
                <Button
                  key={item.title}
                  size="sm"
                  variant={index === activeIndex ? "solid" : "outline"}
                  onClick={() => setActiveIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </Flex>
            <CardStack
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            >
              {deckItems.map((item) => (
                createDeckCard(item)
              ))}
            </CardStack>
          </Stack>
        </Container>
      </DethinkProvider>
    );
  },
};

export const MediaAndIconCards: Story = {
  render: () => (
    <DethinkProvider theme="light" className="p-6">
      <Container size="md">
        <CardStack mode="open" angle={15}>
          <Card as="article">
            <LaunchTasksMedia />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <IconFrame>
                  <WorkflowIcon className="size-4" />
                </IconFrame>
                Launch tasks
              </CardTitle>
              <CardDescription>Media stays regular Card content inside the deck.</CardDescription>
            </CardHeader>
          </Card>
          <Card as="article">
            <MetricsMedia />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <IconFrame>
                  <ChartIcon className="size-4" />
                </IconFrame>
                Metrics review
              </CardTitle>
              <CardDescription>Header icons remain decorative and inert when behind.</CardDescription>
            </CardHeader>
          </Card>
          {createDeckCard({
            description: "Confirm handoff notes and incident-response owners.",
            meta: "Owners",
            title: "Team handoff",
          })}
        </CardStack>
      </Container>
    </DethinkProvider>
  ),
};

export const ThemeDensityAndRTL: Story = {
  render: () => (
    <Grid columns="1" gap="4">
      <DethinkProvider theme="dark" density="compact" className="bg-background p-6">
        <Container size="sm">
          <CardStack dir="rtl" loop={false}>
            {deckItems.slice(0, 3).map((item) => (
              createDeckCard(item)
            ))}
          </CardStack>
        </Container>
      </DethinkProvider>
      <DethinkProvider theme="light" density="comfortable" className="p-6">
        <Container size="sm">
          <CardStack mode="open" angle={20}>
            {deckItems.slice(0, 3).map((item) => (
              createDeckCard(item)
            ))}
          </CardStack>
        </Container>
      </DethinkProvider>
    </Grid>
  ),
};
