# Checkbox, RadioGroup, And Switch PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/91.

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

## Problem Statement

Teams building production SaaS dashboards, internal tools, B2B applications,
auth screens, settings pages, CRUD filters, permissions workflows, feature
flags, onboarding forms, and AI-native configuration surfaces need dependable
choice controls after text-entry controls.

Dethink now has Form and Field primitives plus native text-entry controls, but
boolean choices, grouped single-choice questions, and on/off settings still
require ad hoc markup. Without first-class Checkbox, RadioGroup, and Switch
components, every form repeats native input wiring, checked-state styling,
mixed-state handling, grouped radio naming, switch semantics, disabled/read-only
treatment, invalid styling, FieldControl composition, Storybook examples,
registry metadata, and tests.

## Solution

Ship Checkbox, RadioGroup, RadioGroupItem, and Switch as dependency-free,
native-input-backed choice controls for `@dethink/components`. They should work
standalone or inside FieldControl, forward refs to the underlying native input,
preserve browser and form-library behavior, expose stable data attributes,
support token-backed Tailwind styling, compose consumer classes, and install
cleanly through separate shadcn-style registry items.

Checkbox covers boolean and indeterminate choices. RadioGroup covers one choice
from a mutually exclusive set. Switch covers binary on/off settings with switch
semantics and no mixed state. The components should lean on Form and Field for
labels, descriptions, errors, required markers, fieldsets, legends, and group
semantics. This PRD should not introduce a value-managing CheckboxGroup,
validation library, form-state adapter, toggle group, segmented control, select,
combobox, slider, permission matrix, or settings page block.

## User Stories

1. As a frontend engineer, I want a Checkbox component, so that boolean form choices use consistent Dethink styling and native semantics.
2. As a frontend engineer, I want Checkbox to support an indeterminate state, so that select-all and partial-selection flows can be represented accurately.
3. As a frontend engineer, I want a RadioGroup component, so that mutually exclusive options share one consistent value and layout contract.
4. As a frontend engineer, I want RadioGroupItem, so that each radio option preserves native input behavior while matching Dethink visuals.
5. As a frontend engineer, I want a Switch component, so that on/off settings have clear switch semantics and consistent visuals.
6. As a form builder, I want these controls to work inside FieldControl, so that labels, descriptions, errors, invalid state, disabled state, required state, and read-only state are wired once through FormField.
7. As a form builder, I want these controls to work without FieldControl, so that simple native forms remain possible.
8. As a package consumer, I want refs forwarded to the native input, so that apps can focus controls and integrate with form libraries.
9. As a package consumer, I want native attributes preserved, so that `id`, `name`, `value`, `checked`, `defaultChecked`, `required`, `disabled`, `readOnly`, `form`, and ARIA attributes work normally where relevant.
10. As a package consumer, I want controlled and uncontrolled usage, so that Dethink does not invent a form-state API.
11. As a package consumer, I want `onCheckedChange` for Checkbox and Switch, so that boolean state can be handled without reading native events in common cases.
12. As a package consumer, I want native `onChange` handlers preserved, so that form libraries and analytics hooks can still observe input events.
13. As a package consumer, I want `onValueChange` for RadioGroup, so that radio selection can be handled at the group level.
14. As a design-system lead, I want token-backed Tailwind classes, so that choice controls match Input, Button, Card, DateTimePicker, and FormField.
15. As a design-system lead, I want stable data attributes, so that downstream styles and tests can target slots and states predictably.
16. As a design-system lead, I want density-aware sizing, so that compact, default, and comfortable forms remain coherent.
17. As a design-system lead, I want dark mode support, so that settings and admin forms work in product dashboards.
18. As a design-system lead, I want RTL-safe layout, so that localized settings rows and filter panels do not need overrides.
19. As an accessibility reviewer, I want native inputs preserved, so that browser and assistive technology behavior remains reliable.
20. As an accessibility reviewer, I want Checkbox mixed state exposed programmatically, so that partially selected groups are announced correctly.
21. As an accessibility reviewer, I want RadioGroup examples to use visible group labels, so that users understand what the option set controls.
22. As an accessibility reviewer, I want Switch labels to remain stable when state changes, so that screen-reader users are not disoriented.
23. As an accessibility reviewer, I want invalid styling to respond to `aria-invalid` and `data-invalid`, so that FieldControl and standalone usage both work.
24. As an accessibility reviewer, I want obvious focus-visible styles, so that keyboard users can locate the active control.
25. As an accessibility reviewer, I want disabled and read-only states to be distinct without removing necessary context.
26. As a settings-page engineer, I want Switch to compose with horizontal Field rows, so that feature flags and preferences scan cleanly.
27. As a permissions engineer, I want Checkbox groups to compose with FieldSet and FieldGroup, so that permission lists have a visible group label and shared help/error text.
28. As a filter-panel engineer, I want Checkbox and RadioGroup examples for filters, so that dashboard filters can be built without bespoke control markup.
29. As an auth-flow engineer, I want Checkbox examples for terms, remembered devices, and communication preferences, so that auth forms stay native and accessible.
30. As an AI product engineer, I want Switch and RadioGroup examples for model settings, tool permissions, and response modes, so that AI settings use the same form contract.
31. As a Storybook user, I want examples for base controls, controlled state, invalid fields, disabled/read-only fields, grouped choices, density, dark mode, RTL, and realistic settings/filter patterns, so that I can copy production-ready snippets.
32. As a registry consumer, I want separate registry metadata for Checkbox, RadioGroup, and Switch, so that copied source has accurate dependencies and consumers can install only what they need.
33. As a future Select/Combobox implementer, I want checked-control focus, invalid, and density patterns settled, so that later selection controls feel consistent.
34. As a future settings-block implementer, I want Switch and Checkbox row patterns settled, so that settings blocks can compose lower-level controls.
35. As a maintainer, I want no Radix, React Aria, CSS-in-JS, validation, or form-state dependency in v1, so that these primitives remain portable through the registry.
36. As a maintainer, I want CheckboxGroup value management left out of v1, so that group state APIs are not invented before real usage validates them.
37. As an SSR app developer, I want these controls to render and hydrate without mismatch warnings, so that Next.js and Vite SSR consumers can use them safely.
38. As a QA engineer, I want tests for native form participation, refs, class merging, controlled/uncontrolled state, mixed state, group value changes, invalid/disabled/read-only states, keyboard behavior, SSR, a11y smoke, Storybook examples, registry metadata, and playground smoke, so that choice-control regressions are caught early.

