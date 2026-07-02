# Checkbox, RadioGroup, And Switch Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/91

Package target: `@dethink/components`.

## Branch Workflow

Branch names follow the repository workflow in `AGENTS.md`:

1. `feature/prd-91-choice-controls`
2. `feature/issue-92-choice-controls-contract-docs`
3. `feature/issue-93-checkbox-primitive`
4. `feature/issue-94-radio-group-primitive`
5. `feature/issue-95-switch-primitive`
6. `feature/issue-96-choice-controls-integration`

Create the PRD branch from the current integration base. Create Issue 1 from
the PRD branch, then stack each later issue branch from the previous issue
branch unless the GitHub issue dependency graph says otherwise. The final
implementation PR should target the PRD branch, not the repository default
branch, unless explicitly requested.

## Purpose

Checkbox, RadioGroup, and Switch provide the native choice-control layer for
Dethink forms. They build on Form and Field primitives by supplying styled
binary, grouped single-choice, and on/off controls that preserve native browser
behavior, form-library compatibility, keyboard access, and registry
portability.

## Public API

The v1 component family is:

- `Checkbox`
- `RadioGroup`
- `RadioGroupItem`
- `Switch`

Exports should include each component, class-name helpers, and public prop/state
types:

- `CheckboxProps`, `CheckboxCheckedState`, `CheckboxControlSize`,
  `checkboxClassNames`
- `RadioGroupProps`, `RadioGroupItemProps`, `RadioGroupOrientation`,
  `RadioGroupControlSize`, `radioGroupClassNames`,
  `radioGroupItemClassNames`
- `SwitchProps`, `SwitchControlSize`, `switchClassNames`

## Public Contract

- `Checkbox` represents one boolean or mixed-state option. It should preserve a
  native checkbox input for form participation and browser semantics while
  rendering a token-backed custom indicator.
- `Checkbox` supports controlled and uncontrolled state with
  `checked`, `defaultChecked`, and `onCheckedChange`.
- `CheckboxCheckedState` is `boolean | "indeterminate"` so the component can
  represent tri-state "select all" and partially selected groups.
- `RadioGroup` provides context for a set of mutually exclusive
  `RadioGroupItem` controls. It supports `name`, controlled `value`,
  uncontrolled `defaultValue`, `onValueChange`, orientation, disabled, required,
  invalid, and size state.
- `RadioGroupItem` represents one native radio input, requires a string `value`,
  forwards refs to the input, composes className, and inherits group state when
  nested in `RadioGroup`.
- `Switch` represents an on/off setting. It should preserve a native checkbox
  input for form participation, expose switch semantics, and render a
  token-backed track/thumb visual.
- `Switch` supports controlled and uncontrolled boolean state with `checked`,
  `defaultChecked`, and `onCheckedChange`. It does not support an
  indeterminate/mixed state.
- All controls should support standalone usage and FormField composition.
- FormField owns labels, descriptions, errors, required markers, fieldsets,
  legends, and group-level help/error wiring.
- Choice controls should accept `id`, `name`, `value`, `disabled`, `required`,
  `readOnly`, `aria-invalid`, `aria-describedby`, native form attributes where
  relevant, and consumer event handlers without inventing a validation or form
  state API.
- `readOnly` should be a documented Dethink state for review screens: the
  control remains focusable and form-submittable, exposes data/ARIA readonly
  state where appropriate, and does not emit checked/value changes.
- Components should expose stable data attributes for slot, size, checked,
  indeterminate, invalid, disabled, read-only, required, orientation, and value
  where relevant.
- V1 should not ship a standalone `CheckboxGroup` component. Multiple-checkbox
  groups should use `FieldSet`, `FieldLegend`, and `FieldGroup` with Checkbox
  items. A value-managing CheckboxGroup can be revisited after real usage.

## Accessibility

- Prefer native input elements over hand-rolled ARIA widgets.
- Checkbox keyboard behavior must preserve Space toggling and must expose mixed
  state with `aria-checked="mixed"` and the native `indeterminate` property.
- RadioGroup keyboard behavior should match native radio groups: Tab moves into
  the selected item when one is selected, Space selects the focused radio, and
  browser-supported arrow navigation works for radios sharing a name.
- Switch should use native checkbox behavior with switch semantics. APG allows
  an HTML `input[type="checkbox"]` implementation for switches; the switch state
  must remain binary.
- Switch labels must not change when the switch changes state.
- Use `FieldSet` and `FieldLegend` for grouped checkboxes, radio groups, and
  switch groups that need a visible group label.
- Use `FieldDescription` and `FieldError` for descriptions and errors, with
  `FieldControl` passing the resulting `aria-describedby`, `aria-invalid`, and
  `aria-errormessage` relationships to the native input.
- Examples must use visible labels through `FieldLabel`; placeholders or visual
  icons are not labels.
- Disabled, read-only, invalid, required, checked, and indeterminate states must
  be visually clear and programmatically exposed where supported.

