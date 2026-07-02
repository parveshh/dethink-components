# Combobox PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/109.

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

## Problem Statement

Teams building SaaS dashboards, internal tools, B2B apps, admin filters,
settings forms, permission flows, customer pickers, and AI configuration
screens need a searchable single-value picker after Select. Dethink now has
provider-level theming, Form/Field primitives, text inputs, choice controls, and
Select. What is still missing is a Combobox that lets users type to narrow a
bounded option set, choose one value, and preserve accessible listbox, keyboard,
validation, form, and provider-token behavior.

Without a Dethink Combobox, consumers must assemble input styling, trigger
affordances, filtering, popover behavior, option rendering, selected value
state, input text state, validation, hidden form values, provider-token
theming, Storybook examples, registry metadata, and tests for every usage.

## Solution

Ship a single-value `Combobox` component family for `@dethink/components` that
uses `react-aria-components` ComboBox/ListBox/Popover behavior while exposing a
Dethink API aligned with the existing Input, Select, Form/Field, and
provider-token contracts.

Combobox should support controlled and uncontrolled selected value, controlled
and uncontrolled input text, user-driven menu opening with `menuTrigger` and
`onOpenChange`, local filtering, optional custom text values, empty result states,
disabled/read-only/required/invalid state, placeholder text, data-driven and
static items, disabled options, native form participation, stable data
attributes, Storybook interaction coverage, SSR smoke tests, and shadcn-style
registry metadata.

Combobox v1 is single-value only. MultiSelect, AsyncSelect, TagInput, command
palette, remote loading orchestration, virtualization, and fuzzy-search engines
are out of scope.

## User Stories

1. As a dashboard engineer, I want a Combobox component, so that users can search and pick one value from a larger option set without bespoke input and popover code.
2. As a form builder, I want Combobox to compose with Field and Form primitives, so that labels, descriptions, errors, required state, and submitted values match the rest of Dethink.
3. As a package consumer, I want `value`, `defaultValue`, and `onValueChange`, so that selected item state can be controlled or uncontrolled.
4. As a package consumer, I want `inputValue`, `defaultInputValue`, and `onInputValueChange`, so that typed query text can be controlled or uncontrolled separately from selected value.
5. As a package consumer, I want `menuTrigger` and `onOpenChange`, so that supported React Aria menu opening and closing behavior can be observed and configured.
6. As a package consumer, I want `items` and render-function children, so that option collections can come from data arrays.
7. As a package consumer, I want static `ComboboxItem` children, so that simple lists remain readable in JSX.
8. As a package consumer, I want `disabledKeys` and item-level disabled state, so that unavailable options remain visible but cannot be selected.
9. As a package consumer, I want `allowsCustomValue`, so that bounded pickers and controlled free-text pickers can both be represented where appropriate.
10. As a package consumer, I want `defaultFilter` or a local filtering hook point, so that the list can narrow as users type without pulling in a search runtime.
11. As a package consumer, I want an empty result slot/message, so that no-match states are clear and accessible.
12. As a package consumer, I want `menuTrigger`, so that menu opening can be input-driven, focus-driven, or manual where React Aria supports it.
13. As a package consumer, I want `formValue`, so that forms can submit either the selected key or visible text according to the use case.
14. As a package consumer, I want `name`, `required`, `disabled`, `readOnly`, and `invalid`, so that Combobox participates in form and validation flows predictably.
15. As a package consumer, I want `placeholder` and `controlSize`, so that Combobox matches Input and Select sizing and empty states.
16. As a package consumer, I want refs and className composition on public slots, so that apps can integrate focus management and local layout overrides.
17. As a design-system lead, I want provider-level theme, density, direction, and `themeConfig` tokens to style Combobox, so that light/dark/system, compact/default/comfortable, nested provider, custom token, and RTL contexts work without component-level theme props.
18. As a design-system lead, I want stable `data-slot` and state attributes, so that downstream styles, tests, and registry consumers can target root, label, group, input, button, icon, popover, listbox, item, item indicator, description, error, and empty slots.
19. As an accessibility reviewer, I want React Aria to own combobox/listbox semantics, keyboard behavior, focus restoration, disabled option behavior, and announcement patterns, so that Dethink does not hand-roll fragile ARIA behavior.
20. As an accessibility reviewer, I want visible labels, descriptions, errors, invalid state, required state, and keyboard behavior documented, so that placeholder-only comboboxes are not presented as accessible defaults.
21. As a keyboard user, I want typing, arrow navigation, Enter/Space selection, Escape dismissal, Tab behavior, and focus restoration to work consistently.
22. As an RTL user, I want popover alignment, icon spacing, and input affordances to respect provider `dir`, so that localized forms do not need manual overrides.
23. As a mobile or tablet user, I want touch-friendly controls and responsive popover constraints, so that dense filters remain usable on smaller viewports.
24. As a Storybook user, I want examples for base, controlled selected value, controlled input text, custom values, disabled items, invalid/required, disabled/read-only, Field/Form usage, theme/density/RTL, empty results, settings filters, user/role pickers, and AI model pickers.
25. As a registry consumer, I want accurate registry metadata with the React Aria runtime dependency and Dethink base dependency, so that copied Combobox source installs cleanly.
26. As an SSR app developer, I want Combobox to render and hydrate without mismatch warnings, so that Next.js and Vite SSR consumers can use it.
27. As a maintainer, I want Combobox v1 to stop short of async loading, multi-selection, tags, virtualization, and command palette behavior, so that the first searchable picker stays focused and shippable.

