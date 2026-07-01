# Flex Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/49

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, B2B applications, and AI-native React interfaces need a dependable lower-level flex layout primitive after Stack. Stack covers common one-dimensional composition, but teams still need explicit flexbox control for toolbars, filter bars, wrapped action groups, split rows, media layouts, form action rows, prompt shells, and item sizing.

Without Flex, consumers either overuse Stack for advanced flexbox behavior or repeat ad hoc Tailwind classes across examples and product code. That makes layout intent less discoverable, creates inconsistent gap and item-sizing patterns, and increases the chance of inaccessible visual reordering.

## Solution

Ship Flex as a P0 layout primitive with a paired FlexItem primitive. Flex renders a neutral wrapper by default, supports semantic element selection through `as`, supports wrapper-free composition through `asChild`, and exposes constrained token maps for display, direction, wrapping, gap, row gap, column gap, cross-axis alignment, main-axis distribution, and wrapped-line content distribution.

FlexItem provides the narrow item-level controls that layout authors need most: grow, shrink, basis, self-alignment, and `minInlineSize="0"` for long-content shrink behavior. Flex v1 deliberately does not expose reverse direction, visual ordering, arbitrary flex shorthand strings, responsive object props, CSS-in-JS, or a runtime style parser. Consumers can still use `className` for local one-off composition details while Flex owns the reusable flexbox contract.

## User Stories

1. As a frontend engineer, I want a Flex primitive, so that advanced one-dimensional layouts use a consistent component instead of repeated flex utility strings.
2. As a frontend engineer, I want Flex to render a neutral wrapper by default, so that it does not add incorrect document semantics.
3. As a frontend engineer, I want Flex to support semantic elements, so that I can render sections, articles, navs, lists, forms, fieldsets, and inline wrappers when content structure requires them.
4. As a frontend engineer, I want Flex to support `asChild`, so that compatible child elements can receive Flex layout without an extra DOM wrapper.
5. As a frontend engineer, I want Flex to forward refs, so that parent code can measure, anchor, or integrate wrapper elements when needed.
6. As a frontend engineer, I want FlexItem to support semantic rendering and `asChild`, so that item-level sizing does not force unnecessary wrappers.
7. As a design-system lead, I want Flex gaps to use explicit token maps, so that spacing remains aligned with the Tailwind token scale.
8. As a design-system lead, I want Flex classes to be statically detectable, so that registry-installed source stays predictable and build output stays small.
9. As a dashboard engineer, I want row direction by default, so that toolbar and filter layouts are concise.
10. As a dashboard engineer, I want column direction available, so that Flex can support lower-level column layout without forcing Stack when item sizing matters.
11. As a dashboard engineer, I want inline-flex display, so that compact inline groups and status affordances can align with text content.
12. As a dashboard engineer, I want wrapping support, so that filter bars and action rows can adapt on narrow screens instead of overflowing.
13. As a dashboard engineer, I want independent row and column gaps, so that wrapped layouts can tune horizontal and vertical spacing separately.
14. As a dashboard engineer, I want align, justify, and content controls, so that item and wrapped-line distribution can be expressed without custom classes.
15. As a dashboard engineer, I want FlexItem grow and shrink controls, so that split rows and fill-remaining layouts are easy to compose.
16. As a dashboard engineer, I want FlexItem basis controls, so that responsive wrap groups can use predictable item sizing.
17. As a dashboard engineer, I want FlexItem self-alignment, so that one item can opt out of container cross-axis alignment.
18. As a dashboard engineer, I want a documented `minInlineSize="0"` escape hatch, so that long URLs, code, and labels do not force unexpected flex overflow.
19. As a mobile user, I want flexible layouts to wrap or shrink predictably, so that product workflows remain usable on narrow screens.
20. As an RTL user, I want Flex examples and spacing decisions to avoid physical left/right assumptions, so that row layouts behave naturally in right-to-left contexts.
21. As an accessibility reviewer, I want Flex to preserve DOM order as visual and keyboard order, so that tab flow and reading order stay predictable.
22. As an accessibility reviewer, I want Flex to avoid reverse direction and ordering APIs in v1, so that visual reordering does not create inaccessible flows.
23. As an accessibility reviewer, I want Flex to add no roles or focus behavior by default, so that it remains a layout primitive rather than an interactive widget.
24. As a docs author, I want examples that show when to use Flex instead of Stack, Box, Container, Grid, or Separator, so that consumers choose the right primitive.
25. As a docs author, I want practical examples for toolbars, filters, media rows, action rows, and prompt shells, so that teams can copy realistic production patterns.
26. As a registry consumer, I want Flex to install without runtime dependencies, so that adding it does not increase the foundational dependency surface.
27. As a package consumer, I want exported Flex and FlexItem prop and token types, so that component APIs are discoverable and reusable.
28. As an SSR app developer, I want Flex and FlexItem to render and hydrate without warnings, so that they work in Next.js-style environments.
29. As an AI coding tool user, I want predictable Flex examples, so that generated component code uses the right primitive for lower-level one-dimensional layout.
30. As a maintainer, I want Flex to avoid arbitrary responsive object props in v1, so that responsive layout APIs can be designed deliberately across Stack, Flex, Grid, and SimpleGrid.
31. As a QA engineer, I want tests for display, direction, wrapping, gap, row and column gaps, alignment, justification, content distribution, item sizing, semantic rendering, `asChild`, refs, SSR, and a11y smoke, so that Flex stays stable as layout primitives expand.