## Styling

- Use Tailwind CSS v4 utilities, static class maps, token-backed colors, density
  control sizing, logical spacing, shared class merging, and stable `data-*`
  selectors.
- Support light, dark, density, RTL, responsive layouts, and
  high-contrast-ready checked/invalid/focus states through existing token
  conventions.
- Keep visuals compact and suitable for dense SaaS forms, settings rows, filter
  panels, permission matrices, and AI configuration surfaces.
- Add no CSS-in-JS, runtime style parser, Radix dependency, React Aria
  dependency, Motion dependency, form-state dependency, masking dependency, or
  validation dependency.

## Registry Requirements

- Add separate registry items for `checkbox`, `radio-group`, and `switch` so
  consumers can install only the controls they need.
- Each item should depend on `dethink-base`.
- Examples may use `form-field`, `input`, `card`, or layout components, but the
  control registry metadata should include only required source files and
  runtime dependencies.
- Registry smoke coverage should verify copied source portability, dependency
  metadata, exported files, stable data attributes, and relative imports.

## Documentation Requirements

- Explain when to use Checkbox versus Switch: Checkbox for selected/not selected
  form choices, Switch for on/off settings where on/off semantics are clearer.
- Explain Checkbox mixed state and the distinction between `checked`,
  `defaultChecked`, `onCheckedChange`, and native `onChange`.
- Explain RadioGroup controlled/uncontrolled values, native form submission,
  group naming, and FieldSet/Legend usage.
- Explain Switch binary-only behavior and the requirement that labels do not
  change with state.
- Show standalone native examples and FormField examples for each control.
- Cover invalid, disabled, read-only, required, density, dark mode, RTL,
  controlled/uncontrolled, form-library integration, SSR, registry installation,
  and out-of-scope behavior.

## Out Of Scope

- Select, NativeSelect, Combobox, MultiSelect, AsyncSelect, TagInput, Slider,
  ToggleGroup, SegmentedControl, Listbox, Rating, and toolbar radio behavior.
- A value-managing CheckboxGroup component in v1.
- Permission matrix, feature flag dashboard, or settings page blocks.
- Validation engines, schema resolvers, dirty/touched state, form submission
  orchestration, global error summaries, or form-library adapters.
- Icons as a public slot API, custom label rendering, animated toggles, tooltip
  help, or command/search behavior.
- CSS-in-JS, runtime style parsers, Radix UI dependencies, React Aria
  dependencies, or Motion dependencies.

## Testing Seams

- Render tests for native input presence, refs, IDs, native attribute
  passthrough, controlled/uncontrolled state, native form participation, class
  merging, invalid/disabled/read-only/required state, size variants, orientation
  variants, and stable data attributes.
- Checkbox tests for boolean state, indeterminate state, `aria-checked="mixed"`,
  native `indeterminate`, `onCheckedChange`, `onChange` preservation, and Space
  toggling.
- RadioGroup tests for shared name behavior, value/defaultValue,
  onValueChange, disabled group/items, required state, orientation, form
  submission, item labels, and keyboard behavior available from native radios.
- Switch tests for binary checked state, no mixed state, role/switch semantics,
  track/thumb data states, stable label examples, and native form submission.
- FormField integration tests for direct `FieldControl` children, generated and
  explicit IDs, `aria-describedby`, `aria-invalid`, `aria-errormessage`,
  disabled/required/read-only propagation, and FieldSet/Legend grouping.
- Accessibility tests for axe smoke, visible labels, grouped checkboxes,
  radio groups, switch groups, invalid/error wiring, mixed state, disabled and
  read-only examples, and no misleading custom widget roles.
- SSR tests for server rendering and hydration without mismatch warnings.
- Storybook stories for Checkbox, RadioGroup, Switch, FormField integration,
  grouped choices, invalid/required/disabled/read-only states, density, dark
  mode, RTL, permission/settings/filter examples, and responsive layouts.
- Registry and playground smoke checks for package exports, metadata,
  dependency-free behavior, copied source portability, and clean consumer import
  behavior.

## Research Notes

- Context7 resolved `/shadcn-ui/ui` as the primary shadcn-compatible reference.
  Its current docs show Checkbox, RadioGroup, and Switch using controlled
  `checked`/`value` state and `onCheckedChange`/`onValueChange`, with FormField
  examples passing `aria-invalid` and group state through Field primitives.
- WAI-ARIA APG Checkbox guidance covers dual-state and tri-state checkboxes,
  Space toggling, `aria-checked` values, and grouped checkbox descriptions.
- WAI-ARIA APG Radio Group guidance covers mutually exclusive selection,
  group labeling, Space selection, arrow-key behavior, and described-by
  relationships.
- WAI-ARIA APG Switch guidance distinguishes on/off switch semantics from
  checkbox semantics, requires stable labels, and explicitly includes an HTML
  checkbox-input switch example.
