# Container Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/38

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, B2B applications, and AI-native React interfaces need a reliable page-width primitive after Box. Without a Container component, page and section examples repeat ad hoc max-width, centering, and gutter classes, which makes layouts inconsistent and makes future Stack, Flex, Grid, Card, Form, DataTable, and dashboard examples harder to compose.

Box now handles generic wrapper styling. Container should handle the narrower responsibility of constraining readable page or section content to responsive widths while preserving full-width surfaces outside it.

## Solution

Ship Container as the next normal P0 layout primitive after Box. Container is a semantic, token-backed responsive wrapper that centers or aligns content, applies responsive max-width sizes, applies optional gutters, supports fluid/full-width mode, respects safe-area insets when requested, forwards refs, supports controlled semantic rendering, and remains dependency-free.

Container v1 should stay intentionally small. It should not become a grid system, Stack replacement, page shell, Card, or arbitrary style-prop parser. Consumers can continue to use `className` for app-specific layout details, while Container owns the repeatable page-width and gutter contract.

## User Stories

1. As a frontend engineer, I want a Container primitive, so that page content uses consistent max-width and centering rules.
2. As a frontend engineer, I want Container to render a neutral wrapper by default, so that it does not add incorrect document semantics.
3. As a frontend engineer, I want Container to support semantic elements, so that I can render page, section, article, header, footer, aside, or nav wrappers when the document structure requires them.
4. As a frontend engineer, I want Container to forward refs, so that parent code can measure or anchor the wrapper when needed.
5. As a frontend engineer, I want Container to support `asChild`, so that compatible child elements can receive container layout without an extra DOM wrapper.
6. As a design-system lead, I want Container widths to use explicit size tokens, so that page widths remain consistent across the library.
7. As a design-system lead, I want Container gutters to use explicit token maps, so that horizontal spacing remains consistent and statically detectable by Tailwind.
8. As a dashboard engineer, I want Container to support a fluid mode, so that dense product surfaces can opt into full-width layout while retaining optional gutters.
9. As a dashboard engineer, I want Container to support centered and edge-aligned layout, so that narrow content and sidebar-adjacent content can be placed intentionally.
10. As a mobile user, I want Container gutters to work on small screens, so that content does not touch viewport edges.
11. As a mobile user, I want Container to optionally respect safe-area insets, so that content avoids notches and device cutouts where relevant.
12. As an RTL user, I want Container spacing and alignment to use logical inline behavior where practical, so that layouts do not assume left-to-right direction.
13. As an accessibility reviewer, I want Container to add no roles or focus behavior by default, so that it remains a layout primitive rather than an interactive widget.
14. As an accessibility reviewer, I want landmark semantics to be opt-in through the rendered element, so that page structure remains intentional.
15. As a docs author, I want examples showing full-width bands with inner Containers, so that consumers understand how to combine page surfaces with constrained content.
16. As a docs author, I want examples contrasting Box and Container, so that teams use Box for generic wrappers and Container for page-width constraints.
17. As a registry consumer, I want Container to install without new runtime dependencies, so that adding it does not increase the foundational dependency surface.
18. As a package consumer, I want exported Container prop and token types, so that component APIs are discoverable and reusable.
19. As an SSR app developer, I want Container to render and hydrate without warnings, so that it works in Next.js-style environments.
20. As a QA engineer, I want tests for size maps, gutters, alignment, fluid mode, safe-area mode, semantic rendering, `asChild`, refs, SSR, and a11y smoke, so that Container stays stable as layout primitives expand.

## Implementation Decisions

- Container is the next normal P0 component after Box.
- Container is a responsive max-width and gutter primitive, not a general-purpose style system.
- Container renders a neutral native element by default.
- Container supports a controlled set of semantic elements suitable for page and section wrappers.
- Container supports wrapper-free composition through `asChild` with one compatible child.
- Container supports explicit max-width size tokens including small through extra-wide page widths and full width.
- Container supports a fluid mode that removes max-width constraints while retaining optional gutters.
- Container supports explicit gutter tokens and a no-gutter mode.
- Container supports optional safe-area padding behavior for viewport-adjacent shells.
- Container supports alignment along the inline axis, with centered layout as the default.
- Container uses Tailwind CSS v4 utilities, static class maps, semantic tokens where relevant, stable data attributes, and the shared class-name merge helper.
- Container does not introduce CSS-in-JS, runtime style parsing, arbitrary CSS props, responsive object props, grid columns, Stack direction behavior, Card anatomy, page shell navigation, scroll containers, or interactive semantics.
- Container should compose predictably with Box, Typography, Button, Link, DateTimePicker, Timeline, and future Stack, Flex, Grid, Card, Form, and DataTable examples.

## Testing Decisions

- Tests should assert public DOM behavior and class/data attributes, with class-map coverage for width, gutter, alignment, fluid, and safe-area modes.
- Render tests should cover default rendering, supported semantic elements, `asChild`, className composition, custom attributes, refs, sizes, gutters, no gutters, fluid mode, alignment, and safe-area mode.
- Type-level tests should reject invalid size, gutter, alignment, and unsupported element values where practical.
- Accessibility tests should cover axe smoke, semantic element preservation, no fake roles by default, and intentional landmark use.
- SSR tests should cover server rendering and hydration without warnings.
- Storybook should cover base centered layout, size matrix, gutter modes, fluid mode, full-width band with inner Container, semantic examples, safe-area example, dark mode, density, RTL, and Box composition.
- Registry validation and smoke coverage should prove Container installs cleanly, has no runtime dependencies, and works through both package and registry consumption paths.
- Existing Box tests and stories are the closest prior art for class maps, `asChild`, semantic rendering, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out Of Scope

- Generic Box spacing and surface shortcuts.
- Stack, Inline, Flex, Grid, SimpleGrid, or responsive column abstractions.
- Card anatomy, elevation, header/content/footer slots, or interactive-card behavior.
- Page shell, sidebar, topbar, navigation, breadcrumbs, or dashboard chrome.
- ScrollArea, splitter, resizable panels, sticky headers, or viewport-height app shells.
- Container query APIs in v1.
- Arbitrary style props, `sx`, CSS-in-JS, responsive object props, or runtime class generation.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, or navigation behavior.

## Further Notes

- Source product PRD describes Container as a P0 layout component: a responsive max-width wrapper with sizes, centering, gutters, fluid option, no fixed heights, and safe-area awareness.
- Modern Web Guidance emphasized logical layout, intrinsic sizing, avoiding `100vw` overflow traps, and using viewport/safe-area mechanics intentionally.
- Material UI Container research confirms common precedent for a centered responsive wrapper with fluid max-width behavior and optional fixed-width behavior. Dethink v1 takes the core responsive wrapper pattern while keeping the API Tailwind-first and registry-friendly.
