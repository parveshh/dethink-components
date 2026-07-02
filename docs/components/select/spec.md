# Select Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/103

Package target: `@dethink/components`.

## Branch Workflow

Branch names follow the repository workflow in `AGENTS.md`:

1. `feature/prd-103-select`
2. `feature/issue-104-select-contract-docs`
3. `feature/issue-105-select-primitive`
4. `feature/issue-106-select-collections-menu`
5. `feature/issue-107-select-integration`

Create the PRD branch from the current integration base. Create Issue 1 from
the PRD branch, then stack each later issue branch from the previous issue
branch unless the GitHub issue dependency graph says otherwise. The final
implementation PR should target the PRD branch, not the repository default
branch, unless explicitly requested.

## Purpose

Select provides the single-selection layer for Dethink forms, filters,
settings, permissions workflows, and AI configuration surfaces. It lets users
choose one value from a bounded option set while preserving accessible popover,
listbox, keyboard, validation, form, and provider-token behavior.

Select is the next high-impact component after Input/Textarea/NumberInput and
Checkbox/RadioGroup/Switch because it unlocks dashboard filters, role pickers,
settings forms, CRUD forms, model pickers, and later Combobox/MultiSelect work.

## Public API

The v1 component family is:

- `Select`
- `SelectItem`
- `SelectGroup`
- `SelectLabel`
- `SelectSeparator`

Exports should include each component, class-name helpers, and public prop/data
types:

- `SelectProps`
- `SelectItemProps`
- `SelectGroupProps`
- `SelectLabelProps`
- `SelectSeparatorProps`
- `SelectItemData`
- `SelectValue`
- `SelectControlSize`
- `selectClassNames`
- `selectItemClassNames`

## Prop Contract

Use Dethink/shadcn/Radix-like public prop names while mapping to React Aria
internals:

| Prop | Purpose |
| --- | --- |
| `value` | Controlled selected string value. Maps to React Aria selected key. |
| `defaultValue` | Uncontrolled initial selected string value. |
| `onValueChange` | Called with the next selected string value. |
| `open` | Controlled menu open state. |
| `defaultOpen` | Uncontrolled initial menu open state. |
| `onOpenChange` | Called when the menu opens or closes. |
| `name` | Native form field name for submitted selected value. |
| `placeholder` | Empty selection text rendered in the trigger value slot. |
| `items` | Optional data collection for render-function options. |
| `disabledKeys` | Option values that should remain visible but unavailable. |
| `controlSize` | Dethink size token, initially `sm`, `md`, or `lg`. |
| `disabled` | Prevent interaction and expose disabled semantics. |
| `readOnly` | Focusable review-state control that does not change value. |
| `required` | Required form state and visual state. |
| `invalid` | Dethink invalid state, bridged to ARIA validation state. |
| `className` | Consumer class composition for the public slot. |

V1 values should be strings. Complex item records can be passed through
`items`, but item identity and form submission use the string value.

## Public Contract

- `Select` represents one selected value from a finite option set.
- V1 is single-selection only. Multi-value state belongs to future MultiSelect.
- `Select` supports controlled and uncontrolled selection with `value`,
  `defaultValue`, and `onValueChange`.
- `Select` supports controlled and uncontrolled menu state with `open`,
  `defaultOpen`, and `onOpenChange`.
- `Select` supports static children and data-driven collections through
  `items` plus render-function children.
- `SelectItem` requires a string `value` and can render plain text plus
  optional descriptive metadata.
- `SelectGroup`, `SelectLabel`, and `SelectSeparator` provide grouped option
  anatomy without creating extra selectable options.
- Disabled options can be supplied through `disabledKeys` and item-level
  disabled state.
- `name` should participate in native form submission through the underlying
  React Aria form support.
- `readOnly` is a Dethink state for review screens: the trigger remains
  focusable and value remains submitted when named, but user interaction should
  not change the selected value.
- `Select` should compose with Form and Field primitives for labels,
  descriptions, errors, required markers, disabled/read-only state, generated
  IDs, explicit IDs, and ARIA relationships.
- `Select` may expose local label/description/error wiring only where React Aria
  needs it, but docs should prefer existing Form/Field composition.
- `Select` should expose stable data attributes for slot, open, selected,
  placeholder, invalid, disabled, read-only, required, focused, focus-visible,
  hovered, pressed, size, placement, and value where relevant.

## Implementation Substrate

- Use `react-aria-components` for Select, Button, SelectValue, Popover,
  ListBox, ListBoxItem, Section, Label, FieldError, validation, selection,
  typeahead, keyboard behavior, focus restoration, and popover dismissal.
- Keep Dethink public prop names stable even when React Aria prop names differ.
- Do not introduce Radix UI as a runtime dependency for Select v1.
- Do not implement custom listbox keyboard behavior when React Aria already
  provides it.
- Use existing `cn` and explicit class maps for slot and state styling.

## Accessibility

- Examples must use visible labels. Placeholder text is not a label.
- Trigger, selected value, popover, listbox, options, disabled options, grouped
  options, descriptions, errors, required state, and invalid state should use
  React Aria semantics where available.
- Keyboard behavior should cover opening, closing, option navigation, typeahead,
  Enter/Space selection, Escape dismissal, Tab behavior, and focus restoration
  to the trigger.
- Disabled options remain visible but cannot be selected.
- Invalid state should be programmatic and visible through Field/Form
  composition and standalone usage.
