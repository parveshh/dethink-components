# Form And Field Primitives Spec

Status: Published to GitHub issue tracker.

GitHub PRD: https://github.com/parveshh/dethink-components/issues/77

Package target: `@dethink/components`.

## Purpose

Form and Field primitives provide the shared native-first accessibility and
layout contract for future input components. They cover form spacing, labels,
descriptions, errors, invalid state, required markers, field grouping, and
fieldset/legend semantics without choosing a form-state library or concrete
input widget.

## Public API

The v1 component family is:

- `Form`
- `Field`
- `FieldLabel`
- `FieldControl`
- `FieldDescription`
- `FieldError`
- `FieldGroup`
- `FieldSet`
- `FieldLegend`
- `FieldContent`
- `FieldTitle`

Exports should include each component, class-name helpers where consistent with
existing primitives, and public prop/state types.

## Public Contract

- `Form` renders a native `form` by default, accepts native form attributes,
  forwards refs, and applies density-aware vertical spacing.
- `Field` renders a structural field container with generated or explicit ID
  context, stable data attributes, class merging, refs, invalid, disabled,
  required, read-only, and orientation state.
- `FieldControl` supports one direct child through `asChild` so native controls
  and future Dethink controls can receive `id`, `aria-describedby`,
  `aria-invalid`, `aria-errormessage`, state data attributes, className, and refs
  without an extra wrapper.
- `FieldLabel` renders a native label by default and connects to the active
  control ID.
- `FieldDescription` and `FieldError` register stable IDs with the parent field
  so the control can expose helpful instructions and relevant errors.
- `FieldError` only contributes error relationships when the field is invalid or
  the error is explicitly rendered as relevant.
- `FieldSet` and `FieldLegend` use native fieldset/legend semantics for related
  controls.
- `FieldGroup` is layout-only and must not replace fieldset/legend semantics.
- `FieldContent` and `FieldTitle` support horizontal and option-like rows for
  future checkbox, radio, and switch patterns.

## Accessibility

- Prefer native HTML over ARIA. Labels should be visible by default.
- Use `aria-describedby` to connect helpful instructions and relevant visible
  errors to the control.
- Use `aria-invalid` on the control when invalid.
- Use `aria-errormessage` only when the field is invalid and the referenced
  error content is relevant and visible.
- Use fieldset/legend for grouped controls.
- Do not invent custom widget roles for static field wrappers.

## Styling

- Use Tailwind CSS v4 utilities, static class maps, token-backed colors, density
  spacing, logical layout, shared class merging, and stable `data-*` selectors.
- Support light, dark, density, RTL, responsive layouts, and high-contrast-ready
  invalid states through existing token conventions.
- Add no CSS-in-JS, runtime style parser, Motion dependency, or form-state
  dependency.

## Out Of Scope

- Concrete input widgets such as Input, Textarea, NumberInput, Checkbox,
  RadioGroup, Switch, Select, Combobox, DatePicker, and FileUpload.
- Validation engines, schema resolvers, async submit orchestration, server
  actions, dirty/touched state, form arrays, or form-library adapters.
- Toasts, global error summaries, multi-step forms, scroll/focus-to-first-error,
  overlays, popovers, and focus scopes.

## Testing Seams

- Render and composition tests for Form, Field, generated/explicit IDs, label
  association, description/error wiring, state propagation, refs, class merging,
  and `asChild` prop preservation.
- Fieldset/group tests for native fieldset/legend semantics, disabled groups,
  horizontal rows, and layout-only grouping.
- Accessibility tests for axe smoke, visible labels, grouped controls,
  invalid/error wiring, and no custom widget roles.
- SSR tests for server rendering and hydration-safe generated IDs.
- Storybook stories for base, required, optional, description, error, disabled,
  read-only, horizontal, grouped, Card composition, dark mode, density, RTL, and
  native-control placeholder examples.
- Registry and playground smoke checks for package exports, metadata,
  dependency-free behavior, and copied source portability.
