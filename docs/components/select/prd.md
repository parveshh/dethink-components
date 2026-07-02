# Select PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/103.

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

## Problem Statement

Teams building SaaS dashboards, internal tools, B2B apps, filters, settings
pages, permissions workflows, AI model pickers, and CRUD forms need a
first-class Select component after text-entry and choice controls.

Dethink now has provider-level theming, Form/Field primitives,
Input/Textarea/NumberInput, and Checkbox/RadioGroup/Switch. What is still
missing is a single-select control for choosing one value from a constrained
option set. Without a Dethink Select, consumers must assemble trigger styling,
popover behavior, option rendering, keyboard behavior, validation, hidden form
values, provider-token theming, Storybook examples, registry metadata, and
tests for every usage.

## Solution

Ship a single-select `Select` component family for `@dethink/components` that
uses the existing `react-aria-components` dependency for accessible select,
popover, and listbox behavior while exposing a Dethink API that feels familiar
to shadcn/Radix users.

The component should support controlled and uncontrolled values, controlled and
uncontrolled open state, disabled/read-only/required/invalid state, placeholder
text, option collections, disabled options, item groups/sections, stable data
attributes, Field/Form composition, native form participation through `name`,
and provider-level theme/density tokens. It should install through the
shadcn-style registry with accurate `react-aria-components` dependency
metadata.

Select v1 is single-selection only. NativeSelect, Combobox, MultiSelect,
AsyncSelect, TagInput, virtualized lists, typeahead search input, async
loading, and custom filtering are out of scope.

## User Stories

1. As a frontend engineer, I want a Select component, so that one-of-many choices do not require bespoke trigger and popover code.
2. As a form builder, I want Select to work in settings, filter, CRUD, auth, and AI configuration forms, so that option picking follows the same Dethink form contract as inputs and choice controls.
3. As a package consumer, I want `value`, `defaultValue`, and `onValueChange`, so that selection can be controlled or uncontrolled with familiar component-library names.
4. As a package consumer, I want `open`, `defaultOpen`, and `onOpenChange`, so that advanced flows can control the menu when needed.
5. As a package consumer, I want `name`, `required`, `disabled`, `readOnly`, and `invalid`, so that Select participates in forms and state styling predictably.
6. As a package consumer, I want `placeholder`, so that empty selection states are clear.
7. As a package consumer, I want `items` plus render-function children, so that options can come from data arrays.
8. As a package consumer, I want explicit `SelectItem`, `SelectGroup`, `SelectLabel`, and `SelectSeparator` building blocks, so that static option markup stays readable.
9. As a package consumer, I want `disabledKeys` and item-level disabled state, so that unavailable options remain visible but unavailable.
10. As a package consumer, I want refs and className composition on public slots, so that apps can integrate focus management and local layout overrides.
11. As a design-system lead, I want provider-level `theme`, `density`, and `themeConfig` tokens to style Select, so that Select follows light, dark, system, compact, default, comfortable, nested provider, and custom theme contexts without a component theme prop.
12. As a design-system lead, I want stable `data-slot` and state attributes, so that downstream styles and tests can target root, trigger, value, icon, popover, listbox, item, item indicator, group, label, and separator slots.
13. As an accessibility reviewer, I want keyboard and screen-reader behavior handled by a proven accessible collection primitive, so that focus, typeahead, selection announcement, disabled options, and popover dismissal are reliable.
14. As an accessibility reviewer, I want visible labels, descriptions, errors, invalid state, and required state covered in docs and stories, so that Select is not presented as placeholder-only labeling.
15. As an RTL user, I want Select spacing and icons to respect provider direction, so that localized forms do not require manual overrides.
16. As a mobile user, I want the trigger and menu to be touch-friendly under provider density rules, so that forms remain usable in tablet and mobile viewports.
17. As a Storybook user, I want examples for base, controlled, grouped, disabled options, invalid/required, disabled/read-only, form usage, theme/density, RTL, and realistic filter/settings/model-picker flows.
18. As a registry consumer, I want accurate registry metadata with `react-aria-components` dependency and `dethink-base` registry dependency, so that copied Select source installs cleanly.
19. As an SSR app developer, I want Select to render and hydrate without mismatch warnings, so that Next.js and Vite SSR consumers can use it.
20. As a maintainer, I want Select v1 to avoid search, async, multiselect, virtualization, and portal manager abstractions, so that the first selection primitive stays focused.

## Implementation Decisions

- The next priority component is Select because the high-impact roadmap places
  it immediately after Checkbox/RadioGroup/Switch.
- Build a single-select component family: `Select`, `SelectItem`,
  `SelectGroup`, `SelectLabel`, `SelectSeparator`, class-name helpers, and
  public prop/data types.
- Use `react-aria-components` as the behavior substrate, consistent with the
  existing DateTimePicker dependency and accessibility strategy.
