# Input, Textarea, And NumberInput Spec

Status: Published to GitHub issue tracker.

GitHub PRD: https://github.com/parveshh/dethink-components/issues/83

Package target: `@dethink/components`.

## Purpose

Input, Textarea, and NumberInput provide the native text-entry layer for
Dethink forms. They build on the Form and Field primitives by supplying styled
single-line, multiline, and numeric-entry controls that preserve native browser
behavior, form-library compatibility, and registry portability.

## Public API

The v1 component family is:

- `Input`
- `Textarea`
- `NumberInput`

Exports should include each component, class-name helpers, and public prop/state
types:

- `InputProps`, `InputControlSize`, `inputClassNames`
- `TextareaProps`, `TextareaResize`, `TextareaControlSize`,
  `textareaClassNames`
- `NumberInputProps`, `NumberInputControlSize`, `NumberInputMode`,
  `numberInputClassNames`

## Public Contract

- `Input` renders a native `input`, forwards refs, composes className, exposes
  `data-slot="input"`, and passes native input attributes through.
- `Textarea` renders a native `textarea`, forwards refs, composes className,
  exposes `data-slot="textarea"`, passes native textarea attributes through, and
  supports an explicit resize contract.
- `NumberInput` renders a native `input`, forwards refs, composes className,
  exposes `data-slot="number-input"`, and passes numeric-entry attributes
  through without parsing or mutating values.
- `NumberInput` defaults to `type="text"` with `inputMode="decimal"` to avoid
  accidental native spinbutton behavior. Consumers may opt into native
  `type="number"` only when they intentionally want browser number validation
  and spinbutton semantics.
- Controls are usable standalone or as direct children of `FieldControl`.
- Labels, descriptions, errors, required markers, and group semantics remain the
  responsibility of Form and Field primitives.
- Controls should expose stable data attributes for slot, size, invalid,
  disabled, and read-only state where relevant.
- Controls should style `aria-invalid="true"`, `data-invalid="true"`, native
  disabled/read-only state, placeholder text, and focus-visible state
  consistently.
- Control sizing should be density-aware and should not require runtime class
  generation. Prefer a `controlSize` prop rather than overloading native `size`
  unless implementation research proves a better local pattern.

## Accessibility

- Prefer native input and textarea elements over custom roles.
- Require visible labels in examples through `FieldLabel`; placeholders are not
  label replacements.
- Use `FieldControl` for programmatic label, description, error, invalid,
  required, disabled, and read-only wiring in composed examples.
- Do not add custom widget roles to NumberInput unless native
  `type="number"` is explicitly used by the consumer.
- Keep focus-visible treatment obvious and token-backed.
- Disabled and read-only states must be distinct enough for visual review while
  preserving native semantics.
- Textarea resizing should default to a user-resizable pattern unless there is a
  documented layout reason to constrain it.

## Styling

- Use Tailwind CSS v4 utilities, static class maps, token-backed colors, density
  control sizing, logical spacing, shared class merging, and stable `data-*`
  selectors.
- Support light, dark, density, RTL, responsive layouts, and
  high-contrast-ready invalid states through existing token conventions.
- Add no CSS-in-JS, runtime style parser, Motion dependency, form-state
  dependency, masking dependency, or formatting dependency.

## Out Of Scope

- PasswordInput, SearchInput, PinInput/OTP, MaskedInput, CurrencyInput,
  PercentInput, Slider, Select, NativeSelect, Combobox, Checkbox, RadioGroup,
  Switch, DatePicker, TimePicker, or DateTimePicker behavior.
- Numeric parsing, formatting, locale decimal/group separator handling,
  precision, clamping, rounding, increment/decrement steppers, or value coercion.
- Textarea autosize, character counters, markdown/rich text, mentions, syntax
  highlighting, or spellcheck policy beyond native attribute passthrough.
- Validation engines, schema resolvers, dirty/touched state, form submission
  orchestration, server actions, global error summaries, or form-library
  adapters.
- Input adornments, prefix/suffix slots, icons, clear buttons, loading
  indicators, password reveal, search behavior, or command palette behavior.

## Testing Seams

- Render tests for native element type, refs, native attribute passthrough,
  controlled/uncontrolled values, native form participation, class merging,
  invalid/disabled/read-only/required state, size variants, and resize variants.
- FormField integration tests for direct `FieldControl` children, generated and
  explicit IDs, `aria-describedby`, `aria-invalid`, and `aria-errormessage`.
- NumberInput tests for default `type="text"`, default `inputMode="decimal"`,
  numeric/decimal modes, optional native `type="number"`, and pass-through of
  `min`, `max`, `step`, and `pattern` without parsing or clamping.
- Textarea tests for `rows`, `minLength`, `maxLength`, resize behavior,
  read-only/disabled behavior, and native form submission.
- Accessibility tests for axe smoke, visible labels, invalid/error examples,
  FieldControl integration, and no misleading custom widget roles.
- SSR tests for server rendering and hydration without mismatch warnings.
- Storybook stories for Input, Textarea, NumberInput, FieldControl integration,
  invalid/required/disabled/read-only states, density, dark mode, RTL, native
  form examples, and realistic auth/settings/CRUD examples.
- Registry and playground smoke checks for package exports, metadata,
  dependency-free behavior, copied source portability, and clean consumer import
  behavior.