## Implementation Decisions

- Flex is the next new PRD candidate after Stack in the high-impact component order.
- Container remains unfinished integration work because GitHub issues #38-#41 are open and the component is not on `main`; that does not block Flex planning, but it should be resolved separately before broad layout examples assume Container is available.
- Flex is a lower-level one-dimensional layout primitive, not a Stack replacement.
- Flex renders a neutral native element by default.
- Flex supports a controlled set of semantic elements suitable for sections, landmarks, lists, form wrappers, and inline composition.
- Flex supports wrapper-free composition through `asChild` with one compatible child.
- Flex supports `display="flex"` and `display="inline-flex"`.
- Flex supports row and column direction, with row as the default.
- Flex supports wrapping through `wrap="wrap"` but does not expose wrap-reverse.
- Flex supports shared gap plus rowGap and columnGap overrides through explicit Tailwind utility maps.
- Flex supports cross-axis alignment, main-axis justification, and wrapped-line content distribution through constrained maps.
- Flex preserves DOM order and does not expose reverse direction, visual ordering, or item-level `order` APIs in v1.
- FlexItem is included in v1 because advanced Flex use cases need item-level grow, shrink, basis, self-alignment, and `minInlineSize="0"` without arbitrary CSS props.
- FlexItem does not expose arbitrary flex shorthand strings in v1.
- Consumers can use `className` for logical auto margins such as `ms-auto` when one item needs to push to the far edge.
- Flex and FlexItem use Tailwind CSS v4 utilities, static class maps, stable data attributes, shared class-name merging, and no runtime style parser.
- Flex does not introduce CSS-in-JS, `sx`, arbitrary CSS props, responsive object props, grid behavior, separator insertion, form state, or interactive semantics.
- Flex should compose predictably with Box, Stack, Typography, Button, Link, IconButton, DateTimePicker, Timeline, and future Container, Grid, Card, Form, Field, Separator, and DataTable examples.

## Testing Decisions

- Tests should assert public DOM behavior and class/data attributes rather than private class-map implementation details.
- Render tests should cover Flex default rendering, supported semantic elements, `asChild`, className composition, custom attributes, refs, display, direction, wrapping, gap, rowGap, columnGap, align, justify, content, and children.
- Render tests should cover FlexItem default rendering, supported semantic elements, `asChild`, className composition, custom attributes, refs, grow, shrink, basis, align, `minInlineSize`, and children.
- Type-level tests should verify unsupported token values and unsupported element values are rejected where practical.
- Accessibility tests should cover axe smoke, semantic element preservation, no fake roles by default, list semantics, form wrapper caveats, intentional landmark use, and the expectation that DOM order remains authoritative.
- SSR tests should cover server rendering and hydration without warnings for Flex and FlexItem.
- Storybook should cover base row, column, inline-flex, wrapping, row/column gap matrix, alignment matrix, justification examples, align-content examples, item grow/shrink/basis examples, long-content shrink examples, toolbar and filter examples, Stack/Box/Container composition, dark mode, density, RTL, responsive `className` composition, and `asChild`.
- Registry validation and smoke coverage should prove Flex installs cleanly, has no runtime dependencies, and works through both package and registry consumption paths.
- Existing Stack and Box tests and stories are the closest prior art for class maps, `asChild`, semantic rendering, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out of Scope

- Generic Box spacing, surface, border, radius, display, or overflow shortcuts.
- Stack replacement for common grouped content.
- Container max-width, gutters, safe-area behavior, or page-width rules.
- Reverse direction or visual reordering APIs.
- Item `order` props.
- Arbitrary flex shorthand strings, arbitrary CSS props, `sx`, CSS-in-JS, or runtime class generation.
- Grid, SimpleGrid, subgrid, masonry, or two-dimensional layout.
- Separator or Divider insertion between children.
- Form state, validation, labels, help text, errors, or fieldset orchestration.
- List, DataList, menu, toolbar, breadcrumb, or navigation behavior beyond native element rendering.
- Responsive object or array props.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, or interactive behavior.

## Further Notes

- Source product PRD describes Flex as a P0 layout primitive.
- The high-impact priority plan names Flex as the next practical sequence item after Stack.
- Tailwind CSS documentation supports utility-first static class composition for flex layouts, gaps, logical spacing, and RTL-aware utility patterns.
- Modern Web Guidance `css-layout` recommends flexbox for simple row or column layouts, `gap` and row/column gaps instead of child margins, wrapping when overflow is possible, `min-inline-size: 0` for shrinkable long-content items, and avoiding visual reordering for interactive content.
- Dethink's v1 decision is intentionally more capable than Stack but still narrower than a generic style-prop system.
