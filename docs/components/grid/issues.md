# Grid Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/56
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/57
- AFK source, composition, and behavior tests: https://github.com/parveshh/dethink-components/issues/58
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/59

## Branch Stack

1. `codex/prd-56-grid`
2. `codex/issue-57-grid-contract-docs`
3. `codex/issue-58-grid-source-tests`
4. `codex/issue-59-grid-registry-storybook`

The final implementation PR should target `codex/prd-56-grid` from the top issue branch after all Grid child issues are complete.

## Proposed Breakdown

1. **Title**: Grid contract and local planning docs (#57)
   **Type**: AFK
   **Blocked by**: #56
   **User stories covered**: 1-32

2. **Title**: Grid source, GridItem source, and behavior tests (#58)
   **Type**: AFK
   **Blocked by**: #57
   **User stories covered**: 1-23, 26-32

3. **Title**: Grid registry, Storybook, a11y, and verification (#59)
   **Type**: AFK
   **Blocked by**: #58
   **User stories covered**: 19-32

## Published Issue #57

## What to build

Create the local contract and planning documents for the Grid component from the published PRD. The docs should define Grid as the two-dimensional layout primitive after Stack and Flex, define the boundary between Grid, GridItem, Box, Container, Stack, Flex, Card, Table, DataGrid, Form, Field, and future layout primitives, document the public API shape, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Grid as a two-dimensional layout primitive, not a Box, Stack, Flex, Container, Card, Table, DataGrid, or full style-system replacement.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define Grid `as` and `asChild` behavior, including wrapper-free composition expectations.
- [ ] The docs define GridItem `as` and `asChild` behavior, including item-level composition expectations.
- [ ] The docs define columns, rows, gap, rowGap, columnGap, align, justify, alignContent, justifyContent, colSpan, rowSpan, item align, item justify, and `minInlineSize` expectations.
- [ ] The docs clearly separate Grid from Box, Container, Stack, Flex, SimpleGrid, Card, Separator, Divider, Form, Field, Table, DataTable, DataGrid, and interactive components.
- [ ] The docs explicitly reject masonry, dense packing, subgrid API, named areas, line placement, visual reordering APIs, arbitrary template strings, arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, automatic ARIA roles, and interactive behavior for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #56

## Published Issue #58

## What to build

Build the Grid and GridItem component source from the approved contract. The slice should deliver public components, exported prop and token types, explicit Tailwind class maps, semantic `as` rendering, `asChild` composition, className composition, ref forwarding, stable data attributes, and behavior tests for the public DOM contract.

The completed slice should make Grid and GridItem usable from the package source and verify public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Grid renders a native neutral element by default.
- [ ] Grid supports the approved controlled set of semantic `as` elements.
- [ ] Grid supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Grid forwards refs in native and composed modes.
- [ ] Grid establishes `display: grid`.
- [ ] Grid supports approved columns, rows, gap, rowGap, columnGap, align, justify, alignContent, and justifyContent maps.
- [ ] Row and column gap props override the shared gap for their axis while remaining statically detectable Tailwind classes.
- [ ] Auto-fit column presets use static class names and do not rely on runtime-generated Tailwind classes.
- [ ] GridItem renders a native neutral element by default.
- [ ] GridItem supports the approved controlled set of semantic `as` elements.
- [ ] GridItem supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] GridItem forwards refs in native and composed modes.
- [ ] GridItem supports colSpan, rowSpan, align, justify, and `minInlineSize` maps.
- [ ] Grid and GridItem expose stable data attributes for slot, element/composition mode, and active token states.
- [ ] Grid and GridItem compose consumer `className` predictably with default classes.
- [ ] Public types are exported from the package entry point.
- [ ] Render and type-level tests cover semantic output, token maps, unsupported values, class merging, custom attributes, refs, and `asChild` behavior.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #57

## Published Issue #59

## What to build

Finish Grid as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Grid and GridItem.

The completed slice should make the Grid registry item installable and give consumers examples for fixed columns, auto-fit grids, explicit rows, gaps, row and column gaps, alignment, track distribution, spans, long-content shrink behavior, dashboard grids, settings layouts, comparison panels, KPI matrices, resource lists, semantic wrappers, `asChild`, dark mode, density, RTL, responsive `className`, and composition with existing primitives.

## Acceptance criteria

- [ ] Registry metadata exists for Grid and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover base grid, fixed columns, auto-fit resource grid, explicit rows, gap matrix, row and column gaps, item alignment, track distribution, column spans, row spans, long-content `minInlineSize="0"`, dashboard examples, settings examples, comparison examples, KPI examples, resource-list examples, semantic elements, `asChild`, Box/Container/Stack/Flex composition, dark mode, density, and RTL.
- [ ] Accessibility tests cover axe smoke, semantic element preservation, no fake roles by default, DOM order expectations, and landmark usage only when chosen by the consumer.
- [ ] Playground smoke coverage exercises Grid and GridItem through the package export path.
- [ ] Registry smoke coverage verifies Grid metadata, no runtime dependencies, stable data attributes, tokenized classes, and copied source files.
- [ ] Documentation or examples clearly direct users to Box, Container, Stack, Flex, Card, Separator, Divider, Form, Field, Table, DataTable, and DataGrid instead of overloading Grid v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #58
