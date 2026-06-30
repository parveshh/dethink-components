import {
  now,
  type CalendarDateTime,
  type DateValue,
  type ZonedDateTime,
} from "@internationalized/date";

export type DateTimePickerValue = CalendarDateTime | ZonedDateTime;

export type DateTimePickerGranularity = "hour" | "minute" | "second";

export type DateTimePickerWeekStartsOn =
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat";

export function serializeDateTimePickerValue(
  value: DateTimePickerValue | null | undefined,
) {
  return value?.toString() ?? "";
}

export function hasTimeZone(value: DateValue | null | undefined): value is ZonedDateTime {
  return Boolean(value && "timeZone" in value);
}

export function getDateTimePickerTimeZone(
  value: DateValue | null | undefined,
  timeZone: string | undefined,
) {
  if (timeZone) {
    return timeZone;
  }

  if (hasTimeZone(value)) {
    return value.timeZone;
  }

  return null;
}

export function getDateTimePickerPlaceholderValue({
  defaultValue,
  timeZone,
  value,
}: {
  defaultValue?: DateTimePickerValue | null;
  timeZone?: string;
  value?: DateTimePickerValue | null;
}) {
  if (!timeZone || value || defaultValue) {
    return undefined;
  }

  return now(timeZone);
}