## Implementation Decisions

- The selected next candidate is Checkbox, RadioGroup, and Switch because the high-impact roadmap places this group immediately after Input, Textarea, and NumberInput, and it unlocks settings, filters, permissions, auth, CRUD, and AI configuration flows.
- The component family is Checkbox, RadioGroup, RadioGroupItem, and Switch.
- Exports should include each component, class-name helpers, and public prop/state types.
- Checkbox should preserve a native checkbox input, forward refs to that input, compose className, expose `data-slot="checkbox"`, render a visual indicator, and preserve native checkbox attributes.
- Checkbox should support `checked`, `defaultChecked`, `onCheckedChange`, native `onChange`, and an indeterminate state represented as `"indeterminate"`.
- Checkbox should expose mixed state through native `indeterminate` and `aria-checked="mixed"` while preserving native form behavior for checked values.
- RadioGroup should provide shared `name`, `value`, `defaultValue`, `onValueChange`, `orientation`, `disabled`, `required`, `invalid`, `readOnly`, and size state to RadioGroupItem controls.
- RadioGroupItem should preserve a native radio input, require a string `value`, forward refs to the input, compose className, expose stable slot data, and inherit group state when present.
- Switch should preserve a native checkbox input, forward refs to that input, compose className, expose `data-slot="switch"`, render a track and thumb, and expose switch semantics.
- Switch should support controlled and uncontrolled boolean state with `checked`, `defaultChecked`, and `onCheckedChange`; it should not support indeterminate state.
- Read-only state should be handled consistently across choice controls as a Dethink UI state: focusable, visually read-only, submitted with the form when named, and prevented from changing by user interaction.
- The controls should work as direct children of FieldControl and should not duplicate label, description, error, required-marker, fieldset, or legend APIs.
- Multiple-checkbox groups should use existing FieldSet, FieldLegend, and FieldGroup primitives in v1 instead of adding a value-managing CheckboxGroup component.
- Control styling should use Tailwind CSS v4 utilities, semantic tokens, density variables, explicit class maps, shared class merging, and stable data attributes.
- Controls should style checked, unchecked, indeterminate, focus-visible, invalid, disabled, read-only, required, density, dark mode, and RTL states consistently.
- Registry metadata should be split into `checkbox`, `radio-group`, and `switch`; each item should be dependency-free beyond `dethink-base`.
- V1 excludes CheckboxGroup value management, permission matrices, segmented controls, toggle groups, sliders, selects, comboboxes, validation engines, form-library adapters, animation dependencies, and block-level settings pages.

