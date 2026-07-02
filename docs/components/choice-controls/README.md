# Choice Controls

Choice controls provide the native selection layer for Dethink forms:

- `Checkbox` for boolean and indeterminate choices.
- `RadioGroup` and `RadioGroupItem` for one choice from a set.
- `Switch` for binary on/off settings.

These controls are intentionally native-input-backed. They preserve browser
form behavior, forward refs to the native input, compose classes, expose stable
data attributes, and rely on Form and Field primitives for labels,
descriptions, errors, required markers, fieldsets, legends, and group
semantics.

## Installation

Registry consumers should be able to install each primitive independently:

- `checkbox`
- `radio-group`
- `switch`

Each registry item should depend on `dethink-base` and add no runtime
dependencies. Form examples may also install `form-field`.

Use the package export path when consuming the library directly:

```tsx
import {
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@dethink/components";
```

The public package surface includes:

- `Checkbox`, `CheckboxProps`, `CheckboxCheckedState`, `CheckboxControlSize`,
  and `checkboxClassNames`.
- `RadioGroup`, `RadioGroupItem`, `RadioGroupProps`, `RadioGroupItemProps`,
  `RadioGroupControlSize`, `RadioGroupOrientation`, `radioGroupClassNames`,
  and `radioGroupItemClassNames`.
- `Switch`, `SwitchProps`, `SwitchControlSize`, and `switchClassNames`.

## Native-First Usage

Use the controls with visible labels in plain forms when the surrounding app
owns label and description markup:

```tsx
<Checkbox id="marketing" name="marketing" />
<label htmlFor="marketing">Email product updates</label>
```

For Dethink forms, compose them through `FieldControl`:

```tsx
<Field id="marketing" orientation="horizontal">
  <FieldControl asChild>
    <Checkbox name="marketing" value="yes" />
  </FieldControl>
  <FieldLabel>Email product updates</FieldLabel>
</Field>
```

`FieldControl` owns the label, description, error, invalid, required, disabled,
and read-only accessibility wiring. Choice controls should not duplicate that
API.

## Checkbox Groups

Use existing FormField grouping primitives for multiple checkboxes:

```tsx
<FieldSet>
  <FieldLegend variant="label">Notifications</FieldLegend>
  <FieldGroup data-slot="checkbox-group">
    <Field id="comments" orientation="horizontal">
      <FieldControl asChild>
        <Checkbox name="notifications" value="comments" />
      </FieldControl>
      <FieldLabel>Comments</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

V1 does not include a value-managing `CheckboxGroup`.

## Checkbox State

`Checkbox` accepts `checked`, `defaultChecked`, and `onCheckedChange`.
Checked state can be `true`, `false`, or `"indeterminate"`.

Indeterminate state is exposed through `aria-checked="mixed"` and the native
`indeterminate` input property. It is a visual and accessibility state, not a
third submitted form value. Use a real checked checkbox or separate hidden
field when an app needs to submit a partial-selection marker.

## RadioGroup Value

`RadioGroup` owns the shared `name`, `value`, `defaultValue`, `onValueChange`,
`orientation`, `disabled`, `readOnly`, `invalid`, and `required` state for its
items. `RadioGroupItem` renders a native radio input for each option.

Use controlled `value` when app state owns the selection. Use `defaultValue`
for native form flows where the browser can submit the selected value.

## Switch Boundaries

Use `Switch` when on/off semantics are clearer than checked/unchecked
semantics. Keep the visible label stable when state changes.

```tsx
<Field id="two-factor" orientation="horizontal">
  <FieldContent>
    <FieldLabel>Multi-factor authentication</FieldLabel>
    <FieldDescription>Require a second verification step.</FieldDescription>
  </FieldContent>
  <FieldControl asChild>
    <Switch name="twoFactor" />
  </FieldControl>
</Field>
```

`Switch` is binary-only and does not support indeterminate state.

`Switch` accepts boolean `checked`, `defaultChecked`, and `onCheckedChange`
values. It renders a native checkbox input with `role="switch"` so forms keep
normal checkbox submission behavior while assistive technology receives on/off
semantics.

## Accessibility

- Preserve native input semantics and form behavior.
- Provide visible labels for every control.
- Use `FieldSet` and `FieldLegend` for grouped choices.
- Expose Checkbox mixed state with `aria-checked="mixed"` and the native
  `indeterminate` property.
- Use stable labels for switches; do not change label text from "Enable" to
  "Disable" based on checked state.
- Invalid state can be driven by FormField, `aria-invalid="true"`, or an
  explicit `invalid` prop.

## Theming

Choice controls should use Tailwind CSS v4 utilities, Dethink semantic tokens,
density variables, logical spacing, focus-visible styles, dark mode, RTL-safe
layout, and stable data attributes:

- `data-slot`
- `data-size`
- `data-state`
- `data-checked`
- `data-indeterminate`
- `data-invalid`
- `data-disabled`
- `data-readonly`
- `data-required`
- `data-orientation` for RadioGroup

## Testing

The suite should be verified with:

- Component typecheck.
- Focused render, a11y, and SSR tests for each control.
- Suite-level FormField and grouped choice smoke tests.
- Storybook typecheck/build.
- Playground build.
- Registry validation and smoke.

Current suite-level coverage lives in:

- `packages/components/src/components/choice-controls/choice-controls.test.tsx`
- `packages/components/src/components/choice-controls/choice-controls.a11y.test.tsx`
- `packages/components/src/components/choice-controls/choice-controls.ssr.test.tsx`
- `apps/storybook/src/ChoiceControls.stories.tsx`

## Out Of Scope

This suite does not include CheckboxGroup value management, Select, Combobox,
Slider, ToggleGroup, SegmentedControl, validation engines, schema resolvers,
form-library adapters, permission matrices, feature flag dashboards, or settings
page blocks.
