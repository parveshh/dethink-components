# Separator Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/62.

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, B2B applications, and AI-native React interfaces need a dependable static separator after the core layout primitives. Box, Container, Stack, Flex, and Grid help arrange content, but product screens still repeat ad hoc border utilities for section breaks, toolbar groups, menu groups, card divisions, settings panels, and form-adjacent layouts.

Without a Separator / Divider primitive, teams make inconsistent decisions about whether a line is decorative or semantic, whether a vertical divider exposes orientation, which token color and thickness to use, and how separators compose with the registry install path. That creates visual drift and avoidable accessibility mistakes, especially when `<hr>` semantics, ARIA `separator`, and decorative lines are mixed casually.

## Solution

Ship Separator as a P0 static boundary primitive with a Divider alias. Separator renders a semantic `<hr>` by default, supports decorative mode, supports horizontal and vertical orientation, supports wrapper-free composition through `asChild`, and exposes constrained token maps for thickness, tone, and spacing.

Separator v1 deliberately does not implement resizable splitters, drag handles, focusable separator widgets, value semantics, labelled dividers, automatic insertion between layout children, arbitrary CSS props, responsive object props, CSS-in-JS, or a runtime style parser. Consumers can use `className` for local composition details while Separator owns the reusable visual and accessibility contract.

## User Stories

1. As a frontend engineer, I want a Separator primitive, so that static boundaries use a consistent component instead of repeated border utility strings.
2. As a frontend engineer, I want a Divider alias, so that teams using divider terminology can discover the same component.
3. As a frontend engineer, I want Separator to render a semantic `<hr>` by default, so that thematic breaks use native HTML semantics.
4. As a frontend engineer, I want Separator to support decorative mode, so that purely visual lines can be hidden from assistive technologies.
5. As a frontend engineer, I want Separator to support horizontal orientation, so that section breaks are concise.
6. As a frontend engineer, I want Separator to support vertical orientation, so that toolbar, menu, and inline group divisions are consistent.
7. As a frontend engineer, I want Separator to support `asChild`, so that compatible elements can receive separator styling and semantics without an extra wrapper.
8. As a frontend engineer, I want Separator to forward refs, so that parent code can measure or integrate the rendered element when needed.
9. As a design-system lead, I want Separator thickness to use constrained token maps, so that line weight stays consistent.
10. As a design-system lead, I want Separator tone to use token-backed classes, so that dividers work across light, dark, and high-contrast themes.
11. As a design-system lead, I want Separator spacing to use constrained token maps, so that section rhythm is predictable.
12. As a design-system lead, I want Separator classes to be statically detectable, so that registry-installed source stays predictable and build output stays small.
13. As a dashboard engineer, I want Separator to compose inside Stack, so that settings sections can be divided without custom borders.
14. As a dashboard engineer, I want Separator to compose inside Flex, so that toolbar groups and action clusters can use vertical dividers.
15. As a dashboard engineer, I want Separator to compose inside Grid, so that dashboard panels and form-adjacent layouts can separate regions consistently.
16. As a dashboard engineer, I want Separator to support semantic and decorative examples, so that product code chooses the right accessibility mode.
17. As an RTL user, I want Separator examples to avoid physical left/right assumptions, so that spacing behaves naturally in right-to-left contexts.
18. As a mobile user, I want separators to use stable dimensions and not cause overflow, so that narrow screens remain usable.
19. As an accessibility reviewer, I want semantic separators to expose `separator` semantics and matching orientation, so that assistive technologies receive accurate structure.
20. As an accessibility reviewer, I want decorative separators hidden from assistive technologies, so that visual-only lines do not add noisy structure.
21. As an accessibility reviewer, I want Separator to avoid focusable splitter behavior, so that users are not tabbed onto a non-operable line.
22. As an accessibility reviewer, I want Separator to reject content-bearing divider patterns in v1, so that descendant semantics are not lost under a separator role.
23. As a docs author, I want examples that show when to use Separator instead of Box borders, Stack gaps, Grid gaps, Card sections, or future Splitter, so that consumers choose the right primitive.
24. As a docs author, I want practical examples for toolbars, menus, settings sections, card sections, form sections, and page sections, so that teams can copy realistic production patterns.
25. As a registry consumer, I want Separator to install without runtime dependencies, so that adding it does not increase the foundational dependency surface.
26. As a package consumer, I want exported Separator, Divider, and prop/token types, so that component APIs are discoverable and reusable.
27. As an SSR app developer, I want Separator and Divider to render and hydrate without warnings, so that they work in Next.js-style environments.
28. As an AI coding tool user, I want predictable Separator examples, so that generated component code uses the right primitive for static boundaries.
29. As a maintainer, I want Separator to avoid arbitrary responsive object props in v1, so that responsive layout APIs remain deliberate across primitives.
30. As a maintainer, I want resizable Splitter behavior left out of v1, so that interactive pane resizing can be designed as a separate component.
31. As a QA engineer, I want tests for semantic defaults, decorative mode, orientation, thickness, tone, spacing, `asChild`, refs, Divider alias, SSR, a11y smoke, and registry install, so that Separator stays stable as layout primitives expand.

