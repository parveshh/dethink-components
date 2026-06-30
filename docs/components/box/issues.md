# Box Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/33
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/34
- AFK source, composition, and behavior tests: https://github.com/parveshh/dethink-components/issues/35
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/36

## Branch Stack

1. `codex/prd-33-box`
2. `codex/issue-34-box-contract-docs`
3. `codex/issue-35-box-source-tests`
4. `codex/issue-36-box-registry-storybook`

The final implementation PR should target `codex/prd-33-box` from the top issue branch after all Box child issues are complete.

## Proposed Breakdown

1. **Title**: Box contract and local planning docs (#34)
   **Type**: AFK
   **Blocked by**: #33
   **User stories covered**: 1-24

2. **Title**: Box source, composition, and behavior tests (#35)
   **Type**: AFK
   **Blocked by**: #34
   **User stories covered**: 1-17, 20-24

3. **Title**: Box registry, Storybook, a11y, and verification (#36)
   **Type**: AFK
   **Blocked by**: #35
   **User stories covered**: 13-24

## Published Issue #34

## What to build

Create the local contract and planning documents for the Box component from the published PRD. The docs should define Box's role as the first P0 layout primitive, the semantic boundary between Box and future layout/content components, the public API shape, token map expectations, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Box as a foundational layout wrapper, not a full style system.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define `as` and `asChild` behavior, including wrapper-free composition expectations.
- [ ] The docs define spacing, logical spacing, gap, surface, border, radius, display, and overflow token map expectations.
- [ ] The docs clearly separate Box from Container, Stack, Inline, Flex, Grid, SimpleGrid, Card, Separator, Divider, AspectRatio, ScrollArea, and interactive components.
- [ ] The docs explicitly reject arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, automatic ARIA roles, and interactive behavior for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #33

## Published Issue #35

## What to build

Build the Box component source from the approved contract. The slice should deliver the public component, exported prop and token types, explicit Tailwind class maps, semantic `as` rendering, `asChild` composition, className composition, ref forwarding, stable data attributes, and behavior tests for the component's public DOM contract.

The completed slice should make Box usable from the package source and verify its public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Box renders a native neutral element by default.
- [ ] Box supports the approved controlled set of semantic `as` elements.
- [ ] Box supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Box forwards refs in native and composed modes.
- [ ] Box supports constrained spacing props for padding, margin, logical inline/block/start/end spacing, and gap.
- [ ] Box supports token-backed surface, border, radius, display, and overflow maps from explicit Tailwind utilities.
- [ ] Box exposes stable data attributes for slot, element/composition mode, spacing, surface, border, radius, display, and overflow where applicable.
- [ ] Box composes consumer `className` predictably with default classes.
- [ ] Public types are exported from the package entry point.
- [ ] Render and type-level tests cover semantic output, token maps, unsupported values, class merging, custom attributes, refs, and `asChild` behavior.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #34

## Published Issue #36

## What to build

Finish Box as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Box.

The completed slice should make the Box registry item installable and give consumers examples for semantic elements, token spacing, logical RTL spacing, simple surfaces, border/radius, `asChild`, dashboard wrapper patterns, dark mode, density, and responsive Tailwind `className` composition.

## Acceptance criteria

- [ ] Registry metadata exists for Box and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover base wrapper, semantic elements, `asChild`, spacing matrix, logical spacing, surfaces, border/radius, display/overflow, dashboard sections, dark mode, density, and RTL.
- [ ] Accessibility tests cover axe smoke, semantic element preservation, no fake roles by default, and landmark usage only when chosen by the consumer.
- [ ] Playground smoke coverage exercises Box through the package export path.
- [ ] Registry smoke coverage verifies Box metadata, no runtime dependencies, stable data attributes, tokenized classes, and copied source files.
- [ ] Documentation or examples clearly direct users to future Container, Stack, Flex, Grid, Card, Separator, Divider, AspectRatio, and ScrollArea components instead of overloading Box v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #35
