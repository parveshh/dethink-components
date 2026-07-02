# Select Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/103
- AFK Select contract and local planning docs: https://github.com/parveshh/dethink-components/issues/104
- AFK Select primitive source, tests, registry, and base stories: https://github.com/parveshh/dethink-components/issues/105
- AFK Select collections, groups, disabled items, and menu behavior: https://github.com/parveshh/dethink-components/issues/106
- AFK Select Field/form integration, provider theming, docs, and final verification: https://github.com/parveshh/dethink-components/issues/107

## Branch Stack

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

## Proposed Breakdown

1. **Title**: Select contract and local planning docs (#104)
   **Type**: AFK
   **Blocked by**: #103
   **User stories covered**: 1-20

2. **Title**: Select primitive source, tests, registry, and base stories (#105)
   **Type**: AFK
   **Blocked by**: #104
   **User stories covered**: 1-7, 10-14, 16-20

3. **Title**: Select collections, groups, disabled items, and menu behavior (#106)
   **Type**: AFK
   **Blocked by**: #105
   **User stories covered**: 7-10, 12-17, 20

4. **Title**: Select Field/form integration, provider theming, docs, and final verification (#107)
   **Type**: AFK
   **Blocked by**: #106
   **User stories covered**: 2, 5, 11-20

## Published Issue #104

## What to build

Create the local contract and planning documents for the Select PRD. The docs
should define the single-select component family, public API, React Aria
behavior substrate, Dethink/Radix-like prop names, Form/Field composition,
provider-level theming and density token contract, registry expectations,
testing seams, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation
examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification defines Select, SelectItem, SelectGroup, SelectLabel, SelectSeparator, class-name helpers, and public prop/data types.
- [ ] The local PRD mirrors the approved GitHub PRD decisions and links back to the parent PRD issue after publication.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues after publication.
- [ ] The docs define controlled and uncontrolled selection with `value`, `defaultValue`, and `onValueChange`.
- [ ] The docs define controlled and uncontrolled menu state with `open`, `defaultOpen`, and `onOpenChange`.
- [ ] The docs define `name`, `required`, `disabled`, `readOnly`, `invalid`, `placeholder`, `items`, `disabledKeys`, `controlSize`, refs, className composition, and native form participation.
- [ ] The docs define React Aria internals while keeping the public API familiar to Dethink, shadcn, and Radix users.
- [ ] The docs define provider-level theming through existing theme, density, direction, and `themeConfig` context without a component-level theme prop.
- [ ] The docs list semantic token usage for background, foreground, muted, muted foreground, border, input, ring, primary, primary foreground, destructive, spacing, radius, density control, and density gap tokens.
- [ ] The docs define Field/Form composition, validation display, labels, descriptions, errors, grouped options, disabled/read-only states, RTL, responsive behavior, and out-of-scope boundaries.
- [ ] The docs clearly separate this PRD from NativeSelect, Combobox, MultiSelect, AsyncSelect, TagInput, virtualization, async loading, custom filtering, and global overlay abstractions.
- [ ] The docs list render, interaction, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #103

## Published Issue #105

## What to build

Build the core Select primitive path for single selection. The completed slice
should provide Select and SelectItem components backed by React Aria
select/listbox behavior, support controlled and uncontrolled selection and open
state, preserve native form participation, expose stable slots, use
provider-level theme and density tokens, and include focused tests, Storybook
examples, registry metadata, and package exports for the base Select path.

## Acceptance criteria

- [ ] Select and SelectItem are exported with public prop/data types and class-name helpers.
- [ ] Select supports `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, `name`, `placeholder`, `controlSize`, `disabled`, `readOnly`, `required`, and `invalid`.
- [ ] Select maps string values to React Aria selected keys and exposes submitted values through `name` in native form flows.
- [ ] Select supports static children and a basic data-driven `items` render function for simple option lists.
- [ ] Select forwards relevant refs, composes consumer className, preserves ARIA relationships, and exposes stable slot/state data attributes for root, trigger, value, icon, popover, listbox, item, and item indicator.
- [ ] Select styles trigger, value, icon, popover, listbox, item, selected item, focus-visible, hover, invalid, disabled, read-only, required, density, dark mode, and RTL states using provider-level tokens only.
- [ ] Select does not expose a component-level theme prop and does not introduce a Radix dependency.
- [ ] Registry metadata declares the React Aria runtime dependency and the Dethink base registry dependency accurately.
- [ ] Render tests cover controlled/uncontrolled value, controlled/uncontrolled open state, placeholder, submitted name/value, disabled, read-only, required, invalid, refs, className composition, static options, and basic data-driven options.
- [ ] Accessibility and SSR tests cover visible labels, no missing accessible names in examples, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base Select, controlled Select, placeholder, invalid/required, disabled/read-only, and basic settings/filter usage.
- [ ] Playground smoke coverage exercises Select through the package export path.

## Blocked by

- #104

## Published Issue #106

## What to build

Expand Select beyond the base path to cover full option collection behavior.
This slice should add robust data-driven collections, static option groups,
labels, separators, disabled options, menu sizing and alignment, keyboard
interaction coverage, typeahead behavior from React Aria, focus restoration,
responsive constraints, and RTL-safe menu behavior.

## Acceptance criteria

- [ ] Select supports `items` with render-function children for data-driven option collections.
- [ ] Select supports static option markup with SelectItem, SelectGroup, SelectLabel, and SelectSeparator.
- [ ] Select supports `disabledKeys` and item-level disabled state; disabled options remain visible, are announced appropriately, and cannot be selected.
- [ ] Group labels and separators render with stable slots and do not create misleading selectable options.
- [ ] Keyboard behavior covers opening, closing, option navigation, selection with Enter/Space, Escape dismissal, focus restoration to the trigger, disabled option skipping, and React Aria typeahead behavior.
- [ ] Pointer behavior covers opening, selecting, outside dismissal, disabled item behavior, and focus-visible preservation.
- [ ] Popover/listbox geometry handles trigger-width matching, max height, scrolling, viewport collision behavior, long labels, tablet/mobile widths, density, and RTL-safe alignment.
- [ ] Stable data attributes expose open, selected, disabled, focused, focus-visible, hovered, pressed, invalid, required, read-only, size, and slot state where applicable.
- [ ] Tests cover data-driven options, static children, groups, labels, separators, disabled options, long option labels, keyboard navigation, typeahead, menu dismissal, focus restoration, responsive menu constraints, and RTL-safe rendering.
- [ ] Storybook examples cover grouped options, disabled options, long option labels, settings lists, dashboard filters, role/permission pickers, and AI model pickers.

## Blocked by

- #105

## Published Issue #107

## What to build

Finish Select as an installable, documented, provider-themed component. This
slice should complete Field/Form composition, validation display,
label/description/error examples, native form submission examples,
provider-level light/dark/system theme coverage, density coverage, nested/custom
themeConfig coverage, RTL coverage, documentation, Storybook interaction tests,
registry/playground smoke checks, and final verification.

## Acceptance criteria

- [ ] Select composes with Field/Form primitives for visible labels, descriptions, errors, invalid state, required state, disabled state, read-only state, generated IDs, explicit IDs, and ARIA relationships.
- [ ] Select examples verify native form submission through `name` and selected string values.
- [ ] Provider-level theme stories cover light, dark, system, compact, default, comfortable, nested provider scope, custom `themeConfig` tokens, and RTL direction.
- [ ] The implementation uses existing provider tokens for background, foreground, muted, muted foreground, border, input, ring, primary, primary foreground, destructive, spacing, radius, density control, and density gap; no component-level theme prop is added.
- [ ] Documentation covers overview, installation, anatomy, API, props, accessibility, keyboard behavior, theming tokens, density, RTL, Field/Form composition, recipes, testing, migration notes, and out-of-scope boundaries.
- [ ] Storybook includes base, controlled, grouped, disabled options, invalid/required, disabled/read-only, Field/Form, theme/density/RTL, settings card, dashboard filter, role picker, and AI model picker examples.
- [ ] Storybook interaction tests cover open/select/close, keyboard selection, invalid state, disabled option behavior, focus restoration, and at least one provider theme/density example where practical.
- [ ] Accessibility tests cover axe smoke for labeled Select, invalid/error Select, grouped options, disabled/read-only examples, and no missing accessible names.
- [ ] SSR tests cover Select render and hydration without mismatch warnings.
- [ ] Registry validation and registry smoke verify copied source portability, dependency metadata, aliases, style imports, CSS variable reliance, package exports, and clean consumer imports.
- [ ] Playground smoke coverage exercises Select through the package export path and provider theme path.
- [ ] Final verification commands pass or are documented with specific blockers.

## Blocked by

- #106
