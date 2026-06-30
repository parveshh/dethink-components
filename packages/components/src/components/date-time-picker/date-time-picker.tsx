import {
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  FieldError,
  Group,
  I18nProvider,
  Label,
  Text,
  type DatePickerRenderProps,
} from "react-aria-components";
import {
  forwardRef,
  type ReactNode,
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
      readOnly = false,
      required = false,
      timeZone,
      value,
      weekStartsOn,
    },
    ref,
  ) => {
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
