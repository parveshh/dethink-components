import {
  Button as AriaButton,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  Heading,
  I18nProvider,
  Label,
  Popover,
  Text,
  type DatePickerRenderProps,
} from "react-aria-components";
import {
  forwardRef,
  type ReactNode,
  useRef,
} from "react";
import type { DateValue } from "@internationalized/date";
import { cn } from "../../utils/cn";
import {
  getDateTimePickerPlaceholderValue,
  getDateTimePickerTimeZone,
  serializeDateTimePickerValue,
  type DateTimePickerGranularity,
  type DateTimePickerValue,
  type DateTimePickerWeekStartsOn,
} from "./date-time-picker-utils";

export type {
  DateTimePickerGranularity,
  DateTimePickerValue,
  DateTimePickerWeekStartsOn,
} from "./date-time-picker-utils";

export type DateTimePickerPreset = {
  label: ReactNode;
  value: DateTimePickerValue;
};

export interface DateTimePickerProps {
  value?: DateTimePickerValue | null;
  defaultValue?: DateTimePickerValue | null;
  onValueChange?: (value: DateTimePickerValue | null) => void;
  className?: string;
  id?: string;
  name?: string;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  locale?: string;
  timeZone?: string;
  hideTimeZone?: boolean;
  granularity?: DateTimePickerGranularity;
  hourCycle?: 12 | 24;
  weekStartsOn?: DateTimePickerWeekStartsOn;
  presets?: DateTimePickerPreset[];
  clearable?: boolean;
}

const dateTimePickerRootClasses =
  "group/date-time-picker grid w-full max-w-md gap-2 text-foreground";

const dateTimePickerLabelClasses =
  "text-sm font-medium leading-none text-foreground data-[disabled=true]:opacity-60";

const dateTimePickerControlClasses =
  "flex min-h-density-control items-center rounded-md border border-input bg-background text-sm text-foreground shadow-sm motion-safe:transition-[border-color,box-shadow,background-color] motion-safe:duration-150 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60 data-[focus-within=true]:border-ring data-[focus-within=true]:ring-2 data-[focus-within=true]:ring-ring/20 data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive/15";

const dateTimePickerInputClasses =
  "flex min-w-0 flex-1 items-center gap-0.5 px-3 py-2";

const dateTimePickerSegmentClasses =
  "rounded-sm px-0.5 tabular-nums outline-none motion-safe:transition-colors motion-safe:duration-150 data-[focused]:bg-primary data-[focused]:text-primary-foreground data-[placeholder]:text-muted-foreground data-[disabled]:text-muted-foreground data-[readonly]:text-muted-foreground data-[invalid]:text-destructive";

const dateTimePickerClearButtonClasses =
  "me-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground motion-safe:transition-[background-color,color,transform] motion-safe:duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-40";

const dateTimePickerTriggerButtonClasses =
  "me-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground motion-safe:transition-[background-color,color,transform] motion-safe:duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-40 data-[pressed]:bg-muted data-[pressed]:text-foreground";

const dateTimePickerPopoverClasses =
  "z-50 rounded-md border border-border bg-background p-3 text-foreground shadow-lg outline-none motion-safe:transition-[opacity,transform] motion-safe:duration-150 data-[entering]:opacity-100 data-[exiting]:translate-y-1 data-[exiting]:opacity-0";

const dateTimePickerDialogClasses = "grid gap-3 outline-none";

const dateTimePickerCalendarClasses = "grid gap-3";

const dateTimePickerCalendarHeaderClasses =
  "flex items-center justify-between gap-2";

const dateTimePickerCalendarHeadingClasses =
  "min-w-40 text-center text-sm font-medium text-foreground";

const dateTimePickerCalendarButtonClasses =
  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground motion-safe:transition-[background-color,color,transform] motion-safe:duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-40";

const dateTimePickerCalendarGridClasses =
  "w-full border-separate border-spacing-1 text-sm";

const dateTimePickerCalendarHeaderCellClasses =
  "size-8 text-center text-xs font-medium text-muted-foreground";

