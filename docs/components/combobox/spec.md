# Combobox Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/109

Package target: `@dethink/components`.

## Branch Workflow

Branch names follow the repository workflow in `AGENTS.md`:

1. `feature/prd-109-combobox`
2. `feature/issue-110-combobox-contract-docs`
3. `feature/issue-111-combobox-primitive`
4. `feature/issue-112-combobox-filtering-menu`
5. `feature/issue-113-combobox-integration`

Create the PRD branch from the current integration base. Create Issue 1 from
the PRD branch, then stack each later issue branch from the previous issue
branch unless the GitHub issue dependency graph says otherwise. The final
implementation PR should target the PRD branch, not the repository default
branch, unless explicitly requested.

## Purpose

Combobox provides the searchable single-value picker layer for Dethink forms,
filters, settings, user pickers, role pickers, customer pickers, AI model
configuration, and admin workflows. It lets users type to narrow a bounded
option set, choose one value, optionally enter allowed custom text, and preserve
accessible input, popover, listbox, keyboard, validation, form, and
provider-token behavior.

Combobox is the next high-impact component after Select because it unlocks
larger option sets while staying distinct from MultiSelect, AsyncSelect,
TagInput, and CommandPalette.

## Public API

The v1 component family is:

- `Combobox`
- `ComboboxInput`
- `ComboboxButton`
- `ComboboxItem`
- `ComboboxGroup`
- `ComboboxLabel`
- `ComboboxSeparator`
- `ComboboxEmpty`

Exports should include each component, class-name helpers, and public prop/data
types:

- `ComboboxProps`
- `ComboboxInputProps`
- `ComboboxButtonProps`
- `ComboboxItemProps`
- `ComboboxGroupProps`
- `ComboboxLabelProps`
- `ComboboxSeparatorProps`
- `ComboboxEmptyProps`
- `ComboboxItemData`
- `ComboboxValue`
- `ComboboxControlSize`
- `comboboxClassNames`
- `comboboxItemClassNames`

## Prop Contract

Use Dethink Input and Select public prop names while mapping to React Aria
internals:

| Prop | Purpose |
| --- | --- |
| `value` | Controlled selected string value. Maps to React Aria selected key. |
| `defaultValue` | Uncontrolled initial selected string value. |
| `onValueChange` | Called with the next selected string value or `null` when cleared. |
| `inputValue` | Controlled visible typed text. |
| `defaultInputValue` | Uncontrolled initial visible typed text. |
| `onInputValueChange` | Called as the user types or when selection updates visible text. |
| `open` | Controlled menu open state. |
| `defaultOpen` | Uncontrolled initial menu open state. |
| `onOpenChange` | Called when the menu opens or closes. |
| `name` | Native form field name. |
| `formValue` | Whether form submission uses selected key or visible text where supported. |
| `placeholder` | Empty input text. |
| `items` | Optional data collection for render-function options. |
| `defaultItems` | Optional uncontrolled item collection where React Aria supports it. |
| `disabledKeys` | Option values that should remain visible but unavailable. |
| `allowsCustomValue` | Allows text that does not match an item to remain as the submitted value. |
| `allowsEmptyCollection` | Allows the menu to remain open when filtered results are empty. |
| `defaultFilter` | Local filter function for matching item text against input text. |
| `menuTrigger` | Interaction mode for opening the menu where React Aria supports it. |
| `controlSize` | Dethink size token, initially `sm`, `md`, or `lg`. |
| `disabled` | Prevent interaction and expose disabled semantics. |
| `readOnly` | Focusable review-state control that does not change value or input text. |
| `required` | Required form state and visual state. |
| `invalid` | Dethink invalid state, bridged to ARIA validation state. |
| `className` | Consumer class composition for the public slot. |

V1 selected values should be strings. Complex item records can be passed
through `items`, but item identity and form submission use the string value.

## Public Contract

- `Combobox` represents one selected value plus editable input text.
- `value` and `inputValue` are related but separate state channels.
- V1 is single-value only. Multi-value state belongs to future MultiSelect or
  TagInput.
- `Combobox` supports controlled and uncontrolled selected value, input text,
  and open state.
