import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, DethinkProvider } from "@dethink/components";
import type { CSSProperties } from "react";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "solid",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline", "ghost", "link", "destructive"],
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ["solid", "soft", "outline", "ghost", "link", "destructive"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl", "icon"] as const;
const tokenOverrideStyle = {
  "--dt-color-primary": "oklch(0.52 0.16 180)",
  "--dt-color-primary-foreground": "oklch(0.98 0.02 180)",
  "--dt-color-ring": "oklch(0.7 0.18 180)",
  "--dt-radius-md": "0.125rem",
  "--dt-density-control": "3rem",
} as CSSProperties;

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M8 3v10M3 8h10" strokeLinecap="round" strokeWidth="1.75" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

export const Base: Story = {};

export const Variants: Story = {
  render: () => (
    <DethinkProvider theme="light" className="rounded-lg border border-border p-6">
      <div className="flex flex-wrap items-center gap-density-gap">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    </DethinkProvider>
  ),
};

export const Sizes: Story = {
  render: () => (
    <DethinkProvider theme="light" className="rounded-lg border border-border p-6">
      <div className="flex flex-wrap items-center gap-density-gap">
        {sizes.map((size) => (
          <Button key={size} aria-label={`Button ${size}`} size={size}>
            {size === "icon" ? "+" : size}
          </Button>
        ))}
      </div>
    </DethinkProvider>
  ),
};

export const States: Story = {
  render: () => (
    <DethinkProvider theme="light" className="rounded-lg border border-border p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Default</p>
          <Button>Save changes</Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Focus</p>
          <Button className="ring-2 ring-ring ring-offset-2 ring-offset-background">
            Save changes
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Disabled</p>
          <Button disabled>Save changes</Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Loading</p>
          <Button loading>Saving changes</Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Destructive
          </p>
          <Button variant="destructive">Delete project</Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Submit</p>
          <Button type="submit">Save project</Button>
        </div>
      </div>
    </DethinkProvider>
  ),
};

export const IconAffordances: Story = {
  render: () => (
    <DethinkProvider theme="light" className="rounded-lg border border-border p-6">
      <div className="flex flex-wrap items-center gap-density-gap">
        <Button leftIcon={<PlusIcon />}>Create project</Button>
        <Button variant="outline" rightIcon={<ArrowRightIcon />}>
          Continue
        </Button>
        <Button
          aria-label="Add project"
          size="icon"
          leftIcon={<PlusIcon />}
        />
        <Button loading leftIcon={<PlusIcon />}>
          Creating
        </Button>
      </div>
    </DethinkProvider>
  ),
};

export const Composition: Story = {
  render: () => (
    <DethinkProvider theme="light" className="rounded-lg border border-border p-6">
      <div className="flex flex-wrap items-center gap-density-gap">
        <Button asChild rightIcon={<ArrowRightIcon />}>
          <a href="/docs">Read docs</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/settings">Account settings</a>
        </Button>
        <Button asChild loading>
          <a href="/billing">Updating billing</a>
        </Button>
      </div>
    </DethinkProvider>
  ),
};

export const ThemeMatrix: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {(["light", "dark"] as const).map((theme) => (
        <DethinkProvider
          key={theme}
          theme={theme}
          className="rounded-lg border border-border p-6"
        >
          <div className="space-y-4">
            <h2 className="text-sm font-medium capitalize text-muted-foreground">
              {theme}
            </h2>
            <div className="flex flex-wrap items-center gap-density-gap">
              {variants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        </DethinkProvider>
      ))}
    </div>
  ),
};

export const DensityMatrix: Story = {
  render: () => (
    <div className="grid gap-4">
      {(["compact", "default", "comfortable"] as const).map((density) => (
        <DethinkProvider
          key={density}
          density={density}
          theme="light"
          className="rounded-lg border border-border p-6"
        >
          <div className="flex flex-wrap items-center gap-density-gap">
            <span className="min-w-24 text-sm font-medium text-muted-foreground">
              {density}
            </span>
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button leftIcon={<PlusIcon />}>Icon</Button>
          </div>
        </DethinkProvider>
      ))}
    </div>
  ),
};

export const TokenOverride: Story = {
  render: () => (
    <DethinkProvider
      theme="light"
      className="rounded-lg border border-border p-6"
      style={tokenOverrideStyle}
    >
      <div className="flex flex-wrap items-center gap-density-gap">
        <Button>Token primary</Button>
        <Button variant="soft">Token soft</Button>
        <Button variant="outline">Token outline</Button>
        <Button className="ring-2 ring-ring ring-offset-2 ring-offset-background">
          Token focus
        </Button>
      </div>
    </DethinkProvider>
  ),
};
