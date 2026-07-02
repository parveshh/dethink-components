# Form And Field Primitives PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/77.

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, B2B applications,
settings pages, auth screens, CRUD flows, filters, and AI-native configuration
surfaces need a dependable form-field foundation before Dethink adds Input,
Textarea, NumberInput, Checkbox, RadioGroup, Switch, Select, Combobox, and richer
workflow forms.

The current library has strong layout, text, action, Card, DateTimePicker, and
registry foundations, but each new input component would otherwise have to
reinvent label layout, help text, required markers, invalid state styling, error
messaging, `aria-describedby` wiring, `aria-invalid` wiring, group semantics,
density spacing, dark mode, RTL, and Storybook examples. That would create
inconsistent accessibility behavior and make future forms harder to compose with
native HTML, React Hook Form, Formisch, TanStack Form, or app-owned validation.

## Solution

Ship Form and Field primitives as the shared, dependency-free form
infrastructure for Dethink Components. The component family should provide
native-first structure, accessible label/help/error relationships,
invalid/disabled/required/read-only state propagation, grouping primitives,
stable data attributes, token-backed Tailwind classes, class-name helpers,
registry metadata, tests, and Storybook examples.

The v1 component family should include Form, Field, FieldLabel, FieldControl,
FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldContent,
and FieldTitle. FieldControl should support wrapper-free composition with direct
controls through `asChild` so future Input, Textarea, NumberInput, Checkbox,
RadioGroup, Switch, Select, and Combobox can receive IDs and ARIA relationships
without every component duplicating the same wiring.

This PRD intentionally does not introduce a validation library, schema parser,
controlled form state manager, input widgets, submit orchestration, async
submission API, or form-library adapter. Consumers can use native browser
behavior or their preferred form state library while Dethink owns the structural
and accessibility contract.

## User Stories

1. As a frontend engineer, I want a Form primitive, so that form layouts use consistent spacing and native form semantics.
2. As a frontend engineer, I want a Field primitive, so that every input can share label, help, and error structure.
3. As a frontend engineer, I want FieldLabel, so that controls have visible and programmatic labels.
4. As a frontend engineer, I want FieldDescription, so that users get instructions before they make mistakes.
5. As a frontend engineer, I want FieldError, so that validation feedback is rendered consistently and tied to the affected control.
6. As a frontend engineer, I want FieldControl with `asChild`, so that native inputs and future Dethink controls can receive the field wiring without extra DOM.
7. As a frontend engineer, I want Field to generate stable IDs when I do not provide one, so that labels and descriptions still connect correctly.
8. As a frontend engineer, I want to provide my own IDs, so that existing application forms and form libraries can control field names and test selectors.
9. As a frontend engineer, I want invalid state on Field to propagate to FieldControl, so that controls expose `aria-invalid` and visual error state consistently.
10. As a frontend engineer, I want disabled state on Field to propagate where appropriate, so that labels, help text, and controls present one coherent disabled state.
11. As a frontend engineer, I want required state to render a visible marker and programmatic state, so that users can identify required fields.
12. As a frontend engineer, I want read-only state support, so that review and locked settings forms can use the same field anatomy.
13. As a frontend engineer, I want Form and Field class-name helpers, so that registry-installed consumers can compose classes predictably.
14. As a design-system lead, I want form field spacing to respect Dethink density, so that compact/default/comfortable screens remain coherent.
15. As a design-system lead, I want invalid, disabled, and required states represented by data attributes, so that downstream components can style state without prop drilling.
16. As a design-system lead, I want Tailwind static class maps, so that registry-installed source remains portable and tree-shakeable.
17. As a design-system lead, I want no CSS-in-JS or runtime style parser, so that forms follow the same implementation contract as existing primitives.
18. As an accessibility reviewer, I want every field example to have a visible label, so that labels are not screen-reader-only by default.
19. As an accessibility reviewer, I want FieldControl to connect `aria-describedby` to help and error text, so that assistive technology announces relevant context.
20. As an accessibility reviewer, I want FieldError to use the correct error relationship only when a field is invalid, so that valid controls are not described by irrelevant errors.
21. As an accessibility reviewer, I want native label, fieldset, and legend semantics, so that forms avoid unnecessary ARIA roles.
22. As an accessibility reviewer, I want grouped controls to use FieldSet and FieldLegend, so that checkbox/radio/split-field groups have a shared accessible name.
23. As a settings-page engineer, I want horizontal field composition, so that toggles, checkboxes, and compact settings rows can align labels and controls predictably.
24. As a settings-page engineer, I want vertical field composition, so that text inputs and larger controls have readable label/help/control/error flow.
25. As a CRUD engineer, I want FieldGroup, so that related fields can be spaced consistently inside cards, dialogs, drawers, and forms.
26. As an auth-flow engineer, I want labels, descriptions, and errors to work with browser autofill and native validation, so that login and signup forms stay robust.
27. As an AI product engineer, I want the same field primitives for model settings and prompt configuration, so that AI settings do not invent bespoke field rows.
28. As a package consumer, I want all components and prop/state types exported from `@dethink/components`, so that the API is discoverable.
29. As a registry consumer, I want Form and Field primitives to install through the shadcn-style registry with accurate dependencies, so that copied source works in a clean app.
30. As a Storybook user, I want examples for simple fields, invalid fields, required fields, disabled fields, horizontal fields, grouped fields, dark mode, density, RTL, and composition with Card, so that I can copy realistic patterns.
31. As an SSR app developer, I want generated IDs to hydrate without mismatch warnings, so that Field works in Next.js-style apps.
32. As a QA engineer, I want tests for ID generation, explicit IDs, label association, described-by wiring, error state, invalid state, disabled/required/read-only state, refs, class merging, SSR, axe, registry metadata, and Storybook examples, so that the foundation remains stable.
33. As a future Input implementer, I want FieldControl to be reusable, so that Input can focus on control visuals and value props rather than label/error wiring.
34. As a future Checkbox/Radio implementer, I want FieldSet, FieldLegend, and horizontal Field composition, so that groups and option rows share a proven structure.
35. As a future Select/Combobox implementer, I want help/error wiring and data-invalid conventions settled before overlay inputs land, so that complex inputs inherit consistent accessibility behavior.
36. As a maintainer, I want Form and Field to avoid choosing one form-state library, so that Dethink remains compatible with native forms, React Hook Form, Formisch, TanStack Form, and app-owned validation.
37. As a maintainer, I want validation summaries, async submit state, schemas, and input widgets left to later PRDs, so that this PRD stays a small, stable foundation.