## Testing Decisions

- Tests should assert public DOM behavior, native semantics, form participation, and accessibility relationships rather than private implementation details.
- Render tests should cover native input presence, forwarded refs, native attribute passthrough, controlled/uncontrolled state, `name`/`value` form participation, class merging, disabled, readOnly, required, invalid, focus-visible-compatible state attributes, size options, orientation options, and stable slot data.
- Checkbox tests should cover boolean checked state, indeterminate state, `aria-checked="mixed"`, native `indeterminate`, `onCheckedChange`, native `onChange` preservation, disabled/read-only behavior, required behavior, and Space toggling.
- RadioGroup tests should cover group value/defaultValue, item values, shared name, onValueChange, disabled group, disabled item, required state, invalid state, read-only state, orientation, native form submission, label association, and keyboard behavior available through native radio inputs.
- Switch tests should cover binary checked state, no mixed state, switch semantics, stable label examples, track/thumb data states, disabled/read-only behavior, required behavior, native form submission, and Space toggling.
- Integration tests should cover usage as direct children of FieldControl, including generated and explicit IDs, `aria-describedby`, `aria-invalid`, `aria-errormessage`, disabled, read-only, and required propagation.
- Group integration tests should cover FieldSet, FieldLegend, FieldDescription, FieldError, and FieldGroup composition for checkbox groups, radio groups, and switch groups.
- Accessibility tests should cover axe smoke for visible-label examples, grouped controls, invalid/error examples, mixed checkbox state, switch examples with stable labels, disabled/read-only examples, and no misleading custom widget roles.
- SSR tests should cover server rendering and hydration without mismatch warnings.
- Storybook should cover Checkbox, RadioGroup, Switch, FieldControl integration, controlled examples, invalid/required/disabled/read-only states, grouped choices, FieldSet/Legend composition, density, dark mode, RTL, and realistic auth/settings/filter/permissions examples.
- Registry validation and smoke should verify metadata, exported files, dependency-free copied source, aliases, CSS variables, stable data attributes, and clean consumer import behavior.
- Prior art in this repo includes FormField for label/help/error/group wiring, Input/Textarea/NumberInput for native control sizing/state conventions, Button/IconButton for stateful actions and class helpers, Card for realistic settings examples, and existing registry smoke coverage.

## Out of Scope

- Select, NativeSelect, Combobox, MultiSelect, AsyncSelect, TagInput, Slider, ToggleGroup, SegmentedControl, Listbox, Rating, and toolbar radio behavior.
- A standalone value-managing CheckboxGroup component in v1.
- Permission matrix, feature flag dashboard, settings page block, filter bar block, or AI settings block.
- Validation engines, schema resolvers, dirty/touched state, form submission orchestration, server actions, global error summaries, or form-library adapters.
- Animated switch transitions beyond simple tokenized CSS transitions.
- Public icon slots, custom label rendering, tooltip help, command/search behavior, or input adornments.
- CSS-in-JS, runtime style parsers, Radix UI dependencies, React Aria dependencies, Motion dependencies, masking libraries, or formatting libraries.

## Further Notes

- Context7 was used first, logged in, and resolved `/shadcn-ui/ui` as the primary shadcn-compatible reference for Checkbox, RadioGroup, Switch, and FormField composition patterns.
- shadcn/ui examples use `checked` and `onCheckedChange` for Checkbox and Switch, `value`/`onValueChange` patterns for radio groups, and FormField composition with `aria-invalid` plus grouped field primitives.
- WAI-ARIA APG Checkbox guidance supports dual-state and tri-state checkbox behavior, Space toggling, `aria-checked="mixed"`, labels, and group descriptions.
- WAI-ARIA APG Radio Group guidance supports mutually exclusive radio options, group labels, Space selection, arrow-key behavior, and group/item descriptions.
- WAI-ARIA APG Switch guidance distinguishes switch on/off semantics from checkbox checked/unchecked semantics, requires stable labels, and includes an HTML checkbox-input implementation for switches.
