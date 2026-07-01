# Card Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/67.

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, B2B applications, and AI-native React interfaces need a dependable Card primitive after the core layout and separator primitives. Box, Container, Stack, Flex, Grid, and Separator now cover generic layout and boundaries, but product screens still need a consistent framed content surface for dashboard metrics, settings panels, resource summaries, empty states, billing panels, AI tool call summaries, and form-adjacent sections.

Without a Card component, examples and application code repeat ad hoc combinations of background, border, radius, shadow, padding, header layout, title typography, description text, action placement, content spacing, and footer alignment. That creates visual drift, makes registry examples harder to copy, and encourages teams to overload Box with product-specific card anatomy.

## Solution

Ship Card as a P0 data-display primitive with a shadcn-compatible anatomy: Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter. Card should provide a token-backed surface, border, radius, optional shadow/elevation, density-aware spacing, stable data attributes, ref forwarding, and `asChild` composition where it is useful and safe.

Card v1 should stay intentionally structural. It should not implement clickable-card behavior, selection state, drag behavior, disclosure behavior, data fetching, metric formatting, chart rendering, table/list semantics, form behavior, arbitrary style props, responsive object props, CSS-in-JS, or a runtime style parser. Consumers can compose Button, Link, Separator, Stack, Flex, Grid, Typography, and future Badge/Avatar/List/Form components inside Card while Card owns the repeatable content-container anatomy.

## User Stories

1. As a frontend engineer, I want a Card primitive, so that framed content surfaces use a consistent component instead of repeated utility strings.
2. As a frontend engineer, I want CardHeader, so that headings, descriptions, and actions align consistently.
3. As a frontend engineer, I want CardTitle, so that card titles use the system typography contract.
4. As a frontend engineer, I want CardDescription, so that supporting card copy uses a consistent muted text style.
5. As a frontend engineer, I want CardAction, so that header actions have predictable placement and alignment.
6. As a frontend engineer, I want CardContent, so that card body spacing is predictable.
7. As a frontend engineer, I want CardFooter, so that footer actions and metadata align consistently.
8. As a frontend engineer, I want Card to forward refs, so that parent code can measure or integrate the rendered surface.
9. As a frontend engineer, I want Card slots to forward refs, so that advanced layout and tests can target the rendered DOM.
10. As a frontend engineer, I want Card to support `asChild`, so that compatible semantic wrappers can receive Card styling without extra DOM.
11. As a frontend engineer, I want Card slots to support controlled semantic elements where appropriate, so that sections, articles, list items, headings, and text can be represented correctly.
12. As a design-system lead, I want Card variants to use constrained token maps, so that surface, border, radius, padding, and shadow choices stay consistent.
13. As a design-system lead, I want Card to use Tailwind CSS static class maps, so that registry-installed source is predictable and build output remains small.
14. As a design-system lead, I want Card spacing to respond to density context, so that compact and comfortable screens remain visually coherent.
15. As a dashboard engineer, I want Card to compose with Grid, so that metric cards and resource cards can be arranged without bespoke layout wrappers.
16. As a dashboard engineer, I want Card to compose with Stack, so that vertical content sections are easy to scan.
17. As a dashboard engineer, I want Card to compose with Flex, so that header actions and footer controls align predictably.
18. As a dashboard engineer, I want Card to compose with Separator, so that card sections can be divided without custom borders.
19. As a settings-page engineer, I want Card examples for form-adjacent sections, so that settings pages have consistent panel structure before Form and Field primitives land.
20. As an analytics engineer, I want Card examples for KPI and resource summaries, so that dashboards can show production-like content before Stat/KPI and Chart land.
21. As an AI product engineer, I want Card examples for tool summaries and prompt-adjacent panels, so that AI-native interfaces can compose trustworthy surfaces.
22. As an RTL user, I want CardAction and CardFooter alignment to use logical layout, so that right-to-left layouts do not require physical left/right overrides.
23. As a mobile user, I want Card content to wrap and constrain safely, so that narrow screens do not overflow or overlap.
24. As an accessibility reviewer, I want Card to avoid inventing widget roles, so that static cards do not expose misleading interactive semantics.
25. As an accessibility reviewer, I want CardTitle to support real heading elements, so that cards can participate in a meaningful document outline when consumers need that.
26. As an accessibility reviewer, I want interactive examples to keep actions as Button or Link children, so that Card does not become an inaccessible clickable container.
27. As a docs author, I want Card examples that show when to use Card instead of Box, Stack, Grid, Separator, Table, Alert, or future Stat/KPI, so that consumers choose the right primitive.
28. As a docs author, I want Storybook coverage for base anatomy, header action, footer actions, media/content composition, dashboard cards, settings cards, density, dark mode, and RTL, so that consumers can copy realistic patterns.
29. As a registry consumer, I want Card to install without new runtime dependencies, so that adopting it keeps the foundational dependency surface small.
30. As a package consumer, I want all Card components and prop/token types exported from the package, so that the API is discoverable and reusable.
31. As an SSR app developer, I want Card and its slots to render and hydrate without warnings, so that they work in Next.js-style environments.
32. As an AI coding tool user, I want predictable Card examples, so that generated component code uses the anatomy slots instead of ad hoc panels.
33. As a maintainer, I want Card to avoid arbitrary responsive object props in v1, so that responsive layout remains deliberate across primitives.
34. As a maintainer, I want Card to leave clickable, selectable, draggable, collapsible, metric, chart, table, list, and form behaviors to dedicated components, so that Card stays a stable surface primitive.
35. As a QA engineer, I want tests for slot rendering, refs, semantic elements, `asChild`, class merging, variants, density, dark mode, RTL, SSR, a11y smoke, registry metadata, and playground smoke, so that Card remains stable as downstream components expand.

