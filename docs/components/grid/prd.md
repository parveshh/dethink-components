# Grid Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/56.

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, B2B applications, and AI-native React interfaces need a dependable two-dimensional layout primitive after Box, Container, Stack, and Flex. Existing primitives cover generic wrappers, page width, grouped one-dimensional composition, and lower-level flexbox control, but product screens still repeat ad hoc grid class strings for dashboard cards, settings panels, comparison layouts, KPI matrices, resource lists, and form-adjacent two-column sections.

Without Grid, consumers either overuse Box with raw grid classes or stretch Flex into two-dimensional layouts. That makes layout intent harder to read, duplicates spacing and alignment decisions, and increases the chance of inaccessible visual ordering patterns such as dense packing or explicit line placement on interactive content.

## Solution

Ship Grid as a P0 two-dimensional layout primitive with a paired GridItem primitive. Grid renders a neutral wrapper by default, supports semantic element selection through `as`, supports wrapper-free composition through `asChild`, and exposes constrained token maps for columns, rows, shared gaps, row gaps, column gaps, item alignment, and track distribution.

GridItem provides safe item-level controls for column span, row span, self-alignment, self-justification, and `minInlineSize="0"` for long-content shrink behavior. Grid v1 deliberately does not expose dense packing, visual ordering, line placement, named grid areas, arbitrary template strings, subgrid, masonry, responsive object props, CSS-in-JS, or a runtime style parser. Consumers can still use `className` for local responsive breakpoint classes and rare advanced CSS Grid utilities while Grid owns the reusable layout contract.

## User Stories

1. As a frontend engineer, I want a Grid primitive, so that two-dimensional layouts use a consistent component instead of repeated grid utility strings.
2. As a frontend engineer, I want Grid to render a neutral wrapper by default, so that it does not add incorrect document semantics.
3. As a frontend engineer, I want Grid to support semantic elements, so that I can render sections, articles, navs, lists, forms, and fieldsets when content structure requires them.
4. As a frontend engineer, I want Grid to support `asChild`, so that compatible child elements can receive Grid layout without an extra DOM wrapper.
5. As a frontend engineer, I want Grid to forward refs, so that parent code can measure, anchor, or integrate wrapper elements when needed.
6. As a frontend engineer, I want GridItem to support semantic rendering and `asChild`, so that item-level spanning does not force unnecessary wrappers.
7. As a design-system lead, I want Grid gaps to use explicit token maps, so that spacing remains aligned with the Tailwind token scale.
8. As a design-system lead, I want Grid classes to be statically detectable, so that registry-installed source stays predictable and build output stays small.
9. As a dashboard engineer, I want fixed column counts, so that common card and panel grids are concise.
10. As a dashboard engineer, I want auto-fit column presets, so that resource lists and cards adapt without bespoke media queries.
11. As a dashboard engineer, I want explicit row presets, so that two-dimensional examples can define predictable row tracks when needed.
12. As a dashboard engineer, I want shared gap plus row and column gap overrides, so that grid spacing can tune horizontal and vertical rhythm independently.
13. As a dashboard engineer, I want item alignment and justification controls, so that content inside tracks can align without custom classes.
14. As a dashboard engineer, I want track distribution controls, so that compact grids can be positioned inside available space.
15. As a dashboard engineer, I want GridItem column spans, so that hero cards, summary panels, and wide controls can span multiple tracks.
16. As a dashboard engineer, I want GridItem row spans, so that taller dashboard or settings sections can occupy predictable vertical space.
17. As a dashboard engineer, I want per-item self-alignment, so that one cell can opt out of the container's default alignment.
18. As a dashboard engineer, I want a documented `minInlineSize="0"` escape hatch, so that long URLs, code, and labels do not force unexpected grid overflow.
19. As a mobile user, I want grid layouts to collapse or auto-fit predictably, so that product workflows remain usable on narrow screens.
20. As an RTL user, I want Grid examples and spacing decisions to avoid physical left/right assumptions, so that layouts behave naturally in right-to-left contexts.
21. As an accessibility reviewer, I want Grid to preserve DOM order as reading and keyboard order, so that tab flow and screen reader order stay predictable.
22. As an accessibility reviewer, I want Grid to avoid dense packing and visual-order APIs in v1, so that visual placement does not contradict DOM order.
23. As an accessibility reviewer, I want Grid to add no roles or focus behavior by default, so that it remains a layout primitive rather than an interactive widget.
24. As a docs author, I want examples that show when to use Grid instead of Box, Container, Stack, Flex, Card, Table, or DataGrid, so that consumers choose the right primitive.
25. As a docs author, I want practical examples for dashboards, settings, comparisons, KPIs, resource lists, and form-adjacent layouts, so that teams can copy realistic production patterns.
26. As a registry consumer, I want Grid to install without runtime dependencies, so that adding it does not increase the foundational dependency surface.
27. As a package consumer, I want exported Grid and GridItem prop and token types, so that component APIs are discoverable and reusable.
28. As an SSR app developer, I want Grid and GridItem to render and hydrate without warnings, so that they work in Next.js-style environments.
29. As an AI coding tool user, I want predictable Grid examples, so that generated component code uses the right primitive for two-dimensional layout.
30. As a maintainer, I want Grid to avoid arbitrary responsive object props in v1, so that responsive layout APIs can be designed deliberately across layout primitives.
31. As a maintainer, I want subgrid, masonry, named areas, and line placement left out of v1, so that advanced layout contracts can be designed from real examples rather than guessed early.
32. As a QA engineer, I want tests for columns, rows, gaps, alignment, track distribution, item spans, semantic rendering, `asChild`, refs, SSR, a11y smoke, and registry install, so that Grid stays stable as layout primitives expand.

