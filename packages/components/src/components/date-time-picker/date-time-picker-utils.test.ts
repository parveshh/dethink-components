import { parseDateTime, parseZonedDateTime } from "@internationalized/date";
import { describe, expect, it } from "vitest";
import {
  getDateTimePickerPlaceholderValue,
  getDateTimePickerTimeZone,
  hasTimeZone,
  serializeDateTimePickerValue,
} from ".";

describe("DateTimePicker utilities", () => {
  it("serializes empty, local, and zoned values", () => {
    expect(serializeDateTimePickerValue(null)).toBe("");
    expect(serializeDateTimePickerValue(undefined)).toBe("");
    expect(serializeDateTimePickerValue(parseDateTime("2026-01-12T09:30"))).toBe(
      "2026-01-12T09:30:00",
    );
    expect(
      serializeDateTimePickerValue(
        parseZonedDateTime("2026-01-12T09:30[America/New_York]"),
      ),
    ).toBe("2026-01-12T09:30:00-05:00[America/New_York]");
  });

  it("detects and resolves timezone labels", () => {
    const localValue = parseDateTime("2026-01-12T09:30");
    const zonedValue = parseZonedDateTime("2026-01-12T09:30[Europe/London]");

    expect(hasTimeZone(localValue)).toBe(false);
    expect(hasTimeZone(zonedValue)).toBe(true);
    expect(getDateTimePickerTimeZone(localValue, undefined)).toBeNull();
    expect(getDateTimePickerTimeZone(zonedValue, undefined)).toBe("Europe/London");
    expect(getDateTimePickerTimeZone(localValue, "UTC")).toBe("UTC");
  });

  it("uses a zoned placeholder only when a timezone is configured without a value", () => {
    expect(
      getDateTimePickerPlaceholderValue({
        timeZone: "UTC",
        value: parseDateTime("2026-01-12T09:30"),
      }),
    ).toBeUndefined();
    expect(
      getDateTimePickerPlaceholderValue({
        defaultValue: parseDateTime("2026-01-12T09:30"),
        timeZone: "UTC",
      }),
    ).toBeUndefined();
    expect(
      getDateTimePickerPlaceholderValue({
        timeZone: "UTC",
      })?.timeZone,
    ).toBe("UTC");
  });
});
