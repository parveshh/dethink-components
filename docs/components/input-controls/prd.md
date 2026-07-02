# Input, Textarea, And NumberInput PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/83.

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, B2B applications,
auth screens, CRUD flows, filters, settings pages, and AI-native configuration
surfaces need first-class text-entry controls that match the new Form and Field
primitives.

Dethink now has reusable Form and Field structure for labels, descriptions,
errors, invalid state, required/read-only/disabled state, fieldsets, density,
RTL, and SSR-safe accessibility relationships. What is still missing is the
actual reusable native text-entry layer: a styled Input, a multiline Textarea,
and a conservative NumberInput for numeric entry. Without these controls, every
form example and future component would duplicate token-backed control styling,
focus/invalid/disabled/read-only treatment, native attribute passthrough,
registry metadata, Storybook examples, and tests.

## Solution

Ship Input, Textarea, and NumberInput as dependency-free, native-first controls
for `@dethink/components`. They should be usable standalone or inside
FieldControl, forward refs, preserve native browser behavior, expose stable
`data-slot` and state attributes, support token-backed Tailwind styling, compose
consumer classes, and install cleanly through the shadcn-style registry.

Input covers single-line text-like inputs. Textarea covers multiline plain-text
entry with an explicit resize contract. NumberInput covers numeric entry
ergonomics without becoming a parser, formatter, stepper, or locale-aware number
field in v1. NumberInput should default to text input semantics with
`inputMode="decimal"` to avoid accidental native number spinbutton behavior,
while allowing consumers to opt into native number behavior when they
specifically need it.

The components should lean on Form and Field for labels, help text, errors,
required markers, and group semantics. This PRD should not introduce a
validation library, masking runtime, formatting runtime, password reveal
behavior, search behavior, OTP/PIN behavior, select behavior, or form-state
adapter.

## User Stories

1. As a frontend engineer, I want an Input component, so that single-line text fields use consistent Dethink styling and native semantics.
2. As a frontend engineer, I want a Textarea component, so that multiline fields use consistent styling and resize behavior.
3. As a frontend engineer, I want a NumberInput component, so that numeric-entry fields have a clear default pattern without hand-rolling every example.
4. As a form builder, I want these controls to work inside FieldControl, so that labels, descriptions, errors, and invalid state are wired once through FormField.
5. As a form builder, I want these controls to work without FieldControl, so that simple standalone native forms remain possible.
6. As a package consumer, I want refs forwarded to the native input or textarea element, so that apps can focus fields and integrate with form libraries.
7. As a package consumer, I want native attributes preserved, so that `name`, `value`, `defaultValue`, `placeholder`, `autoComplete`, `inputMode`, `pattern`, `minLength`, `maxLength`, `required`, `disabled`, `readOnly`, `rows`, `min`, `max`, and `step` work normally.
8. As a package consumer, I want controlled and uncontrolled usage to follow React and native form conventions, so that Dethink does not invent a form-state API.
9. As a design-system lead, I want token-backed Tailwind classes, so that controls match Button, Card, DateTimePicker, and FormField.
10. As a design-system lead, I want stable data attributes, so that downstream styles and tests can target slots and states predictably.
11. As a design-system lead, I want density-aware sizing, so that compact, default, and comfortable forms remain coherent.
12. As a design-system lead, I want dark mode support, so that forms work in product dashboards and admin surfaces.
13. As a design-system lead, I want RTL-safe spacing and text alignment, so that localized forms do not require overrides.
14. As an accessibility reviewer, I want native input and textarea elements, so that browser and assistive technology behavior remains reliable.
15. As an accessibility reviewer, I want visible labels handled through Field examples, so that placeholder text is not treated as a label replacement.
16. As an accessibility reviewer, I want invalid styling to respond to `aria-invalid` and `data-invalid`, so that FieldControl and standalone usage both work.
17. As an accessibility reviewer, I want focus-visible styles to remain obvious, so that keyboard users can locate the active field.
18. As an accessibility reviewer, I want disabled and read-only states to be visually distinct without removing necessary context.
19. As a mobile user, I want NumberInput to use an appropriate virtual keyboard hint, so that numeric entry is easier on touch devices.
20. As a QA engineer, I want tests for native attribute passthrough, refs, class merging, invalid/disabled/read-only states, controlled/uncontrolled values, SSR, and a11y smoke, so that input regressions are caught early.
21. As a Storybook user, I want examples for base fields, invalid fields, disabled/read-only fields, native form composition, FieldControl integration, density, dark mode, RTL, and realistic settings/auth/CRUD patterns, so that I can copy production-ready snippets.
22. As a registry consumer, I want separate registry metadata for Input, Textarea, and NumberInput when practical, so that copied source has accurate dependencies and consumers can install only what they need.
23. As a future PasswordInput implementer, I want Input to be reusable, so that password reveal behavior can build on the same control foundation later.
24. As a future SearchInput implementer, I want Input to avoid owning icons and clear buttons in v1, so that search-specific behavior can be designed separately.
25. As a future Select/Combobox implementer, I want the base control styling settled, so that trigger/input surfaces stay visually consistent.
26. As a maintainer, I want NumberInput to avoid parsing, clamping, and formatting in v1, so that locale and precision behavior are not accidentally wrong.
27. As a maintainer, I want no CSS-in-JS, masking library, validation library, or form-state dependency, so that the primitives remain portable through the registry.
28. As an SSR app developer, I want these controls to render and hydrate without mismatch warnings, so that Next.js and Vite SSR consumers can use them safely.