## Implementation Decisions

- Card is the next new PRD candidate after Separator in the high-impact development order.
- Card is a data-display and surface anatomy primitive, not a generic Box replacement or an interactive card widget.
- The component set is Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter.
- The anatomy follows the current shadcn/ui Card model: Card contains optional Header, Content, and Footer; Header can contain Title, Description, and Action.
- Card root supports a controlled set of semantic elements suitable for framed content surfaces, such as generic containers, articles, sections, asides, and list items.
- Card root supports `asChild` for wrapper-free composition with one compatible child.
- Slot components should use simple semantic defaults and allow constrained element overrides where useful.
- CardTitle should support heading semantics without forcing a global outline choice.
- Card should use Tailwind CSS v4 utilities, static class maps, stable data attributes, shared class-name merging, and no runtime style parser.
- Card should expose constrained variant maps for surface treatment, border treatment, radius, shadow/elevation, and spacing/density where those choices are part of the reusable contract.
- CardAction and CardFooter should use logical alignment and wrapping-safe layout patterns.
- Card should compose predictably with Box, Container, Stack, Flex, Grid, Separator, Typography, Button, Link, IconButton, DateTimePicker, Timeline, and future Badge, Avatar, List, DataList, Form, Field, Alert, Table, Stat/KPI, Chart, and AI card primitives.
- Card must not add CSS-in-JS, `sx`, arbitrary CSS props, responsive object props, clickability, selection state, disclosure behavior, drag behavior, routing behavior, data fetching, formatting, charts, or table/list/form semantics.
- Card should remain dependency-free beyond the existing base utility stack.

## Testing Decisions

- Tests should assert public DOM behavior, data attributes, class composition, refs, and semantic output rather than private implementation details.
- Render tests should cover Card root defaults, supported semantic elements, `asChild`, className composition, custom attributes, refs, variant maps, density-aware spacing classes, and all anatomy slots.
- Render tests should cover CardHeader with CardTitle, CardDescription, and CardAction composition; CardContent spacing; and CardFooter action alignment.
- Type-level tests should verify unsupported token values and unsupported element values are rejected where practical.
- Accessibility tests should cover axe smoke, valid heading/title composition, static non-widget semantics, and nested Button/Link action patterns.
- SSR tests should cover server rendering and hydration without warnings for Card and all slots.
- Storybook should cover base anatomy, header action, content-only card, footer actions, dashboard metric card, settings panel card, media/content composition, empty/card states, Box/Container/Stack/Flex/Grid/Separator composition, `asChild`, dark mode, density, RTL, and responsive className composition.
- Registry validation and smoke coverage should prove Card installs cleanly, has no new runtime dependencies, exposes all anatomy files/exports, and works through both package and registry consumption paths.
- Existing Box, Stack, Flex, Grid, Separator, Typography, and Button tests/stories are the closest prior art for class maps, `asChild`, semantic rendering, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out of Scope

- Clickable-card or selectable-card behavior.
- Card-as-link routing behavior.
- Drag and drop cards.
- Collapsible cards.
- Data fetching, loading orchestration, or query state management.
- Metric formatting, Stat/KPI logic, charts, table/list rendering, or rich media abstraction.
- Form, Field, Label, validation, or input behavior.
- Alert, Callout, Toast, EmptyState, Badge, Avatar, List, DataList, Table, DataTable, Chart, or AI-specific card primitives.
- Automatic header/content/footer insertion.
- Runtime child inspection for slot ordering.
- Arbitrary CSS props, `sx`, CSS-in-JS, styled-components, Emotion, responsive object props, or runtime class generation.
- Focus management, keyboard interaction, disclosure state, menu behavior, popover behavior, or overlay behavior.

## Further Notes

- Source product direction describes Card as a P0 data-display primitive and the high-impact plan places Card immediately after Separator before Form and Field work.
- Current shadcn/ui documentation presents Card as a compositional anatomy with CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter, installable as `card` through the registry model.
- The existing Dethink primitives already provide layout and text building blocks that Card should compose rather than duplicate.
- Card should make future dashboard, settings, CRUD, analytics, and AI examples feel complete without prematurely introducing higher-level workflow behavior.