- Read-only state must be visible and should prevent value changes without
  removing the current value from form submission.
- RTL should be inherited from the provider `dir` attribute and avoid
  left/right hard-coding.

## Styling And Theming

Select is themed through `DethinkProvider` and `dethink-base`. It must not
accept a component-level `theme` prop.

Use provider-level tokens for:

- `--dt-color-background`
- `--dt-color-foreground`
- `--dt-color-muted`
- `--dt-color-muted-foreground`
- `--dt-color-border`
- `--dt-color-input`
- `--dt-color-ring`
- `--dt-color-primary`
- `--dt-color-primary-foreground`
- `--dt-color-destructive`
- `--dt-color-destructive-foreground`
- `--dt-space-*`
- `--dt-radius-sm`
- `--dt-radius-md`
- `--dt-radius-lg`
- `--dt-density-control`
- `--dt-density-gap`

The implementation should support:

- `theme="light"`, `theme="dark"`, and `theme="system"`.
- `density="compact"`, `density="default"`, and
  `density="comfortable"`.
- Nested providers.
- Custom `themeConfig` color, font, spacing, radius, and density overrides.
- Provider `dir="rtl"` with logical spacing and icon alignment.

Component-scoped CSS variables are acceptable only for local geometry such as
trigger width, menu max height, item indicator size, or popover offset. They
must not replace provider-level color, spacing, radius, or density tokens.

## Registry Requirements

- Add one registry item for `select`.
- The registry item should depend on `react-aria-components` and
  `dethink-base`.
- Registry metadata should list all copied Select source files, class helpers,
  and required dependencies.
- Examples may use Form/Field, Card, Stack, or layout components, but the
  Select registry item should include only required source files and runtime
  dependencies.
- Registry smoke coverage should verify copied source portability, dependency
  metadata, aliases, CSS variable reliance, style imports, and package exports.

## Documentation Requirements

- Explain when to use Select versus RadioGroup: Select for compact option sets
  when choices do not need to be visible at all times, RadioGroup for short
  mutually exclusive sets that benefit from full visibility.
- Explain when not to use Select: free text, searchable command flows,
  multi-value tags, async remote search, hierarchical trees, or native mobile
  picker requirements.
- Cover controlled and uncontrolled selection and open state.
- Cover form submission through `name`.
- Cover `items` render-function usage and static children usage.
- Cover disabled options, groups, labels, separators, long labels, and
  placeholder text.
- Cover labels, descriptions, errors, invalid state, required state, disabled
  state, read-only state, density, dark mode, provider theming, nested theme
  scopes, custom theme tokens, RTL, SSR, registry installation, and testing.
- Include realistic settings, dashboard filter, role/permission, CRUD form, and
  AI model picker examples.

## Out Of Scope

- NativeSelect, Combobox, standalone Listbox, MultiSelect, AsyncSelect,
  TagInput, TreeSelect, command palette, searchable selects, custom filtering,
  async loading, virtualization, infinite scroll, and creatable options.
- Form library adapters, schema resolvers, dirty/touched state, server action
  orchestration, and global error summaries.
- Overlay manager, portal abstraction, Dialog/Popover generalization, Tooltip,
  DropdownMenu, and focus trap primitives.
- Component-level theme props or brand-specific themes outside
  `DethinkProvider`.
- Complex custom selected-value rendering beyond clear selected text and
  optional item metadata in v1.

## Testing Seams

- Render tests for selected value, placeholder, refs, class merging, static
  children, data-driven items, disabled keys, grouped options, native form
  participation, invalid/disabled/read-only/required state, control sizes, and
  stable data attributes.
- Interaction tests for opening, closing, option navigation, typeahead,
  selection, Escape dismissal, outside dismissal, focus restoration, disabled
  option skipping, pointer selection, and keyboard selection.
- Form/Field integration tests for generated and explicit IDs,
  `aria-describedby`, `aria-invalid`, `aria-errormessage`, label/description
  wiring, error wiring, required state, disabled state, read-only state, and
  submitted `name`/value.
- Accessibility tests for axe smoke, visible labels, invalid/error wiring,
  grouped options, disabled/read-only examples, and no missing accessible names.
- SSR tests for server rendering and hydration without mismatch warnings.
- Storybook stories for base, controlled, grouped, disabled options,
  invalid/required, disabled/read-only, Form/Field composition,
  theme/density/RTL, settings card, dashboard filter, role picker, and AI model
  picker examples.
- Registry and playground smoke checks for package exports, metadata,
  dependency installation, copied source portability, provider tokens, aliases,
  and clean consumer import behavior.

## Research Notes

- Context7 was used first while logged in.
- Context7 resolved React Aria Components to `/websites/react-aria_adobe`.
  Current docs show a Select composition built from Select, Label, Button,
  SelectValue, Popover, ListBox, ListBoxItem, FieldError, controlled
  `selectedKey`, `defaultSelectedKey`, `onSelectionChange`, item collections,
  sections, disabled keys, validation behavior, and keyboard/listbox behavior.
- Context7 resolved Radix UI docs through `/websites/radix-ui_primitives`.
  Current Select docs informed familiar public prop names:
  `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`,
  `onOpenChange`, `name`, `disabled`, `required`, plus item/group anatomy.
- Existing repo prior art includes DateTimePicker using
  `react-aria-components`, Form/Field for label/help/error wiring,
  Input/Textarea/NumberInput for input state and density conventions, and
  Checkbox/RadioGroup/Switch for choice-control state data attributes.
