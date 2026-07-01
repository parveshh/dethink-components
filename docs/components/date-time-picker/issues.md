# DateTimePicker Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/16
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/17
- AFK foundation, value model, and field behavior: https://github.com/parveshh/dethink-components/issues/18
- AFK calendar popover, presets, and constraints: https://github.com/parveshh/dethink-components/issues/19
- AFK timezone, locale, theming, and examples: https://github.com/parveshh/dethink-components/issues/20
- AFK registry, accessibility, SSR, and verification: https://github.com/parveshh/dethink-components/issues/21

## Branch Stack

1. `codex/prd-16-date-time-picker`
2. `codex/issue-17-date-time-picker-contract-docs`
3. `codex/issue-18-date-time-picker-foundation-field`
4. `codex/issue-19-date-time-picker-calendar-presets`
5. `codex/issue-20-date-time-picker-timezone-examples`
6. `codex/issue-21-date-time-picker-registry-a11y`

The final implementation PR should target `codex/prd-16-date-time-picker` from the top issue branch after all DateTimePicker child issues are complete.

## Proposed Breakdown

1. **Title**: DateTimePicker contract and local planning docs (#17)
   **Type**: AFK
   **Blocked by**: #16
   **User stories covered**: 1-25

2. **Title**: DateTimePicker foundation, value model, and field behavior (#18)
   **Type**: AFK
   **Blocked by**: #17
   **User stories covered**: 1-6, 9, 13, 16-20, 24-25

3. **Title**: DateTimePicker calendar popover, presets, and date constraints (#19)
   **Type**: AFK
   **Blocked by**: #18
   **User stories covered**: 7-8, 11-12, 20-21

4. **Title**: DateTimePicker timezone, locale, theming, and examples (#20)
   **Type**: AFK
   **Blocked by**: #19
   **User stories covered**: 10, 14-17, 23, 25

5. **Title**: DateTimePicker registry, accessibility, SSR, and verification (#21)
   **Type**: AFK
   **Blocked by**: #20
   **User stories covered**: 18-25

## Published Issue #17

## What to build

Create the local DateTimePicker planning artifacts from the published PRD. This slice makes the component implementation-ready by capturing the public API, React Aria/@internationalized-date dependency decisions, value model, suite-foundation boundary, test seams, out-of-scope items, and stacked issue workflow.

## Acceptance criteria

- [ ] Local DateTimePicker planning docs exist and reflect the published PRD decisions.
- [ ] The docs define the `CalendarDateTime | ZonedDateTime` value model, granularity, presets, constraints, timezone display, and form submission behavior.
- [ ] The docs capture that V1 uses `react-aria-components` and `@internationalized/date`, not native `datetime-local`.
- [ ] The docs clearly mark ranges, recurrence, clock list, month/year-only picker, multi-month range preview, and scheduler behavior as out of scope.
- [ ] Testing seams are documented for value behavior, interactions, accessibility, SSR, Storybook, registry validation, and registry smoke.
- [ ] The implementation issue breakdown documents stacked branch order and references this parent PRD.

## Blocked by

- #16

## Published Issue #18

## What to build

Build the DateTimePicker foundation, value model, and segmented field behavior. This slice should add the required date/time dependencies, exported public types, controlled and uncontrolled value handling, label/description/error wiring, required/disabled/readOnly/invalid states, optional clear behavior, hidden form value through `name`, and reusable private date/time styling or utility seams.

## Acceptance criteria

- [ ] Runtime dependencies needed by DateTimePicker are added without making unrelated components pull advanced date/time behavior through registry metadata.
- [ ] Public types for DateTimePicker value, granularity, presets, and props are exported.
- [ ] Controlled and uncontrolled values work with `CalendarDateTime` and `ZonedDateTime`.
- [ ] `onValueChange` emits the selected value or `null`.
- [ ] The segmented field renders with label, description, error message, required, disabled, readOnly, and invalid states.
- [ ] `clearable` renders an accessible clear action that resets nullable values.
- [ ] `name` produces a hidden form value with a documented stable serialization.
- [ ] Render/unit tests cover the public field behavior and value model.

## Blocked by

- #17

## Published Issue #19

## What to build

Add the DateTimePicker calendar popover, preset selection, and date constraint behavior. This slice should make users able to open the picker, choose dates from an accessible calendar, apply min/max and unavailable-date rules, select optional presets, close the popover predictably, and return focus to the trigger.

## Acceptance criteria

- [ ] The calendar trigger opens and closes a popover using accessible React Aria behavior.
- [ ] Calendar selection updates the DateTimePicker value while preserving the time portion according to the selected granularity.
- [ ] `minValue`, `maxValue`, and `isDateUnavailable` prevent invalid date selection and expose disabled day semantics.
- [ ] Preset buttons render when provided and update the value through the same public change path.
- [ ] Escape closes the popover and focus returns to the trigger or field group.
- [ ] Motion and transitions respect reduced-motion expectations.
- [ ] Interaction tests cover opening, closing, date selection, constraints, presets, and focus return.

## Blocked by

- #18

## Published Issue #20

## What to build

Add DateTimePicker timezone, locale, theming, and example coverage. This slice should make timezone visibility, locale and hour-cycle behavior, RTL, density, dark mode, and docs guidance demonstrable and reusable for future date/time suite work.

## Acceptance criteria

- [ ] Timezone text is visible when a `ZonedDateTime` value or `timeZone` is provided unless `hideTimeZone` is true.
- [ ] Locale and hour-cycle examples demonstrate 12-hour and 24-hour display expectations.
- [ ] `weekStartsOn` is wired to calendar behavior where the underlying library supports it.
- [ ] Tokenized Tailwind styling covers field, segments, trigger, popover, calendar, selected day, unavailable day, preset, clear action, invalid, disabled, dark mode, density, and RTL states.
- [ ] Docs and examples explain when to use `CalendarDateTime` versus `ZonedDateTime`.
- [ ] Storybook includes scheduling, timezone-aware event time, invalid field, min/max constraints, presets, dark mode, density, RTL, and locale/hour-cycle examples.

## Blocked by

- #19

## Published Issue #21

## What to build

Complete DateTimePicker distribution, accessibility, SSR, and verification surfaces. This slice should make the component installable from the registry, covered by Storybook and playground smoke paths, verified with axe and SSR tests, and ready for the standard project verification matrix.

## Acceptance criteria

- [ ] Registry metadata includes accurate files, dependencies, devDependencies, registryDependencies, and no unrelated advanced packages.
- [ ] Playground or registry smoke coverage proves package and registry install paths include DateTimePicker correctly.
- [ ] Accessibility tests cover axe smoke, label/description/error wiring, invalid/required semantics, calendar grid keyboard behavior, disabled dates, timezone visibility, and keyboard-only operation.
- [ ] SSR tests verify server rendering and hydration without mismatch warnings.
- [ ] Registry smoke checks verify component source, dependency metadata, stable slots/data attributes, and tokenized classes.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke pass or any environment limitation is documented.

## Blocked by

- #20
