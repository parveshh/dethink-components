# Input Controls

Input controls provide the native text-entry layer for Dethink forms:

- `Input` for single-line text-like fields.
- `Textarea` for multiline plain-text fields.
- `NumberInput` for conservative numeric entry.

These controls are intentionally small. They preserve native form behavior,
forward refs, compose classes, expose stable data attributes, and rely on Form
and Field primitives for labels, descriptions, errors, required markers, and
group semantics.

## Installation

Registry consumers can install each primitive independently:

- `input`
- `textarea`
- `number-input`

Each registry item depends on `dethink-base` and does not add runtime
dependencies. Form examples may also install `form-field`.

## Native-First Usage

Use the controls as direct native form controls when labels and descriptions are
handled by application markup:

```tsx
<label htmlFor="workspace">Workspace</label>
<Input id="workspace" name="workspace" autoComplete="organization" />
```

For Dethink forms, compose them through `FieldControl`:

```tsx
<Field id="workspace" required>
  <FieldLabel>Workspace</FieldLabel>
  <FieldControl asChild>
    <Input name="workspace" autoComplete="organization" />
  </FieldControl>
  <FieldDescription>This appears in shared reports.</FieldDescription>
</Field>
```

`FieldControl` owns the label, description, error, invalid, required, disabled,
and read-only accessibility wiring. Input controls should not duplicate that API.

## NumberInput Boundaries

`NumberInput` defaults to `type="text"` with `inputMode="decimal"`. This avoids
accidental native spinbutton semantics and keeps the value as a string until app
validation or a form library decides how to parse it.

Use `numberMode="numeric"` for integer-like keyboard hints:

```tsx
<NumberInput name="seats" numberMode="numeric" pattern="[0-9]*" />
```

Use `type="number"` only when browser number validation and native spinbutton
semantics are intentionally wanted:

```tsx
<NumberInput type="number" name="quantity" min="1" max="10" step="1" />
```

V1 does not parse, clamp, round, format, localize, or emit numeric values.

## Textarea Resize

`Textarea` defaults to `resize="vertical"` so users can expand long-form
content. Use `resize="none"` only when the surrounding layout provides an
alternate way to handle overflow.

## Accessibility

- Provide visible labels. Placeholders are not labels.
- Use `FieldLabel`, `FieldDescription`, and `FieldError` for Dethink examples.
- Use `aria-describedby` for helpful instructions and relevant visible errors.
- Use native `disabled`, `readOnly`, and `required` attributes.
- Invalid state can be driven by FormField, `aria-invalid="true"`, or the
  explicit `invalid` prop.
- `NumberInput` does not expose a custom spinbutton role by default.

## Theming

All controls use Tailwind CSS v4 utilities, Dethink semantic tokens, density
variables, logical spacing, focus-visible styles, dark mode, RTL-safe layout,
and stable data attributes:

- `data-slot`
- `data-size`
- `data-invalid`
- `data-disabled`
- `data-readonly`
- `data-required`
- `data-resize` for Textarea
- `data-number-mode` for NumberInput

## Testing

The suite should be verified with:

- Component typecheck.
- Focused render, a11y, and SSR tests for each control.
- Suite-level form composition smoke tests.
- Storybook typecheck/build.
- Playground build.
- Registry validation and smoke.

## Out Of Scope

This suite does not include password reveal, search icons, clear buttons,
prefix/suffix slots, masking, currency/percent formatting, textarea autosize,
character counters, validation engines, schema resolvers, or form-library
adapters.