const dateTimePickerCalendarCellClasses =
  "size-8 rounded-md text-center text-sm tabular-nums outline-none motion-safe:transition-[background-color,color,box-shadow,transform] motion-safe:duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-35 data-[focused]:ring-2 data-[focused]:ring-ring data-[invalid]:text-destructive data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 data-[pressed]:scale-95 data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[today]:font-semibold data-[unavailable]:text-destructive data-[unavailable]:line-through";

const dateTimePickerPresetsClasses =
  "grid gap-1 border-b border-border pb-3 sm:grid-cols-2";

const dateTimePickerPresetButtonClasses =
  "rounded-md border border-border bg-background px-3 py-2 text-left text-sm text-foreground shadow-sm motion-safe:transition-[background-color,border-color,box-shadow,transform] motion-safe:duration-150 hover:border-ring/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const dateTimePickerHelpClasses = "text-xs leading-5 text-muted-foreground";

const dateTimePickerErrorClasses = "text-xs leading-5 text-destructive";

const dateTimePickerTimezoneClasses =
  "text-xs font-medium leading-5 text-muted-foreground";

function getRootRenderClasses(
  renderProps: DatePickerRenderProps,
  className: string | undefined,
) {
  return cn(dateTimePickerRootClasses, className);
}

function ClearIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="m4.5 4.5 7 7m0-7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M4.5 2.5v2m7-2v2M3 6.5h10M3.5 4h9A1.5 1.5 0 0 1 14 5.5v7A1.5 1.5 0 0 1 12.5 14h-9A1.5 1.5 0 0 1 2 12.5v-7A1.5 1.5 0 0 1 3.5 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="m9.5 4-4 4 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="m6.5 4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      className,
      clearable = false,
      defaultValue,
      description,
      disabled = false,
      errorMessage,
      granularity = "minute",
      hideTimeZone = false,
      hourCycle,
      id,
      invalid = false,
      isDateUnavailable,
      label,
      locale,
      maxValue,
      minValue,
      name,
      onValueChange,
      presets = [],
      readOnly = false,
      required = false,
      timeZone,
      value,
      weekStartsOn,
    },
    ref,
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const picker = (
      <AriaDatePicker<DateTimePickerValue>
        ref={ref}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onValueChange}
        isDisabled={disabled}
        isReadOnly={readOnly}
        isRequired={required}
        isInvalid={invalid}
        minValue={minValue}
        maxValue={maxValue}
        isDateUnavailable={isDateUnavailable}
        granularity={granularity}
        hourCycle={hourCycle}
        hideTimeZone={hideTimeZone}
        firstDayOfWeek={weekStartsOn}
        placeholderValue={getDateTimePickerPlaceholderValue({
          defaultValue,
          timeZone,
          value,
        })}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            queueMicrotask(() => triggerRef.current?.focus());
          }
        }}
        validationBehavior="aria"
        data-slot="date-time-picker"
        data-granularity={granularity}
        className={(renderProps) => getRootRenderClasses(renderProps, className)}
      >
        {({ state, isDisabled, isFocusWithin, isInvalid, isReadOnly }) => {
          const timeZoneLabel = hideTimeZone
            ? null
            : getDateTimePickerTimeZone(state.value, timeZone);
          const canClear = clearable && Boolean(state.value);

          return (
            <>
              {label ? (
                <Label
                  data-slot="date-time-picker-label"
                  data-disabled={isDisabled ? "true" : undefined}
                  className={dateTimePickerLabelClasses}
                >
                  {label}
                  {required ? <span aria-hidden="true"> *</span> : null}
                </Label>
              ) : null}
              <Group
                data-slot="date-time-picker-field"
                data-disabled={isDisabled ? "true" : undefined}
                data-focus-within={isFocusWithin ? "true" : undefined}
                data-invalid={isInvalid ? "true" : undefined}
                className={dateTimePickerControlClasses}
              >
                <DateInput
                  data-slot="date-time-picker-input"
                  className={dateTimePickerInputClasses}
                >
                  {(segment) => (
                    <DateSegment
                      data-slot="date-time-picker-segment"
                      segment={segment}
                      className={dateTimePickerSegmentClasses}
                    />
                  )}
                </DateInput>
                {clearable ? (
                  <button
                    aria-label="Clear date and time"
                    className={dateTimePickerClearButtonClasses}
                    data-slot="date-time-picker-clear"
                    disabled={!canClear || isDisabled || isReadOnly}
                    type="button"
                    onClick={() => state.setValue(null)}
                  >
                    <ClearIcon />
                  </button>
                ) : null}
                <AriaButton
                  ref={triggerRef}
                  aria-label="Open calendar"
                  className={dateTimePickerTriggerButtonClasses}
                  data-slot="date-time-picker-trigger"
                >
                  <CalendarIcon />
                </AriaButton>
              </Group>
              {timeZoneLabel ? (
                <div
                  data-slot="date-time-picker-timezone"
                  className={dateTimePickerTimezoneClasses}
                >
                  {timeZoneLabel}
                </div>
              ) : null}
              {description ? (
                <Text
                  slot="description"
                  data-slot="date-time-picker-description"
                  className={dateTimePickerHelpClasses}
                >
                  {description}
                </Text>
              ) : null}
              {errorMessage ? (
                <FieldError
                  data-slot="date-time-picker-error"
                  className={dateTimePickerErrorClasses}
                >
                  {errorMessage}
                </FieldError>
              ) : null}
              {name ? (
                <input
                  data-slot="date-time-picker-form-value"
                  name={name}
                  readOnly
                  type="hidden"
                  value={serializeDateTimePickerValue(
                    state.value as DateTimePickerValue | null,
                  )}
                />
              ) : null}
              <Popover
                data-slot="date-time-picker-popover"
                className={dateTimePickerPopoverClasses}
              >
                <Dialog
                  data-slot="date-time-picker-dialog"
                  className={dateTimePickerDialogClasses}
                >
                  {presets.length > 0 ? (
                    <div
                      data-slot="date-time-picker-presets"
                      className={dateTimePickerPresetsClasses}
                    >
                      {presets.map((preset, index) => (
                        <button
                          className={dateTimePickerPresetButtonClasses}
                          data-slot="date-time-picker-preset"
                          disabled={isDisabled || isReadOnly}
                          key={index}
                          type="button"
                          onClick={() => {
                            state.setValue(preset.value);
                            state.close();
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  <Calendar
                    data-slot="date-time-picker-calendar"
                    className={dateTimePickerCalendarClasses}
                  >
                    <header className={dateTimePickerCalendarHeaderClasses}>
                      <AriaButton
                        slot="previous"
                        aria-label="Previous month"
                        className={dateTimePickerCalendarButtonClasses}
                        data-slot="date-time-picker-calendar-previous"
                      >
                        <ChevronLeftIcon />
                      </AriaButton>
                      <Heading
                        data-slot="date-time-picker-calendar-heading"
                        className={dateTimePickerCalendarHeadingClasses}
                      />
                      <AriaButton
                        slot="next"
                        aria-label="Next month"
                        className={dateTimePickerCalendarButtonClasses}
                        data-slot="date-time-picker-calendar-next"
                      >
                        <ChevronRightIcon />
                      </AriaButton>
                    </header>
                    <CalendarGrid
                      data-slot="date-time-picker-calendar-grid"
                      className={dateTimePickerCalendarGridClasses}
                      weekdayStyle="short"
                    >
                      <CalendarGridHeader>
                        {(day) => (
                          <CalendarHeaderCell
                            className={dateTimePickerCalendarHeaderCellClasses}
                          >
                            {day}
                          </CalendarHeaderCell>
                        )}
                      </CalendarGridHeader>
                      <CalendarGridBody>
                        {(date) => (
                          <CalendarCell
                            date={date}
                            data-slot="date-time-picker-calendar-cell"
                            className={dateTimePickerCalendarCellClasses}
                          />
                        )}
                      </CalendarGridBody>
                    </CalendarGrid>
                  </Calendar>
                </Dialog>
              </Popover>
            </>
          );
        }}
      </AriaDatePicker>
    );

    if (locale) {
      return <I18nProvider locale={locale}>{picker}</I18nProvider>;
    }

    return picker;
  },
);

DateTimePicker.displayName = "DateTimePicker";
