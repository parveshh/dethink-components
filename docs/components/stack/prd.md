# Stack Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/43

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, B2B applications, and AI-native React interfaces need a dependable one-dimensional layout primitive after Box and Container. Without Stack, examples and application code repeat ad hoc `flex`, `flex-col`, `gap`, alignment, and wrapping classes for every settings section, form group, toolbar, card body, button cluster, and dashboard row.

The library already has foundational interactive, typography, and wrapper primitives, plus a published Container PRD. The next practical high-impact component is Stack: a focused composition primitive that gives teams consistent gap and alignment behavior without turning every layout into a custom Flex implementation.

## Solution

Ship Stack as a P0 one-dimensional layout primitive. Stack renders a neutral wrapper by default, supports semantic element selection through `as`, supports wrapper-free composition through `asChild`, and exposes constrained token maps for direction, gap, alignment, justification, and wrapping.

Stack v1 uses native flexbox and Tailwind CSS v4 static utility maps. It deliberately does not expose a full Flex API, item-level flex controls, reverse direction, visual ordering, grid behavior, arbitrary style props, or runtime class generation. Consumers can use `className` for local composition details while Stack owns the common row/column spacing contract.

## User Stories

1. As a frontend engineer, I want a Stack primitive, so that common vertical and horizontal groups use a consistent component instead of repeated one-off flex classes.
2. As a frontend engineer, I want Stack to render a neutral wrapper by default, so that it does not add incorrect document semantics.
3. As a frontend engineer, I want Stack to support semantic elements, so that I can render sections, articles, navs, lists, forms, fieldsets, and inline wrappers when content structure requires them.
4. As a frontend engineer, I want Stack to support `asChild`, so that compatible child elements can receive Stack layout without an extra DOM wrapper.
5. As a frontend engineer, I want Stack to forward refs, so that parent code can measure, anchor, or integrate wrapper elements when needed.
6. As a design-system lead, I want Stack gaps to use explicit token maps, so that spacing remains aligned with the Tailwind token scale.
7. As a design-system lead, I want Stack classes to be statically detectable, so that registry-installed source stays predictable and build output stays small.
8. As a dashboard engineer, I want Stack to support vertical direction by default, so that card bodies, settings sections, and form groups are easy to compose.
9. As a dashboard engineer, I want Stack to support horizontal direction, so that toolbar rows, button clusters, metadata rows, and status groups are easy to compose.
10. As a dashboard engineer, I want Stack to support alignment options, so that children can stretch, start-align, center, end-align, or baseline-align consistently.
11. As a dashboard engineer, I want Stack to support basic justification options, so that row and column content can be placed at the start, center, end, or spaced between without custom classes.
12. As a dashboard engineer, I want Stack to support wrapping, so that horizontal groups can adapt on narrow screens instead of overflowing by default when wrapping is intentional.
13. As a mobile user, I want stacked content to preserve readable spacing on small screens, so that product workflows do not collapse into cramped layouts.
14. As an RTL user, I want Stack examples and spacing decisions to avoid physical left/right assumptions, so that row layouts behave naturally in right-to-left contexts.
15. As an accessibility reviewer, I want Stack to preserve DOM order as visual and keyboard order, so that tab flow and reading order stay predictable.
16. As an accessibility reviewer, I want Stack to avoid reverse direction and ordering APIs in v1, so that visual reordering does not create inaccessible flows.
17. As an accessibility reviewer, I want Stack to add no roles or focus behavior by default, so that it remains a layout primitive rather than an interactive widget.
18. As a docs author, I want examples that show when to use Stack instead of Box, Container, Flex, Grid, or Separator, so that consumers choose the right primitive.
19. As a docs author, I want examples for lists and form wrappers, so that semantic responsibilities are clear before List, Form, and Field primitives are implemented.
20. As a registry consumer, I want Stack to install without runtime dependencies, so that adding it does not increase the foundational dependency surface.
21. As a package consumer, I want exported Stack prop and token types, so that component APIs are discoverable and reusable.
22. As an SSR app developer, I want Stack to render and hydrate without warnings, so that it works in Next.js-style environments.
23. As an AI coding tool user, I want predictable Stack examples, so that generated component code uses a clear one-dimensional layout primitive instead of overusing Box.
24. As a maintainer, I want Stack to avoid arbitrary responsive object props in v1, so that responsive layout APIs can be designed deliberately across Stack, Flex, Grid, and SimpleGrid.
25. As a QA engineer, I want tests for direction, gap, alignment, justification, wrapping, semantic rendering, `asChild`, refs, SSR, and a11y smoke, so that Stack stays stable as layout primitives expand.

