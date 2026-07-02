# Input, Textarea, And NumberInput Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/83
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/84
- AFK Input primitive source, tests, registry, and stories: https://github.com/parveshh/dethink-components/issues/85
- AFK Textarea primitive source, tests, registry, and stories: https://github.com/parveshh/dethink-components/issues/86
- AFK NumberInput primitive source, tests, registry, and stories: https://github.com/parveshh/dethink-components/issues/87
- AFK suite integration, docs, and final verification: https://github.com/parveshh/dethink-components/issues/88

## Branch Stack

1. `codex/prd-83-input-controls`
2. `codex/issue-84-input-controls-contract-docs`
3. `codex/issue-85-input-primitive`
4. `codex/issue-86-textarea-primitive`
5. `codex/issue-87-number-input-primitive`
6. `codex/issue-88-input-controls-integration`

The final implementation PR should target `codex/prd-83-input-controls` from
the top issue branch after all Input, Textarea, and NumberInput child issues are
complete.

## Proposed Breakdown

1. **Title**: Input controls contract and local planning docs (#84)  
   **Type**: AFK  
   **Blocked by**: #83  
   **User stories covered**: 1-28

2. **Title**: Input primitive source, tests, registry, and stories (#85)  
   **Type**: AFK  
   **Blocked by**: #84  
   **User stories covered**: 1, 4-18, 20-25, 27-28

3. **Title**: Textarea primitive source, tests, registry, and stories (#86)  
   **Type**: AFK  
   **Blocked by**: #85  
   **User stories covered**: 2, 4-18, 20-22, 27-28

4. **Title**: NumberInput primitive source, tests, registry, and stories (#87)  
   **Type**: AFK  
   **Blocked by**: #86  
   **User stories covered**: 3-20, 22, 25-28

5. **Title**: Input controls suite integration, docs, and final verification (#88)  
   **Type**: AFK  
   **Blocked by**: #87  
   **User stories covered**: 4-5, 9-22, 27-28

## Published Issue #84

## What to build

Create the local contract and planning documents for the Input, Textarea, and
NumberInput PRD. The docs should define the native-first text-entry controls,
public component family, accessibility and FormField integration contracts,
NumberInput numeric-entry boundaries, registry expectations, testing seams, and
stacked branch mapping.

This slice should not implement runtime component source beyond documentation
examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification defines Input, Textarea, NumberInput, class-name helpers, and public prop/state types.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define native input and textarea semantics, native attribute passthrough, ref forwarding, class merging, and controlled/uncontrolled behavior.
- [ ] The docs define FieldControl integration without duplicating FormField label, description, error, required-marker, or grouping APIs.
- [ ] The docs define invalid, disabled, read-only, required, focus-visible, density, dark mode, RTL, and responsive styling expectations.
- [ ] The docs define NumberInput as numeric-entry optimized, defaulting to text input semantics with decimal input mode and no parsing, formatting, clamping, or stepper behavior in v1.
- [ ] The docs clearly separate this PRD from PasswordInput, SearchInput, PinInput, MaskedInput, CurrencyInput, Select, Combobox, validation engines, schema libraries, and form-library adapters.
- [ ] The docs list render, integration, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #83

## Published Issue #85

## What to build

Build the Input primitive as the first native text-entry control. The completed
slice should provide a styled native input that works standalone and as a direct
FieldControl child, forwards refs, preserves native input attributes, composes
classes, exposes stable data attributes, and includes focused tests, Storybook
examples, registry metadata, and package exports for the Input path.

## Acceptance criteria

- [ ] Input renders a native input element, forwards refs, composes className, exposes `data-slot="input"`, and preserves native input attributes.
- [ ] Input supports the approved control sizing and state data attributes without breaking native `disabled`, `readOnly`, `required`, `name`, `value`, or `defaultValue` behavior.
- [ ] Input styles placeholder, focus-visible, invalid, disabled, read-only, density, dark mode, and RTL states using token-backed Tailwind classes.
- [ ] Input works as a direct child of FieldControl and inherits `id`, `aria-describedby`, `aria-invalid`, `aria-errormessage`, disabled, required, and read-only behavior from Field.
- [ ] Input class-name helper and public prop/state types are exported from the component and package entry points.
- [ ] Registry metadata exists for Input with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Render tests cover native attributes, controlled/uncontrolled values, ref forwarding, native form participation, class merging, invalid/disabled/read-only/required state, and FieldControl integration.
- [ ] Accessibility and SSR tests cover visible labels, invalid/error wiring through FieldControl, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base Input, FieldControl composition, invalid/required, disabled/read-only, density, dark mode, RTL, and realistic auth/settings usage.
- [ ] Playground smoke coverage exercises Input through the package export path.

## Blocked by

- #84

## Published Issue #86

## What to build

Build the Textarea primitive as the multiline native text-entry control. The
completed slice should provide a styled native textarea that works standalone
and as a FieldControl child, forwards refs, preserves native textarea
attributes, supports the approved resize contract, composes classes, exposes
stable data attributes, and includes focused tests, Storybook examples, registry
metadata, and package exports for the Textarea path.

## Acceptance criteria

- [ ] Textarea renders a native textarea element, forwards refs, composes className, exposes `data-slot="textarea"`, and preserves native textarea attributes.
- [ ] Textarea supports the approved control sizing and resize options without breaking native `rows`, `minLength`, `maxLength`, `disabled`, `readOnly`, `required`, `name`, `value`, or `defaultValue` behavior.
- [ ] Textarea defaults to a user-resizable pattern unless the resize prop intentionally constrains it.
- [ ] Textarea styles placeholder, focus-visible, invalid, disabled, read-only, density, dark mode, and RTL states using token-backed Tailwind classes.
- [ ] Textarea works as a direct child of FieldControl and inherits `id`, `aria-describedby`, `aria-invalid`, `aria-errormessage`, disabled, required, and read-only behavior from Field.
- [ ] Textarea class-name helper and public prop/state types are exported from the component and package entry points.
- [ ] Registry metadata exists for Textarea with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Render tests cover native attributes, controlled/uncontrolled values, ref forwarding, native form participation, class merging, invalid/disabled/read-only/required state, rows/minLength/maxLength, resize variants, and FieldControl integration.
- [ ] Accessibility and SSR tests cover visible labels, invalid/error wiring through FieldControl, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base Textarea, FieldControl composition, invalid/required, disabled/read-only, resize options, density, dark mode, RTL, and realistic notes/settings usage.
- [ ] Playground smoke coverage exercises Textarea through the package export path.

## Blocked by

- #85

## Published Issue #87

## What to build

Build the NumberInput primitive as a conservative numeric-entry control. The
completed slice should provide a styled native input optimized for numeric
entry, work standalone and as a FieldControl child, forward refs, preserve
native numeric-entry attributes, avoid parsing/formatting/clamping values,
expose stable data attributes, and include focused tests, Storybook examples,
registry metadata, and package exports for the NumberInput path.

## Acceptance criteria

- [ ] NumberInput renders a native input element, forwards refs, composes className, exposes `data-slot="number-input"`, and preserves relevant native input attributes.
- [ ] NumberInput defaults to `type="text"` and `inputMode="decimal"` to avoid accidental spinbutton behavior.
- [ ] NumberInput supports numeric and decimal input-mode configuration and allows explicit native `type="number"` only when consumers intentionally choose browser number semantics.
- [ ] NumberInput passes through `min`, `max`, `step`, `pattern`, `name`, `value`, `defaultValue`, `disabled`, `readOnly`, and `required` without parsing, clamping, rounding, formatting, or coercing values.
- [ ] NumberInput styles placeholder, focus-visible, invalid, disabled, read-only, density, dark mode, and RTL states using token-backed Tailwind classes.
- [ ] NumberInput works as a direct child of FieldControl and inherits `id`, `aria-describedby`, `aria-invalid`, `aria-errormessage`, disabled, required, and read-only behavior from Field.
- [ ] NumberInput class-name helper and public prop/state types are exported from the component and package entry points.
- [ ] Registry metadata exists for NumberInput with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Render tests cover default text/decimal behavior, optional native number behavior, native attributes, controlled/uncontrolled string values, ref forwarding, native form participation, class merging, invalid/disabled/read-only/required state, and FieldControl integration.
- [ ] Accessibility and SSR tests cover visible labels, invalid/error wiring through FieldControl, no misleading custom roles by default, axe smoke, and hydration without mismatch warnings.
- [ ] Storybook examples cover base NumberInput, integer-like and decimal-like fields, FieldControl composition, invalid/required, disabled/read-only, density, dark mode, RTL, and realistic quota/budget/settings usage.
- [ ] Playground smoke coverage exercises NumberInput through the package export path.

## Blocked by

- #86

## Published Issue #88

## What to build

Finish the Input, Textarea, and NumberInput suite as an installable, documented
component family. This slice should ensure the three primitives work together
across package exports, registry metadata, Storybook examples, FormField
composition, playground smoke coverage, accessibility coverage, SSR coverage,
and final verification.

## Acceptance criteria

- [ ] Package exports include Input, Textarea, NumberInput, class-name helpers, and public prop/state types.
- [ ] Registry metadata for Input, Textarea, and NumberInput validates and installs cleanly in a registry smoke consumer.
- [ ] Storybook has suite-level coverage for native form composition, FieldControl integration, invalid/required/disabled/read-only states, density, dark mode, RTL, and responsive form examples.
- [ ] Storybook examples include realistic auth, settings, CRUD/filter, multiline note, and numeric settings patterns.
- [ ] Playground smoke coverage exercises all three controls through the package export path and verifies style imports still work.
- [ ] Accessibility tests cover axe smoke, visible labels, invalid/error wiring, FieldControl composition, disabled/read-only examples, and no misleading custom widget roles.
- [ ] SSR tests cover the full suite and hydration without mismatch warnings.
- [ ] Documentation explains native-first usage, FormField compatibility, NumberInput boundaries, textarea resize behavior, theming, registry installation, testing, and out-of-scope validation/masking/formatting behavior.
- [ ] Verification commands pass for the implemented slice: component typecheck, focused component tests, accessibility tests, package build, Storybook typecheck/build, playground build, registry validation, registry smoke, and diff whitespace checks.

## Blocked by

- #87
