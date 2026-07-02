# Checkbox, RadioGroup, And Switch Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/91
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/92
- AFK Checkbox primitive source, tests, registry, and stories: https://github.com/parveshh/dethink-components/issues/93
- AFK RadioGroup primitive source, tests, registry, and stories: https://github.com/parveshh/dethink-components/issues/94
- AFK Switch primitive source, tests, registry, and stories: https://github.com/parveshh/dethink-components/issues/95
- AFK suite integration, docs, and final verification: https://github.com/parveshh/dethink-components/issues/96

## Branch Stack

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

## Proposed Breakdown

1. **Title**: Choice controls contract and local planning docs (#92)  
   **Type**: AFK  
   **Blocked by**: #91  
   **User stories covered**: 1-38

2. **Title**: Checkbox primitive source, tests, registry, and stories (#93)  
   **Type**: AFK  
   **Blocked by**: #92  
   **User stories covered**: 1-2, 6-12, 14-20, 23-25, 27-29, 31-38

3. **Title**: RadioGroup primitive source, tests, registry, and stories (#94)  
   **Type**: AFK  
   **Blocked by**: #93  
   **User stories covered**: 3-4, 6-10, 13-19, 21, 23-25, 28, 30-38

4. **Title**: Switch primitive source, tests, registry, and stories (#95)  
   **Type**: AFK  
   **Blocked by**: #94  
   **User stories covered**: 5-12, 14-19, 22-26, 30-38

5. **Title**: Choice controls suite integration, docs, and final verification (#96)  
   **Type**: AFK  
   **Blocked by**: #95  
   **User stories covered**: 6-7, 14-38

## Published Issue #92

## What to build

Create the local contract and planning documents for the Checkbox, RadioGroup,
and Switch PRD. The docs should define the native-input-backed choice controls,
public component family, accessibility and FormField integration contracts,
Checkbox mixed-state boundaries, RadioGroup value boundaries, Switch semantic
boundaries, registry expectations, testing seams, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation
examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification defines Checkbox, RadioGroup, RadioGroupItem, Switch, class-name helpers, and public prop/state types.
- [ ] The local PRD mirrors the approved GitHub PRD decisions and links back to the parent PRD issue after publication.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues after publication.
- [ ] The docs define native input preservation, native attribute passthrough, ref forwarding, class merging, controlled/uncontrolled behavior, and native form participation.
- [ ] The docs define FieldControl, FieldSet, FieldLegend, FieldGroup, FieldDescription, and FieldError integration without duplicating FormField APIs.
- [ ] The docs define invalid, disabled, read-only, required, focus-visible, density, dark mode, RTL, responsive, checked, unchecked, indeterminate, and orientation styling expectations.
- [ ] The docs define Checkbox mixed state, RadioGroup group/name/value behavior, and Switch binary-only semantics.
- [ ] The docs clearly separate this PRD from CheckboxGroup value management, Select, Combobox, Slider, ToggleGroup, SegmentedControl, validation engines, schema libraries, and form-library adapters.
- [ ] The docs list render, integration, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #91

## Published Issue #93

## What to build

Build the Checkbox primitive as the first native choice control. The completed
slice should provide a styled native-checkbox-backed control that works
standalone and as a direct FieldControl child, forwards refs to the native
input, preserves native checkbox attributes, supports boolean and indeterminate
state, composes classes, exposes stable data attributes, and includes focused
tests, Storybook examples, registry metadata, and package exports for the
Checkbox path.

## Acceptance criteria

- [ ] Checkbox preserves a native checkbox input, forwards refs to that input, composes className, exposes stable slot data, and preserves native checkbox attributes.
- [ ] Checkbox supports controlled `checked`, uncontrolled `defaultChecked`, `onCheckedChange`, native `onChange`, and `CheckboxCheckedState` with `boolean | "indeterminate"`.
- [ ] Checkbox exposes indeterminate state through native `indeterminate`, `aria-checked="mixed"`, visual indicator state, and stable data attributes.
- [ ] Checkbox supports the approved control sizing and state data attributes without breaking native `disabled`, `readOnly`, `required`, `name`, `value`, checked, or defaultChecked behavior.
- [ ] Checkbox styles unchecked, checked, indeterminate, focus-visible, invalid, disabled, read-only, required, density, dark mode, and RTL states using token-backed Tailwind classes.
- [ ] Checkbox works as a direct child of FieldControl and inherits `id`, `aria-describedby`, `aria-invalid`, `aria-errormessage`, disabled, required, and read-only behavior from Field.
- [ ] Checkbox class-name helper and public prop/state types are exported from the component and package entry points.
- [ ] Registry metadata exists for Checkbox with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Render tests cover native attributes, controlled/uncontrolled checked state, indeterminate state, ref forwarding, native form participation, class merging, invalid/disabled/read-only/required state, Space toggling, native `onChange`, `onCheckedChange`, and FieldControl integration.
- [ ] Accessibility and SSR tests cover visible labels, invalid/error wiring through FieldControl, mixed state, grouped checkbox examples, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base Checkbox, indeterminate Checkbox, controlled Checkbox, FieldControl composition, invalid/required, disabled/read-only, checkbox groups with FieldSet/FieldGroup, density, dark mode, RTL, and realistic auth/settings/filter usage.
- [ ] Playground smoke coverage exercises Checkbox through the package export path.

## Blocked by

- #92

## Published Issue #94

## What to build

Build the RadioGroup primitive as the mutually exclusive choice control. The
completed slice should provide RadioGroup and RadioGroupItem components backed
by native radio inputs, support controlled and uncontrolled string values,
compose with FieldSet/FieldLegend for accessible group names, preserve native
radio behavior and form submission, expose stable data attributes, and include
focused tests, Storybook examples, registry metadata, and package exports for
the RadioGroup path.

## Acceptance criteria

- [ ] RadioGroup provides shared `name`, `value`, `defaultValue`, `onValueChange`, orientation, size, disabled, read-only, required, and invalid state to nested RadioGroupItem controls.
- [ ] RadioGroupItem preserves a native radio input, requires a string value, forwards refs to that input, composes className, exposes stable slot data, and preserves relevant native radio attributes.
- [ ] RadioGroup supports controlled and uncontrolled selection without inventing a form-state API.
- [ ] RadioGroupItem supports item-level disabled and invalid state while inheriting group-level disabled, read-only, required, invalid, name, and size state.
- [ ] RadioGroup and RadioGroupItem style unchecked, checked, focus-visible, invalid, disabled, read-only, required, density, dark mode, RTL, and orientation states using token-backed Tailwind classes.
- [ ] RadioGroup composes with FieldSet, FieldLegend, FieldDescription, FieldError, FieldGroup, and FieldControl for group labels, descriptions, invalid state, and errors.
- [ ] RadioGroup class-name helpers and public prop/state types are exported from the component and package entry points.
- [ ] Registry metadata exists for RadioGroup with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Render tests cover group value/defaultValue, item values, shared name, onValueChange, native `onChange`, ref forwarding, native form participation, class merging, invalid/disabled/read-only/required state, orientation, and FieldSet/FieldControl integration.
- [ ] Keyboard tests cover native radio selection behavior, Space selection, and arrow-key behavior supported by radios sharing a name.
- [ ] Accessibility and SSR tests cover visible group labels, item labels, invalid/error wiring through FormField primitives, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base RadioGroup, controlled RadioGroup, horizontal and vertical layouts, FieldSet/Legend composition, invalid/required, disabled/read-only, density, dark mode, RTL, and realistic settings/filter/model-choice usage.
- [ ] Playground smoke coverage exercises RadioGroup and RadioGroupItem through the package export path.

## Blocked by

- #93

## Published Issue #95

## What to build

Build the Switch primitive as the binary on/off choice control. The completed
slice should provide a styled native-checkbox-backed switch that works
standalone and as a direct FieldControl child, forwards refs to the native
input, preserves native checkbox form behavior, exposes switch semantics, stays
binary-only, composes classes, exposes stable data attributes, and includes
focused tests, Storybook examples, registry metadata, and package exports for
the Switch path.

## Acceptance criteria

- [ ] Switch preserves a native checkbox input, forwards refs to that input, composes className, exposes stable root/track/thumb slot data, and preserves relevant native checkbox attributes.
- [ ] Switch supports controlled `checked`, uncontrolled `defaultChecked`, `onCheckedChange`, native `onChange`, and boolean-only state.
- [ ] Switch exposes switch semantics and does not support `indeterminate` or mixed state.
- [ ] Switch supports the approved control sizing and state data attributes without breaking native `disabled`, `readOnly`, `required`, `name`, `value`, checked, or defaultChecked behavior.
- [ ] Switch styles off, on, focus-visible, invalid, disabled, read-only, required, density, dark mode, and RTL states using token-backed Tailwind classes.
- [ ] Switch works as a direct child of FieldControl and inherits `id`, `aria-describedby`, `aria-invalid`, `aria-errormessage`, disabled, required, and read-only behavior from Field.
- [ ] Switch examples keep visible labels stable across state changes.
- [ ] Switch class-name helper and public prop/state types are exported from the component and package entry points.
- [ ] Registry metadata exists for Switch with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Render tests cover native attributes, controlled/uncontrolled checked state, ref forwarding, native form participation, class merging, invalid/disabled/read-only/required state, Space toggling, native `onChange`, `onCheckedChange`, no mixed state, and FieldControl integration.
- [ ] Accessibility and SSR tests cover visible stable labels, invalid/error wiring through FieldControl, grouped switch examples, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base Switch, controlled Switch, FieldControl composition, horizontal settings rows, invalid/required, disabled/read-only, density, dark mode, RTL, and realistic feature-flag/settings usage.
- [ ] Playground smoke coverage exercises Switch through the package export path.

## Blocked by

- #94

## Published Issue #96

## What to build

Finish the Checkbox, RadioGroup, and Switch suite as an installable, documented
component family. This slice should ensure the three primitives work together
across package exports, registry metadata, Storybook examples, FormField
composition, grouped choice examples, playground smoke coverage, accessibility
coverage, SSR coverage, and final verification.

## Acceptance criteria

- [ ] Package exports include Checkbox, RadioGroup, RadioGroupItem, Switch, class-name helpers, and public prop/state types.
- [ ] Registry metadata for Checkbox, RadioGroup, and Switch validates and installs cleanly in a registry smoke consumer.
- [ ] Storybook has suite-level coverage for native form composition, FieldControl integration, FieldSet/Legend groups, invalid/required/disabled/read-only states, density, dark mode, RTL, and responsive form examples.
- [ ] Storybook examples include realistic auth preferences, settings rows, feature flags, CRUD/filter choices, permission choices, and AI model/tool settings patterns.
- [ ] Playground smoke coverage exercises all three controls through the package export path and verifies style imports still work.
- [ ] Accessibility tests cover axe smoke, visible labels, grouped controls, invalid/error wiring, FieldControl composition, FieldSet/Legend composition, mixed Checkbox state, stable Switch labels, disabled/read-only examples, and no misleading custom widget roles.
- [ ] SSR tests cover the full suite and hydration without mismatch warnings.
- [ ] Documentation explains native-first usage, FormField compatibility, Checkbox mixed-state behavior, RadioGroup value behavior, Switch binary semantics, theming, registry installation, testing, and out-of-scope validation/value-management behavior.
- [ ] Verification commands pass for the implemented slice: component typecheck, focused component tests, accessibility tests, package build, Storybook typecheck/build, playground build, registry validation, registry smoke, and diff whitespace checks.

## Blocked by

- #95
