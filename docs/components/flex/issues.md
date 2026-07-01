# Flex Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/49
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/50
- AFK source, composition, and behavior tests: https://github.com/parveshh/dethink-components/issues/51
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/52

## Branch Stack

1. `codex/prd-49-flex`
2. `codex/issue-50-flex-contract-docs`
3. `codex/issue-51-flex-source-tests`
4. `codex/issue-52-flex-registry-storybook`

The final implementation PR should target `codex/prd-49-flex` from the top issue branch after all Flex child issues are complete.

## Proposed Breakdown

1. **Title**: Flex contract and local planning docs (#50)
   **Type**: AFK
   **Blocked by**: #49
   **User stories covered**: 1-31

2. **Title**: Flex source, FlexItem source, and behavior tests (#51)
   **Type**: AFK
   **Blocked by**: #50
   **User stories covered**: 1-23, 26-31

3. **Title**: Flex registry, Storybook, a11y, and verification (#52)
   **Type**: AFK
   **Blocked by**: #51
   **User stories covered**: 19-31

## Published Issue #50

## What to build

Create the local contract and planning documents for the Flex component from the published PRD. The docs should define Flex as the lower-level one-dimensional layout primitive after Stack, define the boundary between Flex, FlexItem, Stack, Box, Container, Grid, Separator, Form, and future layout primitives, document the public API shape, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Flex as a lower-level flexbox primitive, not a Stack replacement or full style system.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define Flex `as` and `asChild` behavior, including wrapper-free composition expectations.
- [ ] The docs define FlexItem `as` and `asChild` behavior, including item-level composition expectations.
- [ ] The docs define display, direction, wrap, gap, rowGap, columnGap, align, justify, content, grow, shrink, basis, align-self, and `minInlineSize` expectations.
- [ ] The docs clearly separate Flex from Stack, Box, Container, Grid, SimpleGrid, Card, Separator, Divider, Form, Field, and interactive components.
- [ ] The docs explicitly reject reverse direction, item order, arbitrary flex shorthand strings, arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, automatic ARIA roles, and interactive behavior for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #49

## Published Issue #51

## What to build

Build the Flex and FlexItem component source from the approved contract. The slice should deliver public components, exported prop and token types, explicit Tailwind class maps, semantic `as` rendering, `asChild` composition, className composition, ref forwarding, stable data attributes, and behavior tests for the public DOM contract.

The completed slice should make Flex and FlexItem usable from the package source and verify public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Flex renders a native neutral element by default.
- [ ] Flex supports the approved controlled set of semantic `as` elements.
- [ ] Flex supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Flex forwards refs in native and composed modes.
- [ ] Flex supports `display="flex"` and `display="inline-flex"`.
- [ ] Flex supports approved direction, wrap, gap, rowGap, columnGap, align, justify, and content maps.
- [ ] Row and column gap props override the shared gap for their axis while remaining statically detectable Tailwind classes.
- [ ] FlexItem renders a native neutral element by default.
- [ ] FlexItem supports the approved controlled set of semantic `as` elements.
- [ ] FlexItem supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] FlexItem forwards refs in native and composed modes.
- [ ] FlexItem supports grow, shrink, basis, align-self, and `minInlineSize` maps.
- [ ] Flex and FlexItem expose stable data attributes for slot, element/composition mode, and active token states.
- [ ] Flex and FlexItem compose consumer `className` predictably with default classes.
- [ ] Public types are exported from the package entry point.
- [ ] Render and type-level tests cover semantic output, token maps, unsupported values, class merging, custom attributes, refs, and `asChild` behavior.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #50

## Published Issue #52

## What to build

Finish Flex as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Flex and FlexItem.

The completed slice should make the Flex registry item installable and give consumers examples for row, column, inline-flex, wrapping, row/column gaps, align, justify, align-content, item grow/shrink/basis, long-content shrink behavior, toolbars, filters, action rows, prompt shells, semantic wrappers, `asChild`, dark mode, density, RTL, and composition with existing primitives.

## Acceptance criteria

- [ ] Registry metadata exists for Flex and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover base row, column, inline-flex, wrap gallery, row/column gap matrix, alignment matrix, justification examples, align-content examples, item grow/shrink/basis examples, long-content `minInlineSize="0"`, toolbar/filter examples, semantic elements, `asChild`, Box/Stack/Container composition where available, dark mode, density, and RTL.
- [ ] Accessibility tests cover axe smoke, semantic element preservation, no fake roles by default, DOM order expectations, and landmark usage only when chosen by the consumer.
- [ ] Playground smoke coverage exercises Flex and FlexItem through the package export path.
- [ ] Registry smoke coverage verifies Flex metadata, no runtime dependencies, stable data attributes, tokenized classes, and copied source files.
- [ ] Documentation or examples clearly direct users to Stack, Box, Container, Grid, Card, Separator, Divider, Form, and Field instead of overloading Flex v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #51