- Expose Dethink API names where they are already established locally or
  familiar from shadcn/Radix: `value`, `defaultValue`, `onValueChange`, `open`,
  `defaultOpen`, `onOpenChange`, `name`, `disabled`, `readOnly`, `required`,
  `invalid`, `placeholder`, `items`, `disabledKeys`, and `controlSize`.
- Map Dethink values to React Aria selected keys internally. V1 should use
  string values for item identity and form submission.
- Preserve native form participation via the underlying React Aria form support
  and verify submitted values with `name`.
- Use provider-level theme tokens only: `background`, `foreground`, `muted`,
  `muted-foreground`, `border`, `input`, `ring`, `primary`,
  `primary-foreground`, `destructive`, `destructive-foreground`, spacing
  tokens, radii, `density-control`, and `density-gap`.
- Do not add a component-level theme prop. Theme, density, nested theme scope,
  and custom token overrides are owned by `DethinkProvider`.
- Use component-scoped CSS variables only for local geometry such as trigger
  width, menu max height, item indicator size, or popover offset when needed.
- Select should compose with the Form/Field docs and examples. The PRD should
  document preferred composition clearly and avoid duplicating validation
  engines or form-state adapters.
- Registry metadata should declare `react-aria-components` and
  `dethink-base`. No Radix dependency should be introduced for Select v1.

## Theming Token Plan

Provider-level theming is already implemented in the project through
`DethinkProvider`, `themeConfig`, `data-theme`, `data-density`, `dir`, and the
`dethink-base` registry item. Select should consume that contract directly.

Required token coverage:

- Trigger surface: `background`, `foreground`, `input`, `border`, `ring`, and
  radius tokens.
- Placeholder and metadata: `muted-foreground`.
- Popover and listbox surface: `background`, `foreground`, `border`, radius,
  shadow utilities, and local max-height geometry.
- Option hover/focus: `muted`, `foreground`, and `ring`.
- Selected option: `primary`, `primary-foreground`, and selected indicator
  color tokens.
- Invalid state: `destructive`, `destructive-foreground`, and `ring`.
- Disabled/read-only state: `muted`, `muted-foreground`, opacity utilities, and
  state data attributes.
- Density and touch targets: `--dt-density-control` and `--dt-density-gap`.
- Spacing and icon gaps: `--dt-space-*` and logical padding utilities.

Storybook and docs should show light, dark, system, compact, default,
comfortable, nested provider scope, custom `themeConfig`, and RTL examples.

## Testing Decisions

- Tests should assert public behavior, accessible roles/names/states, keyboard
  interactions, native form submission, and token/state data attributes rather
  than private implementation details.
- Render tests should cover controlled/uncontrolled value, controlled/uncontrolled
  open state, placeholder, disabled, read-only, required, invalid, `name`,
  `items`, static children, disabled options, grouped options, className
  composition, refs, and stable data slots.
- Interaction tests should cover open/close, option selection, Escape
  dismissal, trigger focus restoration, keyboard navigation, disabled option
  skipping, and typeahead behavior available through React Aria.
- Accessibility tests should cover axe smoke for labeled Select, invalid/error
  Select, grouped options, disabled/read-only examples, and no missing
  accessible names.
- SSR tests should cover server rendering and hydration without mismatch
  warnings.
- Storybook should cover visual variants, state coverage, provider
  theme/density/RTL stories, realistic settings/filter/model-picker examples,
  and interaction play tests.
- Registry and playground smoke should verify package exports, copied registry
  files, dependency metadata, aliases, style imports, and provider-token
  theming.

## Out of Scope

- NativeSelect, Combobox, Listbox as a standalone component, MultiSelect,
  AsyncSelect, TagInput, TreeSelect, command palette, searchable selects,
  custom filtering, async loading, virtualization, infinite scroll, and
  creatable options.
- Form library adapters, validation schema resolvers, global error summaries,
  server action orchestration, and dirty/touched state.
- Overlay manager, portal abstraction, Dialog/Popover generalization, Tooltip,
  DropdownMenu, and focus trap primitives.
- Complex custom value rendering beyond clear selected text and optional item
  metadata in v1.
- Component-level theme props or brand-specific themes outside
  `DethinkProvider`.

## Further Notes

- Priority source: `docs/high-impact-component-priority.md`, where Select
  follows Checkbox/RadioGroup/Switch.
- Research source: Context7 React Aria docs for Select/ListBox controlled
  selection, disabled keys, labels, descriptions, errors, popover/listbox
  composition, validation behavior, and keyboard behavior.
- Research source: Context7 Radix Select docs for familiar API names including
  `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`,
  `onOpenChange`, `name`, `disabled`, `required`, and grouped item anatomy.
- Existing repo prior art: DateTimePicker uses `react-aria-components`;
  Input/Textarea/NumberInput and choice controls define control sizing, state
  attributes, density, and provider-token styling; FormField defines labels,
  help, errors, and grouping.