## Implementation Decisions

- The next high-impact component is Combobox because the repository
  high-impact order places it immediately after Select.
- Build a single-value Combobox family: `Combobox`, `ComboboxInput`,
  `ComboboxButton`, `ComboboxItem`, optional group/label/separator/empty
  anatomy where React Aria support and local API stability allow, class-name
  helpers, and public prop/data types.
- Use `react-aria-components` as the behavior substrate for ComboBox, Input,
  Button, Popover, ListBox, ListBoxItem, Label, FieldError, Text, validation,
  keyboard behavior, filtering hooks, selection, and form participation.
- Keep public API names consistent with Dethink Input and Select where
  practical: `value`, `defaultValue`, `onValueChange`, `inputValue`,
  `defaultInputValue`, `onInputValueChange`, `onOpenChange`, `name`,
  `disabled`, `readOnly`, `required`, `invalid`,
  `placeholder`, `items`, `disabledKeys`, `controlSize`, and `className`.
- Treat `value` as the selected string key and `inputValue` as the visible typed
  text. These are related but separate states.
- Support `allowsCustomValue` for free-text submission where React Aria
  supports it, but keep creatable option management and tag creation out of
  scope.
- Support local filtering through React Aria-compatible filtering, but keep
  remote async loading, debouncing contracts, and fuzzy search engines out of
  scope for v1.
- Support empty result presentation without introducing an async loading API.
- Preserve native form participation through React Aria form support and verify
  `name` with `formValue` key/text behavior.
- Reuse the Select provider-aware portal strategy so Combobox popovers inherit
  Dethink provider theme, density, direction, custom token, and nested provider
  context.
- Use provider-level theme tokens only: `background`, `foreground`, `muted`,
  `muted-foreground`, `border`, `input`, `ring`, `primary`,
  `primary-foreground`, `destructive`, `destructive-foreground`, spacing,
  radius, `density-control`, and `density-gap`.
- Do not add a component-level theme prop. Theme, density, nested theme scope,
  and custom token overrides are owned by `DethinkProvider`.
- Use component-scoped CSS variables only for local geometry such as trigger
  width, popover max height, item indicator size, and input/button layout.
- Registry metadata should declare `react-aria-components` and `dethink-base`.
  Do not introduce Radix, cmdk, Floating UI, or search-runtime dependencies for
  Combobox v1.

## Theming Token Plan