- `Combobox` supports static children and data-driven collections through
  `items` plus render-function children.
- `ComboboxItem` requires a string `value` and should expose a text value for
  filtering and selected text.
- Disabled options can be supplied through `disabledKeys` and item-level
  disabled state.
- Empty result UI should be available through `ComboboxEmpty` or an equivalent
  stable slot.
- `allowsCustomValue` keeps unmatched text as valid text input; it does not
  create or persist new option records.
- `name` should participate in native form submission through React Aria form
  support.
- `readOnly` is a Dethink state for review screens: the input remains focusable
  and submitted when named, but user interaction should not change typed text or
  selected value.
- `Combobox` should compose with Form and Field primitives for labels,
  descriptions, errors, required markers, disabled/read-only state, generated
  IDs, explicit IDs, and ARIA relationships.
- `Combobox` should expose stable data attributes for slot, open, selected,
  placeholder, invalid, disabled, read-only, required, focused, focus-visible,
  hovered, pressed, size, placement, empty, and value where relevant.

## Implementation Substrate

- Use `react-aria-components` for ComboBox, Input, Button, Popover, ListBox,
  ListBoxItem, Section, Label, FieldError, Text, validation, selection,
  keyboard behavior, focus restoration, filtering, and popover dismissal.
- Keep Dethink public prop names stable even when React Aria prop names differ.
- Reuse the provider-aware portal strategy established by Select so popovers
  inherit DethinkProvider theme, density, direction, and custom token context.
- Do not introduce Radix UI, cmdk, Floating UI, or search-runtime dependencies
  for Combobox v1.
- Do not implement custom combobox/listbox keyboard behavior when React Aria
  already provides it.
- Use existing `cn` and explicit class maps for slot and state styling.

## Accessibility

- Examples must use visible labels. Placeholder text is not a label.
- Input, trigger button, selected value, popover, listbox, options, disabled
  options, descriptions, errors, required state, invalid state, and empty
  results should use React Aria semantics where available.
- Keyboard behavior should cover typing, opening, closing, option navigation,
  Enter/Space selection, Escape dismissal, Tab behavior, focus restoration, and
  disabled option skipping.
- Disabled options remain visible but cannot be selected.
- Invalid state should be programmatic and visible through Field/Form
  composition and standalone usage.
- Read-only state must be visible and should prevent value/input changes
  without removing the current value from form submission.
- RTL should be inherited from provider `dir` and avoid left/right hard-coding.

## Styling And Theming

Combobox is themed through `DethinkProvider` and `dethink-base`. It must not
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
- `density="compact"`, `density="default"`, and `density="comfortable"`.
- Nested providers.
- Custom `themeConfig` color, font, spacing, radius, and density overrides.
- Provider `dir="rtl"` with logical spacing and icon alignment.

## Out Of Scope

- Select, NativeSelect, MultiSelect, AsyncSelect, TagInput, TreeSelect,
  CommandPalette, standalone Listbox, remote loading contracts, loading
  spinners, debounced queries, infinite scroll, virtualization, fuzzy-search
  engines, and creatable option persistence.
- Form library adapters, validation schema resolvers, server action
  orchestration, dirty/touched state, and global error summaries.
- Overlay manager, generic Portal abstraction, Dialog/Popover generalization,
  Tooltip, DropdownMenu, and focus trap primitives.
- Component-level theme props.
- Multi-value state, chips, tag rendering, selected item collections, and remove
  buttons.

## Verification Requirements

- Rendered component tests for public props, controlled/uncontrolled state,
  disabled/read-only/required/invalid states, filtering, custom values, and form
  submission.
- Interaction tests for typing, filtering, selecting, keyboard navigation,
  closing, disabled options, focus restoration, and empty results.
- Accessibility tests with axe for labeled, invalid, read-only/disabled, and
  empty result examples.
- SSR render/hydration smoke tests.
- Storybook stories and play tests for base, controlled, custom value, empty,
  disabled/read-only, invalid/required, Field/Form, theme/density/RTL, and
  realistic product workflows.
- Registry validation and smoke tests for dependency metadata, file portability,
  provider-token reliance, package exports, and clean consumer imports.