## Implementation Decisions

- The selected next candidate is Form and Field primitives because the high-impact roadmap places Form + Field immediately after Card, and they unlock the next input, selection, CRUD, auth, settings, and dashboard workflows.
- The component family is Form, Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldContent, and FieldTitle.
- Form renders a native form element by default, supports native form attributes, forwards refs, and provides density-aware vertical spacing. It does not manage validation or submission state.
- Field renders a non-widget structural container with generated ID context, state data attributes, orientation, and state props for invalid, disabled, required, and read-only fields.
- FieldControl supports `asChild` composition with one direct control child. It injects or composes `id`, `aria-describedby`, `aria-invalid`, `aria-errormessage` when relevant, `disabled`, `required`, `readOnly`, data attributes, className, and refs without adding an unnecessary wrapper.
- Field owns the control relationship ID while inside Field context. An explicit `Field id` takes precedence over `FieldControl id` and child control `id`, so labels, descriptions, and errors remain attached to the same control. Consumers needing custom control IDs should set them on Field, or explicitly wire `FieldLabel htmlFor` and ARIA attributes themselves outside the Field contract.
- FieldLabel renders a native label by default and connects through `htmlFor`. It should render a required marker when Field is required unless consumers disable or override that marker.
- FieldDescription and FieldError render stable IDs exposed to the parent Field so FieldControl can compose `aria-describedby` accurately in server-rendered markup and after hydration. Default IDs derive from the Field control ID; explicit IDs remain the recommended path for form libraries, tests, and custom wrappers.
- FieldError should support direct children and a small error-list shape for form-library error objects, but it should not require any form library.
- FieldSet and FieldLegend use native fieldset and legend semantics for related controls. FieldDescription inside FieldSet is visual supporting copy by default; consumers can make it the programmatic group description by setting an explicit description ID and passing that ID to `FieldSet aria-describedby`. FieldGroup provides layout grouping without replacing fieldset semantics.
- FieldContent and FieldTitle support horizontal and option-like field rows, especially future checkbox, radio, and switch patterns.
- Styling uses Tailwind CSS v4 utilities, token-backed colors, density spacing, logical properties, static class maps, shared class-name merging, and stable data attributes.
- The primitives should support light, dark, density, RTL, responsive layout, and high-contrast-friendly invalid states through existing token conventions.
- The registry item should depend on `dethink-base` and add no runtime dependency.
- The implementation should not introduce React Hook Form, Formisch, TanStack Form, Zod, Valibot, React Aria, Radix Label, CSS-in-JS, motion libraries, schema validation, async submission orchestration, or input widgets.

