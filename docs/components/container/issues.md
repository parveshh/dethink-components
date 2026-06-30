# Container Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/38
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/39
- AFK source, composition, and behavior tests: https://github.com/parveshh/dethink-components/issues/40
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/41

## Branch Stack

1. `codex/prd-38-container`
2. `codex/issue-39-container-contract-docs`
3. `codex/issue-40-container-source-tests`
4. `codex/issue-41-container-registry-storybook`

The final implementation PR should target `codex/prd-38-container` from the top issue branch after all Container child issues are complete.

## Proposed Breakdown

1. **Title**: Container contract and local planning docs (#39)
   **Type**: AFK
   **Blocked by**: #38
   **User stories covered**: 1-20

2. **Title**: Container source, composition, and behavior tests (#40)
   **Type**: AFK
   **Blocked by**: #39
   **User stories covered**: 1-14, 17-20

3. **Title**: Container registry, Storybook, a11y, and verification (#41)
   **Type**: AFK
   **Blocked by**: #40
   **User stories covered**: 13-20

## Published Issue #39

## What to build

Create the local contract and planning documents for the Container component from the published PRD. The docs should define Container's role as the second P0 layout primitive after Box, its boundary with Box and future Stack/Flex/Grid/Card/page-shell components, the public API shape, responsive width and gutter expectations, safe-area behavior, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Container as a responsive max-width and gutter wrapper, not a general style system.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define `as` and `asChild` behavior, including wrapper-free composition expectations.
- [ ] The docs define size, gutter, no-gutter, fluid, alignment, and safe-area expectations.
- [ ] The docs clearly separate Container from Box, Stack, Inline, Flex, Grid, SimpleGrid, Card, ScrollArea, SidebarShell, and page shell components.
- [ ] The docs explicitly reject arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, automatic ARIA roles, fixed heights, and interactive behavior for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #38

## Published Issue #40

## What to build

Build the Container component source from the approved contract. The slice should deliver the public component, exported prop and token types, explicit Tailwind class maps, semantic `as` rendering, `asChild` composition, className composition, ref forwarding, stable data attributes, and behavior tests for the component's public DOM contract.

The completed slice should make Container usable from the package source and verify its public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Container renders a native neutral element by default.
- [ ] Container supports the approved controlled set of semantic `as` elements.
- [ ] Container supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Container forwards refs in native and composed modes.
- [ ] Container supports approved responsive width size tokens.
- [ ] Container supports fluid/full-width behavior without fixed heights.
- [ ] Container supports approved gutter tokens and no-gutter mode.
- [ ] Container supports inline-axis alignment with centered layout as the default.
- [ ] Container supports optional safe-area mode with static, registry-detectable Tailwind classes.
- [ ] Container exposes stable data attributes for slot, element/composition mode, size, gutter, fluid, alignment, and safe-area mode.
- [ ] Container composes consumer `className` predictably with default classes.
- [ ] Public types are exported from the package entry point.
- [ ] Render and type-level tests cover semantic output, token maps, unsupported values, class merging, custom attributes, refs, and `asChild` behavior.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #39

## Published Issue #41

## What to build

Finish Container as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Container.

The completed slice should make the Container registry item installable and give consumers examples for centered page layout, width sizes, gutters, no gutters, fluid mode, safe-area usage, full-width bands with inner Containers, semantic wrappers, Box composition, dark mode, density, and RTL.

## Acceptance criteria

- [ ] Registry metadata exists for Container and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover base centered layout, size matrix, gutter modes, no-gutter mode, fluid mode, safe-area mode, full-width band composition, semantic elements, `asChild`, Box composition, dark mode, density, and RTL.
- [ ] Accessibility tests cover axe smoke, semantic element preservation, no fake roles by default, and landmark usage only when chosen by the consumer.
- [ ] Playground smoke coverage exercises Container through the package export path.
- [ ] Registry smoke coverage verifies Container metadata, no runtime dependencies, stable data attributes, tokenized classes, and copied source files.
- [ ] Documentation or examples clearly direct users to Box, Stack, Flex, Grid, Card, ScrollArea, and SidebarShell instead of overloading Container v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #40
