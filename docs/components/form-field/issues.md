# Form And Field Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/77
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/78
- AFK Field labels, controls, descriptions, and errors: https://github.com/parveshh/dethink-components/issues/79
- AFK Form, fieldset, and grouping primitives: https://github.com/parveshh/dethink-components/issues/80
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/81

## Branch Stack

1. `codex/prd-77-form-field`
2. `codex/issue-78-form-field-contract-docs`
3. `codex/issue-79-field-labels-controls-descriptions-errors`
4. `codex/issue-80-form-fieldset-grouping-primitives`
5. `codex/issue-81-form-field-registry-storybook`

The final implementation PR should target `codex/prd-77-form-field` from the
top issue branch after all Form and Field child issues are complete.

## Proposed Breakdown

1. **Title**: Form and Field contract and local planning docs (#78)
   **Type**: AFK
   **Blocked by**: #77
   **User stories covered**: 1-37

2. **Title**: Field labels, controls, descriptions, and errors (#79)
   **Type**: AFK
   **Blocked by**: #78
   **User stories covered**: 2-22, 28-37

3. **Title**: Form, fieldset, and grouping primitives (#80)
   **Type**: AFK
   **Blocked by**: #79
   **User stories covered**: 1, 14-17, 21-25, 28-37

4. **Title**: Form and Field registry, Storybook, a11y, SSR, and verification (#81)
   **Type**: AFK
   **Blocked by**: #80
   **User stories covered**: 28-37

## Published Issue #78

## What to build

Create the local contract and planning documents for Form and Field primitives
from the published PRD. The docs should define the dependency-free form
infrastructure, public component family, state and accessibility relationships,
boundaries with future input components and form libraries, test seams, registry
expectations, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation
examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification defines Form, Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldContent, and FieldTitle.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define native-first label, description, error, fieldset, and legend semantics.
- [ ] The docs define generated and explicit ID behavior, Field-owned ID precedence, `asChild` FieldControl composition, `aria-describedby`, `aria-invalid`, `aria-errormessage`, SSR-visible relationship wiring, and invalid/disabled/required/read-only state propagation.
- [ ] The docs define vertical and horizontal field layout, FieldGroup grouping, and FieldContent/FieldTitle use for future checkbox/radio/switch rows.
- [ ] The docs clearly separate Form and Field primitives from Input, Textarea, NumberInput, Checkbox, RadioGroup, Switch, Select, Combobox, validation engines, schema libraries, async submit orchestration, and form-library adapters.
- [ ] The docs list render, composition, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #77

## Published Issue #79

## What to build

Build the core Field accessibility contract: Field, FieldLabel, FieldControl,
FieldDescription, and FieldError. The completed slice should let a native
control or future Dethink control compose through FieldControl and receive the
correct ID, label, description, invalid/error, disabled, required, read-only,
data-state, class-name, and ref behavior without depending on a form library.

## Acceptance criteria

- [ ] Field renders the approved structural root, forwards refs, composes className, exposes stable data attributes, and supports invalid, disabled, required, read-only, and orientation state.
- [ ] Field generates hydration-safe IDs when an explicit ID is not provided and respects explicit consumer IDs when provided.
- [ ] FieldLabel renders with native label semantics, forwards refs, connects to the control ID, and renders the required marker according to the contract.
- [ ] FieldControl supports one direct child through `asChild`, preserves consumer props/handlers/refs, and injects or composes ID and state attributes.
- [ ] FieldDescription registers with the parent Field and contributes to the control description relationship.
- [ ] FieldError registers with the parent Field only when relevant, supports direct children and the approved error-list shape, and contributes to error/description relationships for invalid fields.
- [ ] The generated control wiring composes `aria-describedby`, `aria-invalid`, and `aria-errormessage` according to the contract without referencing hidden or irrelevant errors for valid fields.
- [ ] Public components, class-name helpers, and prop/state types for this slice are exported from the package entry point.
- [ ] Render and composition tests cover generated IDs, explicit IDs, label association, description association, error association, invalid/disabled/required/read-only state, orientation, class merging, refs, and `asChild` prop preservation.
- [ ] Accessibility and SSR tests cover visible labels, invalid field wiring, server-visible description/error relationships, axe smoke, and hydration without ID mismatch warnings.

## Blocked by

- #78

## Published Issue #80

## What to build

Add the native Form and grouping primitives that build on the core Field
contract: Form, FieldGroup, FieldSet, FieldLegend, FieldContent, and FieldTitle.
The completed slice should support form-level spacing, field grouping, native
fieldset/legend semantics, disabled groups, horizontal settings rows, and
option-like content rows for future checkbox, radio, and switch components.

## Acceptance criteria

- [ ] Form renders a native form element by default, forwards refs, passes native form attributes, exposes stable data attributes, and applies approved density-aware spacing.
- [ ] FieldGroup renders a layout-only grouping container with approved spacing, class merging, refs, stable data attributes, and no misleading form semantics.
- [ ] FieldSet renders a native fieldset, supports disabled state, forwards refs, composes className, and exposes stable data attributes.
- [ ] FieldLegend renders a native legend, supports the approved visual variants, forwards refs, and composes className.
- [ ] FieldContent and FieldTitle support horizontal and option-like field rows without replacing native label or legend semantics.
- [ ] Grouping primitives compose with Field, FieldLabel, FieldControl, FieldDescription, and FieldError without breaking ID or ARIA relationships.
- [ ] Public components, class-name helpers, and prop/state types for this slice are exported from the package entry point.
- [ ] Render tests cover native form attributes, fieldset/legend semantics, disabled fieldsets, grouping layout, horizontal field rows, class merging, refs, and stable data attributes.
- [ ] Accessibility and SSR tests cover grouped controls, fieldset/legend semantics, axe smoke, and hydration without warnings.

## Blocked by

- #79

## Published Issue #81

## What to build

Finish Form and Field primitives as an installable, documented component family.
Add registry metadata, Storybook examples, accessibility coverage, SSR coverage,
playground smoke coverage, registry smoke coverage, and final verification for
the full component family.

The completed slice should let consumers install the primitives and copy examples
for simple fields, invalid fields, required fields, disabled/read-only fields,
horizontal settings rows, grouped controls, Card composition, dark mode, density,
RTL, and future native-control placeholders.

## Acceptance criteria

- [ ] Registry metadata exists for Form and Field primitives with accurate files, dependencies, registry dependencies, and no new runtime dependency.
- [ ] Registry validation and smoke coverage verify metadata, exports, copied source files, tokenized classes, stable data attributes, and dependency-backed imports.
- [ ] Storybook examples cover base field, explicit ID, generated ID, description, required marker, invalid state, error messages, disabled state, read-only state, horizontal layout, grouped fieldset, settings rows, Card composition, dark mode, density, RTL, and responsive behavior.
- [ ] Storybook interaction coverage verifies label click focus, invalid field accessible attributes, and grouped field semantics where practical.
- [ ] Playground smoke coverage exercises Form and every Field primitive through the package export path.
- [ ] Accessibility tests cover axe smoke, visible labels, fieldset/legend grouping, invalid/error wiring, disabled/read-only examples, and no custom widget roles.
- [ ] SSR tests cover the full component family, server-visible description/error relationships, and generated IDs without hydration mismatch warnings.
- [ ] Documentation explains native-first usage, form-library compatibility, boundaries with future inputs, accessibility rules, theming, registry installation, examples, testing, and out-of-scope validation behavior.
- [ ] Verification commands pass for the implemented slice: component typecheck, focused component tests, accessibility tests, package build, Storybook typecheck/build, registry validation, registry smoke, and diff whitespace checks.

## Blocked by

- #80