## Testing Decisions

- Tests should assert public DOM behavior and accessibility relationships rather than private implementation details.
- Render tests should cover Form defaults, Field defaults, generated IDs, explicit IDs, label association, control association, description registration, error registration, `aria-describedby` composition, `aria-invalid`, `aria-errormessage`, invalid/disabled/required/read-only data attributes, orientation classes, refs, and class merging.
- Composition tests should cover FieldControl `asChild` with native input-like controls and should verify consumer props and refs are preserved.
- FieldSet tests should cover native fieldset/legend output, grouped descriptions, disabled fieldsets, and field groups.
- Accessibility tests should cover axe smoke, visible label examples, grouped controls, invalid field examples, and no misleading custom widget roles.
- SSR tests should cover server-rendered label, description, error, `aria-describedby`, and `aria-errormessage` relationships, plus hydration without generated ID mismatch warnings.
- Storybook should cover base field, required field, optional field, description, error state, disabled, read-only, horizontal layout, grouped controls, settings-row composition, Card composition, dark mode, density, RTL, and future-input placeholder examples using native controls.
- Registry validation and smoke should verify files, exports, dependency-free behavior, tokenized classes, stable data attributes, and clean consumer install behavior.
- Prior art in this repo includes Button and Card for `asChild`/class merging, Typography for label/helper text tone conventions, DateTimePicker for label/help/error visual language, Stack/Flex/Grid for density-aware layout, and existing registry validation/smoke scripts.

## Out of Scope

- Input, Textarea, NumberInput, PasswordInput, PinInput, SearchInput, Checkbox, RadioGroup, Switch, Slider, Select, NativeSelect, Combobox, MultiSelect, DatePicker, DateRangePicker, FileUpload, or any concrete input widget.
- Form validation engine, schema validation, resolver APIs, async submission orchestration, dirty/touched state, form arrays, optimistic submit state, or server action helpers.
- Required integration with React Hook Form, Formisch, TanStack Form, Zod, Valibot, React Aria, Radix Label, or any specific third-party form library.
- Toasts, alert summaries, global form error summaries, multi-step forms, wizard flows, or scroll/focus-to-first-error behavior.
- Masking, formatting, parsing, locale-specific number/date formatting, autocomplete strategy, or browser password-manager behavior beyond native attribute passthrough.
- Overlay positioning, popovers, menus, combobox listboxes, or focus scopes.
- Runtime child inspection beyond the approved direct-child `asChild` control composition.
- Arbitrary responsive object props, `sx`, CSS-in-JS, styled-components, Emotion, or runtime class generation.

## Further Notes

- W3C WAI form guidance emphasizes native labels, fieldsets/legends, instructions, validation feedback, notifications, and custom-control caution as the core accessible form structure: https://www.w3.org/WAI/tutorials/forms/.
- WCAG guidance for labels or instructions reinforces that labels/instructions must be visible and clear, while programmatic association is a separate but necessary accessibility concern: https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html.
- W3C and MDN guidance on `aria-invalid`, `aria-describedby`, and `aria-errormessage` informed the decision to wire help text and visible errors to controls without exposing irrelevant error messages when fields are valid.
- Current shadcn/ui Field documentation uses a compositional Field family with FieldLabel, FieldDescription, FieldError, FieldSet, FieldLegend, and `data-invalid`/`aria-invalid`; Dethink should align with that ecosystem shape while keeping the implementation dependency-free and compatible with multiple form libraries.
