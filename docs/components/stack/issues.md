# Stack Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/43
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/44
- AFK source, composition, and behavior tests: https://github.com/parveshh/dethink-components/issues/45
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/46

## Branch Stack

1. `codex/prd-43-stack`
2. `codex/issue-44-stack-contract-docs`
3. `codex/issue-45-stack-source-tests`
4. `codex/issue-46-stack-registry-storybook`

The final implementation PR should target `codex/prd-43-stack` from the top issue branch after all Stack child issues are complete.

## Proposed Breakdown

1. **Title**: Stack contract and local planning docs (#44)
   **Type**: AFK
   **Blocked by**: #43
   **User stories covered**: 1-25

2. **Title**: Stack source, composition, and behavior tests (#45)
   **Type**: AFK
   **Blocked by**: #44
   **User stories covered**: 1-17, 20-25

3. **Title**: Stack registry, Storybook, a11y, SSR, and verification (#46)
   **Type**: AFK
   **Blocked by**: #45
   **User stories covered**: 18-25

## Published Issue #44

## What to build

Create the local contract and planning documents for the Stack component from the published PRD. The docs should define Stack's role as a P0 one-dimensional composition primitive, its boundary with Box, Container, future Flex/Grid/Card/Form/List/Separator components, the public API shape, direction and spacing expectations, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Stack as a one-dimensional composition primitive, not a full Flex or Grid abstraction.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define `as` and `asChild` behavior, including wrapper-free composition expectations.
- [ ] The docs define direction, gap, alignment, justification, and wrapping expectations.
- [ ] The docs clearly separate Stack from Box, Container, Flex, Grid, SimpleGrid, Card, Separator, List, Form, Field, and interactive components.
- [ ] The docs explicitly reject arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, item ordering, reverse direction, automatic ARIA roles, and interactive behavior for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #43

## Published Issue #45

## What to build

Build the Stack component source from the approved contract. The slice should deliver the public component, exported prop and token types, explicit Tailwind class maps, semantic `as` rendering, `asChild` composition, className composition, ref forwarding, stable data attributes, and behavior tests for the component's public DOM contract.

The completed slice should make Stack usable from the package source and verify its public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Stack renders a native neutral element by default.
- [ ] Stack supports the approved controlled set of semantic `as` elements.
- [ ] Stack supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Stack forwards refs in native and composed modes.
- [ ] Stack supports vertical and horizontal direction through explicit Tailwind utility maps.
- [ ] Stack supports constrained gap, alignment, justification, and wrap maps from explicit Tailwind utilities.
- [ ] Stack uses gap-based spacing and does not add child margins.
- [ ] Stack exposes stable data attributes for slot, element/composition mode, direction, gap, alignment, justification, and wrap where applicable.
- [ ] Stack composes consumer `className` predictably with default classes.
- [ ] Public types are exported from the package entry point.
- [ ] Render and type-level tests cover semantic output, token maps, unsupported values, class merging, custom attributes, refs, and `asChild` behavior.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #44

## Published Issue #46

## What to build

Finish Stack as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Stack.

The completed slice should make the Stack registry item installable and give consumers examples for vertical composition, horizontal toolbar rows, gap and alignment maps, wrapping rows, list semantics, form group layout, Box and Container composition, dashboard patterns, dark mode, density, RTL, and responsive Tailwind `className` composition.

## Acceptance criteria

- [ ] Registry metadata exists for Stack and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover default vertical stack, horizontal toolbar, gap matrix, alignment matrix, justification examples, wrapping row, list semantics, form group layout, Box and Container composition, dashboard examples, dark mode, density, RTL, responsive composition, and `asChild`.
- [ ] Accessibility tests cover axe smoke, semantic element preservation, no fake roles by default, list semantics, form wrapper caveats, intentional landmark use, and DOM-order preservation expectations.
- [ ] Playground smoke coverage exercises Stack through the package export path.
- [ ] Registry smoke coverage verifies Stack metadata, no runtime dependencies, stable data attributes, tokenized classes, and copied source files.
- [ ] Documentation or examples clearly direct users to Box, Container, Flex, Grid, SimpleGrid, Card, Separator, List, Form, and Field when those components are the better semantic or layout fit.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #45