## Implementation Decisions

- The selected next candidate is Input, Textarea, and NumberInput because the high-impact roadmap places this group immediately after Form + Field primitives, and it unlocks auth, settings, CRUD, filters, Select/Combobox examples, and dashboard forms.
- The component family is Input, Textarea, and NumberInput.
- Exports should include each component, class-name helpers, and public prop/state types.
- Input renders a native input, forwards refs, composes className, exposes `data-slot="input"`, and preserves native input attributes.
- Textarea renders a native textarea, forwards refs, composes className, exposes `data-slot="textarea"`, preserves native textarea attributes, and supports a resize contract.
- NumberInput renders a native input, forwards refs, composes className, exposes `data-slot="number-input"`, and preserves native input attributes relevant to numeric entry.
- NumberInput defaults to `type="text"` with `inputMode="decimal"`; consumers can opt into native `type="number"` only when they intentionally want browser spinbutton semantics and native number validation.
- NumberInput v1 does not parse, format, clamp, localize, increment/decrement, or emit numeric values. It follows native React input value semantics and leaves data conversion to app or form-library code.
- Control styling should use Tailwind CSS v4 utilities, semantic tokens, density variables, explicit class maps, shared class merging, and stable data attributes.
- Controls should style `aria-invalid="true"`, `data-invalid="true"`, native disabled/read-only state, and focus-visible state consistently.
- The controls should work as direct children of FieldControl and should not duplicate label, description, error, or required-marker APIs.
- Registry metadata should be dependency-free beyond `dethink-base`; examples may depend on `form-field` but the primitive controls themselves should not require FormField.
- V1 excludes icons, prefixes/suffixes, clear buttons, password reveal, masking, formatting, counters, autosize textarea, steppers, spin buttons, validation summaries, and form-library adapters.

## Testing Decisions

- Tests should assert public DOM behavior and native semantics rather than internal class implementation.
- Render tests should cover element type, forwarded refs, native attribute passthrough, controlled/uncontrolled values, `name` participation in native forms, class merging, disabled, readOnly, required, invalid, focus-visible-compatible state attributes, and size/resize options.
- Integration tests should cover usage as direct children of FieldControl, including `id`, `aria-describedby`, `aria-invalid`, and `aria-errormessage` behavior inherited from Field.
- NumberInput tests should cover default `type="text"`, default `inputMode="decimal"`, numeric/numeric-keyboard configuration, optional native `type="number"`, and pass-through of `min`, `max`, `step`, and `pattern` without parsing or clamping values.
- Textarea tests should cover `rows`, `minLength`, `maxLength`, read-only/disabled behavior, and resize variants.
- Accessibility tests should cover axe smoke for visible-label examples, invalid/error examples, FieldControl integration, and no misleading custom widget roles.
- SSR tests should cover server rendering and hydration without mismatch warnings.
- Storybook should cover Input, Textarea, NumberInput, FieldControl integration, invalid/required/disabled/read-only states, native form submission examples, density, dark mode, RTL, and realistic auth/settings/CRUD examples.
- Registry validation and smoke should verify metadata, exported files, dependency-free copied source, aliases, CSS variables, and clean consumer import behavior.

## Out of Scope

- PasswordInput, SearchInput, PinInput/OTP, MaskedInput, CurrencyInput, PercentInput, Slider, Select, NativeSelect, Combobox, Checkbox, RadioGroup, Switch, and Date/Time inputs.
- Parsing strings into numbers, number formatting, locale-aware decimal/group separators, precision handling, clamping, rounding, or stepper controls.
- Textarea autosize behavior, character counters, markdown/rich-text editing, mentions, syntax highlighting, or spellcheck policy beyond native attribute passthrough.
- Validation engines, schema resolvers, dirty/touched state, form submission orchestration, server actions, global error summaries, or form-library adapters.
- Input adornments, left/right icons, prefix/suffix slots, clear buttons, loading indicators, command/search behavior, or password reveal behavior.
- CSS-in-JS, runtime style parsers, masking libraries, formatting libraries, React Aria dependencies, or Motion dependencies.

## Further Notes

- Research basis: Dethink FormField PRD and implementation, Modern Web Guidance forms/accessibility/error guidance, React `useId`/`forwardRef` docs, W3C WAI forms tutorial, MDN `input type="number"`, MDN `inputmode`, and MDN textarea/resize docs.
- WAI form guidance reinforces native labels, instructions, validation feedback, and field grouping as the accessible structure these controls should plug into.
- MDN documents that native `input type="number"` has implicit spinbutton behavior and recommends considering `inputmode` plus text input when spinbutton behavior is not important.
- Modern Web Guidance reinforces visible labels, `aria-describedby` for hints/errors, native constraints, careful validation timing, mobile keyboard hints, and not disabling textarea resizing without an alternate layout reason.
