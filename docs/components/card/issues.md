# Card Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/67
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/68
- AFK source, slots, and behavior tests: https://github.com/parveshh/dethink-components/issues/69
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/70

## Branch Stack

1. `codex/prd-67-card`
2. `codex/issue-68-card-contract-docs`
3. `codex/issue-69-card-source-tests`
4. `codex/issue-70-card-registry-storybook`

The final implementation PR should target `codex/prd-67-card` from the top issue branch after all Card child issues are complete.

## Proposed Breakdown

1. **Title**: Card contract and local planning docs (#68)
   **Type**: AFK
   **Blocked by**: #67
   **User stories covered**: 1-35

2. **Title**: Card source, slots, and behavior tests (#69)
   **Type**: AFK
   **Blocked by**: #68
   **User stories covered**: 1-27, 29-35

3. **Title**: Card registry, Storybook, a11y, SSR, and verification (#70)
   **Type**: AFK
   **Blocked by**: #69
   **User stories covered**: 15-35

## Published Issue #68

## What to build

Create the local contract and planning documents for the Card component from the published PRD. The docs should define Card as the framed content surface and anatomy primitive after Separator, define the Card slot family, define boundaries between Card, Box, Stack, Flex, Grid, Separator, Typography, Button/Link actions, future Form/Field, future Stat/KPI, future Table/DataTable, Alert/Callout, EmptyState, and AI-specific card primitives, document the public API shape, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Card as a static data-display surface and anatomy primitive, not a generic Box replacement, clickable card, selectable card, layout primitive, form primitive, alert, metric formatter, chart, table, or AI-specific card.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter behavior.
- [ ] The docs define root semantic element support, `asChild`, slot semantic defaults, ref forwarding, className composition, stable data attributes, and constrained token maps.
- [ ] The docs define accessibility expectations for static surfaces, heading/title composition, non-widget semantics, nested Button/Link actions, and no clickable-card behavior in v1.
- [ ] The docs clearly separate Card from Box, Container, Stack, Flex, Grid, Separator, Typography, Alert, Form, Field, List, DataList, Table, DataTable, Stat/KPI, Chart, and AI card primitives.
- [ ] The docs explicitly reject clickability, selection, routing, drag, disclosure, data fetching, metric formatting, charting, table/list rendering, form behavior, arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, and runtime class generation for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #67

## Published Issue #69

## What to build

Build the Card component source and slot family from the approved contract. The slice should deliver public components, exported prop and token types, explicit Tailwind class maps, static semantic rendering, `asChild` composition for the root where approved, className composition, ref forwarding, stable data attributes, constrained surface/radius/shadow/spacing variants, and behavior tests for the public DOM and accessibility contract.

The completed slice should make Card and all slot components usable from the package source and verify public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Card renders the approved default root element and supports the approved semantic root elements.
- [ ] Card supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Card forwards refs in native and composed modes.
- [ ] CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter render with approved semantic defaults and forward refs.
- [ ] CardTitle supports approved heading semantics without forcing one global document outline choice.
- [ ] Card exposes constrained token-backed variant maps for surface, border, radius, shadow/elevation, and spacing/density where approved by the contract.
- [ ] CardAction and CardFooter use wrapping-safe, logical alignment classes suitable for RTL.
- [ ] Card and slots expose stable `data-slot` attributes and relevant variant data attributes.
- [ ] Card and slots compose consumer `className` predictably with default classes.
- [ ] Card remains static and does not add clickability, selection, routing, drag, disclosure, focus-management, or widget roles.
- [ ] Public components and prop/token types are exported from the package entry point.
- [ ] Render and type-level tests cover root defaults, supported elements, unsupported values, `asChild`, refs, class merging, custom attributes, all slots, title semantics, action/footer composition, variants, and density-aware classes.
- [ ] Accessibility tests or render assertions cover non-widget semantics and nested Button/Link action patterns where practical.
- [ ] SSR smoke tests cover server rendering and hydration without warnings for Card and all slots.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #68

## Published Issue #70

## What to build

Finish Card as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Card and every slot component.

The completed slice should make the Card registry item installable and give consumers examples for base anatomy, header action, content-only cards, footer actions, dashboard metric cards, settings panel cards, resource cards, media/content composition, Separator composition, `asChild`, dark mode, density, RTL, responsive `className`, and composition with existing primitives.

## Acceptance criteria

- [ ] Registry metadata exists for Card and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover base anatomy, header/title/description/action composition, content-only card, footer actions, dashboard metric card, settings panel card, resource card, media/content composition, empty/content states, Separator composition, `asChild`, dark mode, density, RTL, and responsive `className` composition.
- [ ] Accessibility tests cover axe smoke, static non-widget semantics, heading/title composition, nested Button/Link action patterns, and no clickable-card role behavior by default.
- [ ] Playground smoke coverage exercises Card and all slot components through the package export path.
- [ ] Registry smoke coverage verifies Card metadata, dependency-free behavior, stable data attributes, tokenized classes, slot exports, and copied source files.
- [ ] Documentation or examples clearly direct users to Box, Container, Stack, Flex, Grid, Separator, Typography, Alert, Form, Field, List, DataList, Table, DataTable, Stat/KPI, Chart, and AI-specific card primitives instead of overloading Card v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #69