## Implementation Decisions

- Separator / Divider is the next new PRD candidate after Grid in the high-impact component order.
- Separator is a static boundary primitive, not a Box, Stack, Flex, Grid, Container, Spacer, Card, Menu, Toolbar, or Splitter replacement.
- Separator is the canonical component name.
- Divider is an exported alias with the same behavior and prop type.
- Separator renders `<hr>` by default to preserve native thematic-break semantics.
- Separator supports `as="hr"`, `as="div"`, and `as="span"` for controlled semantic and inline composition.
- Separator supports wrapper-free composition through `asChild` with one compatible child.
- Separator defaults to semantic mode with `decorative={false}`.
- Decorative mode sets `aria-hidden="true"` and does not add separator role or orientation.
- Semantic non-`hr` rendering sets `role="separator"`.
- Semantic separators expose `aria-orientation` matching the selected orientation.
- Separator supports horizontal and vertical orientation through static class maps.
- Separator supports constrained thickness, tone, and spacing maps.
- Separator and Divider use Tailwind CSS v4 utilities, static class maps, stable data attributes, shared class-name merging, and no runtime style parser.
- Separator does not introduce CSS-in-JS, `sx`, arbitrary CSS props, responsive object props, splitter behavior, drag state, keyboard behavior, or interactive semantics.
- Separator should compose predictably with Box, Container, Stack, Flex, Grid, Typography, Button, Link, IconButton, DateTimePicker, Timeline, and future Card, Form, Field, Menu, Toolbar, and Splitter examples.

## Testing Decisions

- Tests should assert public DOM behavior, class/data attributes, and accessibility attributes rather than private class-map implementation details.
- Render tests should cover Separator default rendering, supported `as` elements, `asChild`, className composition, custom attributes, refs, orientation, decorative mode, semantic mode, thickness, tone, spacing, and no children.
- Render tests should cover Divider alias behavior and exported prop types.
- Type-level tests should verify unsupported token values and content-bearing usage are rejected where practical.
- Accessibility tests should cover axe smoke, semantic `<hr>` defaults, non-`hr` role behavior, vertical `aria-orientation`, decorative `aria-hidden`, and no focusable behavior by default.
- SSR tests should cover server rendering and hydration without warnings for Separator and Divider.
- Storybook should cover base horizontal separator, vertical separator, decorative separator, semantic separator, thickness matrix, tone matrix, spacing matrix, toolbar/menu/settings/card/form examples, Stack/Flex/Grid/Box/Container composition, `asChild`, dark mode, density, RTL, and responsive `className` composition.
- Registry validation and smoke coverage should prove Separator installs cleanly, has no runtime dependencies, and works through both package and registry consumption paths.
- Existing Box, Stack, Flex, Grid, and Container tests and stories are the closest prior art for class maps, `asChild`, semantic rendering, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out of Scope

- Resizable splitter or panel divider behavior.
- Focusable separator widgets.
- Drag handles.
- Keyboard interaction.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, or pane-size state.
- Labelled or content-bearing dividers.
- Automatic insertion between Stack, Flex, Grid, menu, toolbar, or breadcrumb children.
- Layout primitives such as Stack, Flex, Grid, Container, Spacer, Center, or SimpleGrid.
- Card anatomy, section headers, or content grouping.
- Menu, toolbar, command, tabs, breadcrumb, navigation, or form behavior.
- Arbitrary CSS props, `sx`, CSS-in-JS, runtime class generation, responsive object props, or polymorphic style systems.

## Further Notes

- Source product PRD describes Separator / Divider as a P0 layout primitive.
- The high-impact priority plan names Separator / Divider as the next practical sequence item after Grid.
- MDN documents `<hr>` as a thematic break with implicit `separator` semantics and notes that purely visual lines can be CSS borders instead.
- MDN and WAI-ARIA distinguish static separators from focusable moveable splitter widgets; Dethink's v1 scope is static only.
- Tailwind CSS documentation confirms static utility composition for token-backed colors, borders, dark mode, and data attributes.
- Modern Web Guidance `css-layout` reinforces logical layout, intrinsic sizing, and avoiding unnecessary custom behavior for layout primitives.