Provider-level theming is already implemented through `DethinkProvider`,
`themeConfig`, `data-theme`, `data-density`, `dir`, and the `dethink-base`
registry item. Combobox should consume that contract directly.

Required token coverage:

- Input surface: `background`, `foreground`, `input`, `border`, `ring`, and
  radius tokens.
- Placeholder and metadata: `muted-foreground`.
- Trigger button and icon: `muted-foreground`, `foreground`, `muted`, and
  logical spacing tokens.
- Popover and listbox surface: `background`, `foreground`, `border`, radius,
  shadow utilities, and local max-height geometry.
- Option hover/focus: `muted`, `foreground`, and `ring`.
- Selected option: `primary`, `primary-foreground`, and selected indicator
  color tokens.
- Empty results: `muted-foreground` and spacing tokens.
- Invalid state: `destructive`, `destructive-foreground`, and `ring`.
- Disabled/read-only state: `muted`, `muted-foreground`, opacity utilities, and
  state data attributes.
- Density and touch targets: `--dt-density-control` and `--dt-density-gap`.
- Spacing and icon gaps: `--dt-space-*` and logical padding utilities.

Storybook and docs should show light, dark, system, compact, default,
comfortable, nested provider scope, custom `themeConfig`, and RTL examples.

## Testing Decisions

- Tests should assert public behavior, accessible roles/names/states, keyboard
  interactions, native form submission, provider-token behavior, and stable
  slots rather than private implementation details.
- Render tests should cover controlled/uncontrolled selected value,
  controlled/uncontrolled input text, user-driven open state,
  placeholder, disabled, read-only, required, invalid, `name`, `formValue`,
  `items`, static children, disabled options, custom values, empty results,
  className composition, refs, and stable data slots.
- Interaction tests should cover typing to filter, opening/closing, option
  selection, Escape dismissal, focus restoration, keyboard navigation, disabled
  option skipping, custom value behavior, empty result behavior, and manual
  trigger behavior where supported.
- Accessibility tests should cover axe smoke for labeled Combobox,
  invalid/error Combobox, disabled/read-only examples, empty results, and no
  missing accessible names.
- SSR tests should cover server rendering and hydration without mismatch
  warnings, including data-driven items.
- Storybook should cover visual variants, state coverage, realistic
  settings/filter/role/model picker examples, provider theme/density/RTL
  stories, and interaction play tests for typing, selecting, keyboard
  navigation, custom value, and disabled/read-only behavior.
- Registry and playground smoke should verify package exports, copied registry
  files, dependency metadata, aliases, style imports, provider token reliance,
  and clean consumer imports.

## Out of Scope

- Select, NativeSelect, MultiSelect, AsyncSelect, TagInput, TreeSelect, command
  palette, standalone Listbox, remote loading contracts, loading spinners,
  debounced queries, infinite scroll, virtualization, fuzzy-search engines, and
  creatable option persistence.
- Form library adapters, validation schema resolvers, server action
  orchestration, dirty/touched state, and global error summaries.
- Overlay manager, generic Portal abstraction, Dialog/Popover generalization,
  Tooltip, DropdownMenu, and focus trap primitives.
- Component-level theme props or brand-specific themes outside
  `DethinkProvider`.
- Multi-value state, chips, tag rendering, selected item collections, and remove
  buttons.

## Further Notes

- Priority source: `docs/high-impact-component-priority.md`, where Combobox
  follows Select.
- Research source: Context7 React Aria docs for ComboBox props including
  selected value, input value, items/defaultItems, `allowsCustomValue`,
  `allowsEmptyCollection`, `defaultFilter`, `disabledKeys`, `formValue`,
  `menuTrigger`, validation, keyboard behavior, and form participation.
- Existing repo prior art: Select uses React Aria popover/listbox behavior and
  provider-aware portal theming; Input defines control sizing and
  invalid/read-only state; FormField defines labels, descriptions, errors, and
  grouping; DethinkProvider owns theme, density, direction, and custom token
  overrides.