## Implementation Decisions

- Stack is the next high-impact P0 layout primitive after the already published Container PRD.
- Stack is a one-dimensional composition primitive, not a full flexbox abstraction.
- Stack renders a neutral native element by default.
- Stack supports a controlled set of semantic elements suitable for sections, landmarks, lists, form wrappers, and inline composition.
- Stack supports wrapper-free composition through `asChild` with one compatible child.
- Stack supports vertical and horizontal direction, with vertical as the default.
- Stack supports explicit gap tokens using Tailwind utilities and design-system spacing values.
- Stack supports cross-axis alignment and main-axis justification through constrained maps.
- Stack supports optional wrapping for cases where horizontal content should wrap instead of overflow.
- Stack uses gap-based spacing rather than child margins.
- Stack preserves DOM order and does not expose reverse direction, visual ordering, or item-level ordering APIs in v1.
- Stack uses Tailwind CSS v4 utilities, static class maps, stable data attributes, shared class-name merging, and no runtime style parser.
- Stack does not introduce CSS-in-JS, `sx`, arbitrary CSS props, responsive object props, grid behavior, separator insertion, form state, or interactive semantics.
- Stack should compose predictably with Box, Container, Typography, Button, Link, IconButton, DateTimePicker, Timeline, and future Flex, Grid, Card, Form, Field, Separator, and DataTable examples.

## Testing Decisions

- Tests should assert public DOM behavior and class/data attributes rather than private class-map implementation details.
- Render tests should cover default rendering, supported semantic elements, `asChild`, className composition, custom attributes, refs, direction, gap, alignment, justification, wrapping, and children.
- Type-level tests should verify unsupported token values and unsupported element values are rejected where practical.
- Accessibility tests should cover axe smoke, semantic element preservation, no fake roles by default, list semantics, form wrapper caveats, intentional landmark use, and the expectation that DOM order remains authoritative.
- SSR tests should cover server rendering and hydration without warnings.
- Storybook should cover default vertical stack, horizontal toolbar, gap matrix, alignment matrix, justification examples, wrapping row, list semantics, form group layout, Box and Container composition, dashboard examples, dark mode, density, RTL, responsive `className` composition, and `asChild`.
- Registry validation and smoke coverage should prove Stack installs cleanly, has no runtime dependencies, and works through both package and registry consumption paths.
- Existing Box tests and stories are the closest prior art for class maps, `asChild`, semantic rendering, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out of Scope

- Generic Box spacing, surface, border, radius, display, or overflow shortcuts.
- Container max-width, gutters, safe-area behavior, or page-width rules.
- Full Flex API, including grow, shrink, basis, order, self alignment, and advanced flex shorthand behavior.
- Reverse direction or visual reordering APIs.
- Grid, SimpleGrid, subgrid, masonry, or two-dimensional layout.
- Separator or Divider insertion between children.
- Form state, validation, labels, help text, errors, or fieldset orchestration.
- List, DataList, menu, toolbar, breadcrumb, or navigation behavior beyond native element rendering.
- Responsive object or array props.
- Arbitrary style props, `sx`, CSS-in-JS, or runtime class generation.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, or interactive behavior.

## Further Notes

- Source product PRD describes Stack as a P0 layout primitive for vertical layout with gap and responsive support.
- The high-impact priority plan names Stack as the next practical sequence item after completed components and the published Container plan.
- Tailwind CSS documentation confirms utility-first static classes, direct flex/gap composition, and logical property utilities for RTL-aware spacing.
- Modern Web Guidance `css-layout` recommends flexbox for simple row or column layouts, `gap` instead of child margins, wrapping when overflow is possible, logical properties, intrinsic sizing, and avoiding visual reordering for interactive content.
- Dethink's v1 decision is intentionally narrower than a general Flex primitive so Stack remains easy to audit, easy to install through the registry, and hard to misuse for complex layout.
