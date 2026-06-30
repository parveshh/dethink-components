# Typography Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/26

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, and AI-native React interfaces need a consistent, token-backed text system before the layout and form layers expand. Without dedicated Typography, Heading, and Text primitives, teams will style text ad hoc, couple semantic heading levels to visual size, duplicate muted/caption/label styles, and make dense application screens harder to scan, theme, and audit for accessibility.

The component library already has Button, IconButton, and Link for core actions and navigation. The next P0 gap is the text foundation that other components, docs, registry examples, forms, cards, tables, and dashboards can compose around.

## Solution

Ship a P0 Typography family for semantic headings and common text styles. The family includes a low-level Typography primitive, a Heading component that preserves real heading semantics while allowing independent visual scale, and a Text component for body copy, labels, captions, muted text, truncation, and line clamp.

The components use Tailwind CSS v4 utilities, semantic tokens, explicit variant maps, shared class-name composition, stable data attributes, dark mode, density support, RTL-safe alignment, SSR-safe rendering, Storybook examples, accessibility coverage, and shadcn-compatible registry metadata.

## User Stories

1. As a frontend engineer, I want a Typography primitive, so that one-off text styling can use the design system instead of custom class strings.
2. As a frontend engineer, I want a Heading component, so that page, section, card, and dialog headings have consistent typography.
3. As a frontend engineer, I want a Text component, so that body text, captions, helper copy, labels, and muted text have a shared contract.
4. As an accessibility reviewer, I want headings to render real h1 through h6 elements, so that screen reader navigation and document outlines remain meaningful.
5. As an accessibility reviewer, I want visual heading size to be independent from semantic heading level, so that teams do not skip heading levels for visual reasons.
6. As a design-system lead, I want text styles to use semantic tokens, so that light mode, dark mode, high-contrast themes, and brand themes remain consistent.
7. As a product designer, I want a predictable heading scale, so that dashboard pages, cards, dialogs, and forms feel cohesive.
8. As a product designer, I want body, small, caption, label, and lead styles, so that common copy patterns do not need bespoke styles.
9. As a dashboard engineer, I want tone variants for default, muted, subtle, primary, success, warning, and destructive copy, so that dense interfaces can communicate state without custom classes.
10. As a dashboard engineer, I want weight variants, so that emphasis and label hierarchy can be expressed consistently.
11. As a dashboard engineer, I want alignment options that work in LTR and RTL layouts, so that internationalized screens do not need custom overrides.
12. As a dashboard engineer, I want truncation and line-clamp support, so that cards, table cells, sidebars, and list rows can constrain copy safely.
13. As a docs author, I want examples for semantic headings and visual sizes, so that consumers understand the difference between content outline and presentation.
14. As a docs author, I want examples for text tones and sizes, so that generated code and human users choose the right primitive.
15. As a registry consumer, I want Typography to install cleanly, so that copied components have all required files and no hidden global dependency.
16. As a package consumer, I want exported prop types, so that component APIs are discoverable and reusable in app code.
17. As an SSR app developer, I want Typography, Heading, and Text to server-render and hydrate without warnings, so that they work in Next.js-style environments.
18. As a QA engineer, I want behavior tests for semantic rendering and class composition, so that text primitives do not regress as the theme evolves.
19. As an accessibility reviewer, I want axe smoke coverage and semantic tests, so that the component family does not use ARIA roles to fake native text semantics.
20. As an AI coding tool user, I want predictable Typography examples, so that generated screens choose Heading for headings and Text for body copy.
21. As a maintainer, I want Code and Kbd to remain separate components, so that inline code and keyboard shortcut semantics can get their own focused API later.
22. As a maintainer, I want this family to stay dependency-free, so that foundational text primitives do not increase the basic component bundle.
23. As a component author, I want downstream components to reuse the same text scale, so that future Card, Field, Alert, Table, and EmptyState implementations stay visually aligned.
24. As a theme author, I want stable data attributes and class maps, so that typography can be customized predictably in registry-installed source.

## Implementation Decisions

- Typography, Heading, and Text are the next normal P0 component family after Button, IconButton, and Link in the development path.
- The family ships as one registry item and one package export surface because the primitives are tightly related and share variant maps.
- Typography is the low-level tokenized primitive for advanced or unusual semantic elements.
- Heading is the preferred primitive for actual headings.
- Text is the preferred primitive for body copy, labels, captions, helper copy, and inline text.
- Heading renders real h1 through h6 elements by semantic level.
- Heading supports independent visual scale so semantic level does not need to match visual size.
- Text supports constrained semantic element choices appropriate for text content.
- Typography supports a broader but still controlled set of text-oriented elements.
- The component family supports size, tone, weight, alignment, truncation, line clamp, className composition, forwarded refs, and stable data attributes.
- Alignment uses logical start and end values so RTL layouts remain correct.
- Styling uses Tailwind CSS v4 utilities, semantic tokens, explicit variant maps, shared class merging, and no hard-coded brand colors.
- Components do not add browser-only behavior and remain SSR-safe.
- Components remain dependency-free beyond the existing React and local utility surface.
- Code and Kbd are out of this v1 and stay separate P1 components.
- The family does not implement Markdown, rich text, prose rendering, automatic heading outline context, text measurement, tooltip behavior, copy behavior, or editor behavior.

## Testing Decisions

- Tests should assert public behavior and DOM semantics instead of private class-map implementation details.
- Render tests should cover semantic element output, heading levels, visual heading levels, text sizes, tones, weights, alignment, truncation, line clamp, className composition, custom attributes, and ref forwarding.
- Accessibility tests should cover axe smoke, real heading semantics, absence of fake heading roles, readable text examples, and safe usage of muted/destructive/status tones.
- SSR tests should cover server rendering and hydration without warnings.
- Storybook should cover heading scale, text scale, tone matrix, weight matrix, truncation, line clamp, dense dashboard copy, dark mode, density, RTL, and common composition examples.
- Registry validation and playground smoke coverage should prove the Typography item installs cleanly and works through both package and registry consumption paths.
- Existing Button, IconButton, and Link tests are the closest prior art for class maps, data attributes, class merging, SSR smoke tests, Storybook coverage, a11y smoke tests, and registry validation.

## Out Of Scope

- Code and Kbd components.
- Markdown, MDX, prose, or rich text rendering.
- Automatic heading-level context or document outline management.
- Font loading or global typeface configuration.
- Global CSS reset changes beyond what the existing foundation already provides.
- Responsive prop arrays or breakpoint-specific typography APIs.
- Copy-to-clipboard behavior.
- Tooltip integration.
- Text measurement, overflow detection callbacks, or virtualized text behavior.
- Localization or message formatting APIs.
- Link, Button, Field, Card, Table, Alert, or EmptyState implementation.

## Further Notes

- The source product PRD names Typography as a P0 general component and calls out Heading, Text, Paragraph, Lead, Small, Muted, Code, and Kbd as token-driven text primitives.
- This PRD deliberately scopes Code and Kbd out because the development path lists them as separate P1 components.
- React documentation supports explicit heading level props and reinforces that semantic heading level should be handled intentionally.
- The most important accessibility decision is preserving native heading semantics while making visual size independently controllable.
