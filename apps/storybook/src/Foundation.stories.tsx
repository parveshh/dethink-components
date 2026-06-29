import type { Meta, StoryObj } from "@storybook/react-vite";
import { DethinkProvider } from "@dethink/components";

const meta = {
  title: "Foundation/DethinkProvider",
  component: DethinkProvider,
  args: {
    theme: "light",
    density: "default",
    dir: "ltr",
  },
  argTypes: {
    theme: {
      control: "inline-radio",
      options: ["light", "dark", "system"],
    },
    density: {
      control: "inline-radio",
      options: ["compact", "default", "comfortable"],
    },
    dir: {
      control: "inline-radio",
      options: ["ltr", "rtl"],
    },
  },
} satisfies Meta<typeof DethinkProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseTheme: Story = {
  render: (args) => (
    <DethinkProvider
      {...args}
      className="min-h-48 rounded-lg border border-border p-6"
    >
      <div className="space-y-density-gap">
        <h2 className="text-xl font-semibold">Dethink foundation</h2>
        <p className="text-muted-foreground">
          Token-backed Tailwind utilities drive theme, density, and focus styles.
        </p>
        <button
          type="button"
          className="h-density-control rounded-md bg-primary px-4 text-primary-foreground"
        >
          Token smoke target
        </button>
      </div>
    </DethinkProvider>
  ),
};

