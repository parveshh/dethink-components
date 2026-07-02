# Combobox Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/109
- AFK Combobox contract and local planning docs: https://github.com/parveshh/dethink-components/issues/110
- AFK Combobox primitive source, tests, registry, and base stories: https://github.com/parveshh/dethink-components/issues/111
- AFK Combobox filtering, custom values, disabled items, and keyboard behavior: https://github.com/parveshh/dethink-components/issues/112
- AFK Combobox Field/form integration, provider theming, docs, and final verification: https://github.com/parveshh/dethink-components/issues/113

## Branch Stack

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

## Proposed Breakdown

1. **Title**: Combobox contract and local planning docs (#110)
   **Type**: AFK
   **Blocked by**: #109
   **User stories covered**: 1-27

2. **Title**: Combobox primitive source, tests, registry, and base stories (#111)
   **Type**: AFK
   **Blocked by**: #110
   **User stories covered**: 1-8, 12-21, 23-27

3. **Title**: Combobox filtering, custom values, disabled items, and keyboard behavior (#112)
   **Type**: AFK
   **Blocked by**: #111
   **User stories covered**: 4, 6-12, 18-24, 27

4. **Title**: Combobox Field/form integration, provider theming, docs, and final verification (#113)
   **Type**: AFK
   **Blocked by**: #112
   **User stories covered**: 2, 13-27

## Published Issue #110

## What to build

Create the local contract and planning documents for the Combobox PRD. The docs
should define the single-value searchable picker component family, public API,
React Aria behavior substrate, Dethink Input/Select/Form prop conventions,
provider-level theming and density token contract, registry expectations,
testing seams, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation
examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification defines Combobox, item anatomy, optional collection anatomy, class-name helpers, and public prop/data types.
- [ ] The local PRD mirrors the approved GitHub PRD decisions and links back to parent PRD issue #109.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues after publication.
- [ ] The docs define selected value state with `value`, `defaultValue`, and `onValueChange`.
- [ ] The docs define input text state with `inputValue`, `defaultInputValue`, and `onInputValueChange`.
- [ ] The docs define controlled and uncontrolled menu state with `open`, `defaultOpen`, and `onOpenChange`.
- [ ] The docs define `name`, `formValue`, `required`, `disabled`, `readOnly`, `invalid`, `placeholder`, `items`, `disabledKeys`, `controlSize`, `allowsCustomValue`, `defaultFilter`, `menuTrigger`, refs, className composition, and native form participation.
- [ ] The docs define React Aria internals while keeping the public API familiar to Dethink Input, Select, and shadcn-style consumers.
- [ ] The docs define provider-level theming through existing theme, density, direction, and `themeConfig` context without a component-level theme prop.
- [ ] The docs list semantic token usage for background, foreground, muted, muted foreground, border, input, ring, primary, primary foreground, destructive, spacing, radius, density control, and density gap tokens.
- [ ] The docs define Field/Form composition, validation display, labels, descriptions, errors, empty results, disabled/read-only states, RTL, responsive behavior, and out-of-scope boundaries.
- [ ] The docs clearly separate this PRD from Select, NativeSelect, MultiSelect, AsyncSelect, TagInput, command palette, virtualization, async loading, fuzzy search engines, and global overlay abstractions.
- [ ] The docs list render, interaction, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #109

## Published Issue #111

## What to build

Build the core Combobox primitive path for searchable single selection. The
completed slice should provide the root Combobox and item components backed by
React Aria ComboBox/ListBox behavior, support controlled and uncontrolled
selected value, input text, and open state, preserve native form participation,
expose stable slots, use provider-level theme and density tokens, and include
focused tests, Storybook examples, registry metadata, and package exports for
the base path.

## Acceptance criteria

- [ ] Combobox and item components are exported with public prop/data types and class-name helpers.
- [ ] Combobox supports `value`, `defaultValue`, `onValueChange`, `inputValue`, `defaultInputValue`, `onInputValueChange`, `open`, `defaultOpen`, `onOpenChange`, `name`, `formValue`, `placeholder`, `controlSize`, `disabled`, `readOnly`, `required`, and `invalid`.
- [ ] Combobox maps string values to React Aria selected keys and keeps visible typed text separate from selected value.
- [ ] Combobox exposes submitted values through `name` and verifies key/text behavior through `formValue` where supported.
- [ ] Combobox supports static children and a basic data-driven `items` render function for simple option lists.
- [ ] Combobox forwards relevant refs, composes consumer className, preserves ARIA relationships, and exposes stable slot/state data attributes for root, label, input group, input, button, icon, popover, listbox, item, item indicator, description, and error.
- [ ] Combobox styles input, button, icon, popover, listbox, item, selected item, focus-visible, hover, invalid, disabled, read-only, required, density, dark mode, and RTL states using provider-level tokens only.
- [ ] Combobox popovers inherit provider theme, density, direction, and custom token context without a component-level theme prop.
- [ ] Registry metadata declares the React Aria runtime dependency and the Dethink base registry dependency accurately.
- [ ] Render tests cover controlled/uncontrolled selected value, controlled/uncontrolled input value, controlled/uncontrolled open state, placeholder, submitted name/value, disabled, read-only, required, invalid, refs, className composition, static options, and basic data-driven options.
- [ ] Accessibility and SSR tests cover visible labels, no missing accessible names in examples, axe smoke, data-driven SSR, and hydration without mismatch warnings.
- [ ] Storybook examples cover base Combobox, controlled selected value, controlled input text, placeholder, invalid/required, disabled/read-only, and basic settings/filter usage.
- [ ] Playground smoke coverage exercises Combobox through the package export path.

## Blocked by

- #110

## Published Issue #112

## What to build

Expand Combobox beyond the base path to cover filtering behavior, custom
values, empty results, disabled options, menu trigger modes, robust data-driven
collections, keyboard interaction coverage, focus restoration, responsive
constraints, and RTL-safe menu behavior.

## Acceptance criteria

- [ ] Combobox supports `items` with render-function children for data-driven option collections.
- [ ] Combobox supports static option markup with item anatomy and any approved group/label/separator anatomy from the contract slice.
- [ ] Combobox supports local filtering through a React Aria-compatible filter path without adding a fuzzy-search or command-menu runtime dependency.
- [ ] Combobox supports `allowsCustomValue` and documents how custom typed values differ from selected keyed options.
- [ ] Combobox supports empty result rendering with stable slot data and accessible messaging.
- [ ] Combobox supports `disabledKeys` and item-level disabled state; disabled options remain visible, are announced appropriately, and cannot be selected.
- [ ] Combobox supports practical menu trigger behavior for typing, focus/manual opening, and trigger button opening where React Aria supports it.
- [ ] Keyboard behavior covers typing to filter, opening, closing, option navigation, selection with Enter/Space, Escape dismissal, Tab behavior, focus restoration to the input, disabled option skipping, and custom value behavior.
- [ ] Pointer behavior covers opening, selecting, outside dismissal, disabled item behavior, and focus-visible preservation.
- [ ] Popover/listbox geometry handles trigger-width matching, max height, scrolling, viewport collision behavior, long labels, tablet/mobile widths, density, and RTL-safe alignment.
- [ ] Stable data attributes expose open, selected, disabled, focused, focus-visible, hovered, pressed, invalid, required, read-only, size, custom value, empty state, and slot state where applicable.
- [ ] Tests cover data-driven options, static children, disabled options, local filtering, empty results, custom values, keyboard navigation, menu trigger behavior, menu dismissal, focus restoration, long option labels, responsive menu constraints, and RTL-safe rendering.
- [ ] Storybook examples cover filtered options, custom value input, empty results, disabled options, long option labels, dashboard filters, user pickers, role/permission pickers, and AI model pickers.

## Blocked by

- #111

## Published Issue #113

## What to build

Finish Combobox as an installable, documented, provider-themed component. This
slice should complete Field/Form composition, validation display,
label/description/error examples, native form submission examples,
provider-level light/dark/system theme coverage, density coverage, nested/custom
themeConfig coverage, RTL coverage, documentation, Storybook interaction tests,
registry/playground smoke checks, and final verification.

## Acceptance criteria

- [ ] Combobox composes with Field/Form primitives for visible labels, descriptions, errors, invalid state, required state, disabled state, read-only state, generated IDs, explicit IDs, and ARIA relationships.
- [ ] Combobox examples verify native form submission through `name`, selected string values, typed text values, and `formValue` key/text behavior where supported.
- [ ] Provider-level theme stories cover light, dark, system, compact, default, comfortable, nested provider scope, custom `themeConfig` tokens, and RTL direction.
- [ ] The implementation uses existing provider tokens for background, foreground, muted, muted foreground, border, input, ring, primary, primary foreground, destructive, spacing, radius, density control, and density gap; no component-level theme prop is added.
- [ ] Documentation covers overview, installation, anatomy, API, props, selected value versus input text, accessibility, keyboard behavior, filtering, custom values, empty results, theming tokens, density, RTL, Field/Form composition, recipes, testing, migration notes, and out-of-scope boundaries.
- [ ] Storybook includes base, controlled selected value, controlled input text, filtered results, custom values, empty results, disabled options, invalid/required, disabled/read-only, Field/Form, theme/density/RTL, settings card, dashboard filter, user picker, role picker, and AI model picker examples.
- [ ] Storybook interaction tests cover typing/filtering/selecting/closing, keyboard selection, invalid state, empty results, custom value behavior, disabled option behavior, focus restoration, disabled/read-only non-opening behavior, and at least one provider theme/density/RTL portal example where practical.
- [ ] Accessibility tests cover axe smoke for labeled Combobox, invalid/error Combobox, disabled/read-only examples, empty results, and no missing accessible names.
- [ ] SSR tests cover Combobox render and hydration without mismatch warnings.
- [ ] Registry validation and registry smoke verify copied source portability, dependency metadata, aliases, style imports, CSS variable reliance, package exports, provider-aware portal behavior, and clean consumer imports.
- [ ] Playground smoke coverage exercises Combobox through the package export path and provider theme path.
- [ ] Final verification commands pass or are documented with specific blockers.

## Blocked by

- #112