## Implementation Decisions

- Grid is the next new PRD candidate after Stack and Flex in the high-impact component order.
- Grid is a two-dimensional layout primitive, not a Box, Stack, Flex, Container, Card, Table, or DataGrid replacement.
- Grid renders a neutral native element by default.
- Grid supports a controlled set of semantic elements suitable for sections, landmarks, lists, form wrappers, and product layout regions.
- Grid supports wrapper-free composition through `asChild` with one compatible child.
- Grid establishes `display: grid` and does not expose `inline-grid` in v1.
- Grid supports fixed column presets for 1, 2, 3, 4, 5, 6, and 12 columns.
- Grid supports auto-fit presets for common responsive card and resource grids.
- Grid supports explicit row presets for no explicit rows, 1, 2, 3, 4, 5, and 6 rows.
- Grid supports shared gap plus rowGap and columnGap overrides through explicit Tailwind utility maps.
- Grid supports item alignment, item justification, align-content, and justify-content through constrained maps.
- Grid preserves DOM order and does not expose dense packing, visual ordering, line-start, line-end, named area, or arbitrary placement APIs in v1.
- GridItem is included in v1 because useful Grid layouts need item-level spans, self-alignment, self-justification, and `minInlineSize="0"` without arbitrary CSS props.
- GridItem supports spans only, not explicit line placement.
- GridItem does not expose `order` in v1.
- Consumers can use `className` for responsive breakpoint classes and rare advanced grid utilities.
- Grid and GridItem use Tailwind CSS v4 utilities, static class maps, stable data attributes, shared class-name merging, and no runtime style parser.
- Grid does not introduce CSS-in-JS, `sx`, arbitrary CSS props, responsive object props, subgrid, masonry, table semantics, form state, or interactive semantics.
- Grid should compose predictably with Box, Container, Stack, Flex, Typography, Button, Link, IconButton, DateTimePicker, Timeline, and future Card, Form, Field, Separator, Table, and DataTable examples.

## Testing Decisions

- Tests should assert public DOM behavior and class/data attributes rather than private class-map implementation details.
- Render tests should cover Grid default rendering, supported semantic elements, `asChild`, className composition, custom attributes, refs, columns, rows, gap, rowGap, columnGap, align, justify, alignContent, justifyContent, and children.
- Render tests should cover GridItem default rendering, supported semantic elements, `asChild`, className composition, custom attributes, refs, colSpan, rowSpan, align, justify, `minInlineSize`, and children.
- Type-level tests should verify unsupported token values and unsupported element values are rejected where practical.
- Accessibility tests should cover axe smoke, semantic element preservation, no fake roles by default, list semantics, landmark usage only when chosen by consumers, and the expectation that DOM order remains authoritative.
- SSR tests should cover server rendering and hydration without warnings for Grid and GridItem.
- Storybook should cover base grid, fixed columns, auto-fit grids, rows, gap matrix, row and column gaps, alignment matrix, track distribution, item spans, long-content shrink behavior, dashboard examples, settings examples, comparison examples, KPI examples, resource-list examples, semantic wrappers, `asChild`, dark mode, density, RTL, responsive `className` composition, and composition with existing layout primitives.
- Registry validation and smoke coverage should prove Grid installs cleanly, has no runtime dependencies, and works through both package and registry consumption paths.
- Existing Box, Container, Stack, and Flex tests and stories are the closest prior art for class maps, `asChild`, semantic rendering, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out of Scope

- Generic Box spacing, surface, border, radius, display, or overflow shortcuts.
- Stack replacement for common grouped content.
- Flex replacement for one-dimensional alignment and item sizing.
- Container max-width, gutters, safe-area behavior, or page-width rules.
- Separator or Divider insertion between children.
- Card anatomy, surfaces, headers, footers, or action areas.
- Form state, validation, labels, help text, errors, or fieldset orchestration.
- Table, DataTable, DataGrid, calendar grid, or spreadsheet semantics.
- Masonry, grid lanes, or `grid-auto-flow: dense`.
- Subgrid API.
- Named grid areas.
- Line-start and line-end placement.
- Visual reordering APIs.
- Arbitrary template strings, arbitrary CSS props, `sx`, CSS-in-JS, or runtime class generation.
- Responsive object or array props.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, or interactive behavior.

## Further Notes

- Source product PRD describes Grid as a P0 layout primitive.
- The high-impact priority plan names Grid as the next practical sequence item after Stack and Flex.
- Tailwind CSS documentation confirms explicit grid utilities and arbitrary-value utilities are available; Dethink's implementation should use static class maps so Tailwind can detect every variant.
- Modern Web Guidance `css-layout` recommends Grid for rows-and-columns layouts, `repeat(auto-fit, minmax(min, 1fr))` for unknown responsive item counts, spans for sizing items across tracks, and avoiding dense packing for interactive content because it can desynchronize visual order from keyboard order.
- Dethink's v1 decision is intentionally more capable than Box and narrower than a generic grid-template parser.
