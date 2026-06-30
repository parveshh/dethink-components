import {
  CalendarDate,
  parseDateTime,
  parseZonedDateTime,
} from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DateTimePicker,
  DethinkProvider,
  type DateTimePickerPreset,
} from "@dethink/components";

const meta = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  args: {
    label: "Start time",
    description: "Choose a date and time.",
    clearable: true,
    granularity: "minute",
  },
  argTypes: {
    granularity: {
      control: "inline-radio",
      options: ["hour", "minute", "second"],
    },
    hourCycle: {
      control: "inline-radio",
      options: [12, 24],
    },
    value: { control: false },
    defaultValue: { control: false },
    minValue: { control: false },
    maxValue: { control: false },
    isDateUnavailable: { control: false },
    presets: { control: false },
    onValueChange: { action: "value changed" },
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const schedulingPresets: DateTimePickerPreset[] = [
  {
    label: "Today 09:00",
    value: parseDateTime("2026-06-30T09:00"),
  },
  {
    label: "Tomorrow 14:30",
    value: parseDateTime("2026-07-01T14:30"),
  },
  {
    label: "Friday 16:00",
    value: parseDateTime("2026-07-03T16:00"),
  },
  {
    label: "Monday 10:00",
    value: parseDateTime("2026-07-06T10:00"),
  },
];

export const SchedulingField: Story = {
  args: {
    defaultValue: parseDateTime("2026-06-30T09:30"),
    label: "Maintenance window",
    description: "Operations will notify affected accounts.",
    name: "maintenanceAt",
  },
  render: (args) => (
    <DethinkProvider theme="light" className="bg-background p-6">
      <DateTimePicker {...args} />
    </DethinkProvider>
  ),
};

export const TimezoneAwareEvent: Story = {
  render: () => (
    <DethinkProvider theme="dark" className="bg-background p-6">
      <DateTimePicker
        clearable
        defaultValue={parseZonedDateTime(
          "2026-07-14T18:45[America/New_York]",
        )}
        description="Displayed with the source timezone so global teams do not infer local time."
        granularity="minute"
        label="Investor briefing"
        name="briefingAt"
      />
    </DethinkProvider>
  ),
};

export const ConstraintsAndPresets: Story = {
  render: () => (
    <DethinkProvider theme="light" className="bg-background p-6">
      <DateTimePicker
        clearable
        defaultValue={parseDateTime("2026-07-02T11:00")}
        description="Weekends and July 4 are unavailable."
        isDateUnavailable={(date) =>
          date.day === 4 || date.toDate("UTC").getUTCDay() === 0
        }
        label="Deployment slot"
        maxValue={new CalendarDate(2026, 7, 10)}
        minValue={new CalendarDate(2026, 7, 1)}
        presets={schedulingPresets}
      />
    </DethinkProvider>
  ),
};

export const RequiredInvalidField: Story = {
  render: () => (
    <DethinkProvider theme="light" className="bg-background p-6">
      <DateTimePicker
        clearable
        errorMessage="Select a launch review time before saving."
        invalid
        label="Launch review"
        required
      />
    </DethinkProvider>
  ),
};

export const LocaleAndHourCycle: Story = {
  render: () => (
    <DethinkProvider theme="light" className="bg-background p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <DateTimePicker
          defaultValue={parseDateTime("2026-08-18T21:15")}
          hourCycle={12}
          label="US support handoff"
          locale="en-US"
        />
        <DateTimePicker
          defaultValue={parseDateTime("2026-08-18T21:15")}
          hourCycle={24}
          label="London support handoff"
          locale="en-GB"
        />
        <DateTimePicker
          defaultValue={parseDateTime("2026-08-18T21:15")}
          hourCycle={24}
          label="Paris support handoff"
          locale="fr-FR"
          weekStartsOn="mon"
        />
      </div>
    </DethinkProvider>
  ),
};

export const ThemeDensityAndRtl: Story = {
  render: () => (
    <div className="grid gap-5 lg:grid-cols-2">
      <DethinkProvider
        density="compact"
        theme="dark"
        className="bg-background p-6"
      >
        <DateTimePicker
          clearable
          defaultValue={parseZonedDateTime("2026-09-21T07:00[UTC]")}
          label="Compact dark"
          timeZone="UTC"
        />
      </DethinkProvider>
      <DethinkProvider
        density="comfortable"
        dir="rtl"
        theme="light"
        className="bg-background p-6"
      >
        <DateTimePicker
          clearable
          defaultValue={parseDateTime("2026-09-21T15:45")}
          hourCycle={24}
          label="RTL comfortable"
          locale="ar-AE"
          weekStartsOn="sat"
        />
      </DethinkProvider>
    </div>
  ),
};
