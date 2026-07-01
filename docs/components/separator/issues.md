# Separator Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/62
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/63
- AFK source, alias, composition, and behavior tests: https://github.com/parveshh/dethink-components/issues/64
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/65

## Branch Stack

1. `codex/prd-62-separator`
2. `codex/issue-63-separator-contract-docs`
3. `codex/issue-64-separator-source-tests`
4. `codex/issue-65-separator-registry-storybook`

The final implementation PR should target `codex/prd-62-separator` from the top issue branch after all Separator child issues are complete.

## Proposed Breakdown

1. **Title**: Separator contract and local planning docs (#63)
   **Type**: AFK
   **Blocked by**: #62
   **User stories covered**: 1-31

2. **Title**: Separator source, Divider alias, and behavior tests (#64)
   **Type**: AFK
   **Blocked by**: #63
   **User stories covered**: 1-22, 25-31

3. **Title**: Separator registry, Storybook, a11y, and verification (#65)
   **Type**: AFK
   **Blocked by**: #64
   **User stories covered**: 13-31

## Published Issue #63

## What to build

Create the local contract and planning documents for the Separator component from the published PRD. The docs should define Separator as the static boundary primitive after Grid, define the Divider alias, define the boundary between Separator, Box borders, Stack/Flex/Grid gaps, Card sections, menus/toolbars, and future Splitter / Resizable Panels, document the public API shape, accessibility invariants, test seams, out-of-scope decisions, and stacked branch mapping.

This slice should not implement runtime component source beyond documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Separator as a static visual/semantic boundary primitive, not a layout container, Card section, menu group, toolbar behavior, or resizable Splitter.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define Separator and Divider alias behavior.
- [ ] The docs define `as`, `asChild`, decorative mode, orientation, thickness, tone, and spacing expectations.
- [ ] The docs define semantic defaults, decorative `aria-hidden`, non-`hr` `role="separator"`, and orientation behavior.
- [ ] The docs clearly separate Separator from Box, Container, Stack, Flex, Grid, Card, Menu, Toolbar, Splitter, Form, Field, and interactive components.
- [ ] The docs explicitly reject focusable splitter widgets, drag handles, keyboard behavior, value semantics, labelled/content-bearing dividers, automatic insertion between children, arbitrary CSS prop parsing, `sx`, CSS-in-JS, responsive object props, and runtime class generation for v1.
- [ ] The docs list render, type-level, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #62

## Published Issue #64

## What to build

Build the Separator component source and Divider alias from the approved contract. The slice should deliver public components, exported prop and token types, explicit Tailwind class maps, semantic rendering, decorative mode, `asChild` composition, className composition, ref forwarding, stable data attributes, and behavior tests for the public DOM and accessibility contract.

The completed slice should make Separator and Divider usable from the package source and verify public rendering behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Separator renders `<hr>` by default.
- [ ] Separator supports the approved controlled set of `as` elements.
- [ ] Separator supports `asChild` composition with one compatible child element and no extra wrapper.
- [ ] Separator forwards refs in native and composed modes.
- [ ] Separator supports horizontal and vertical orientation maps.
- [ ] Separator supports approved thickness, tone, and spacing maps.
- [ ] Semantic default mode preserves separator semantics and matching orientation.
- [ ] Decorative mode sets `aria-hidden="true"` and avoids separator role/orientation attributes.
- [ ] Non-`hr` semantic rendering sets `role="separator"`.
- [ ] Separator is not focusable by default.
- [ ] Separator rejects content-bearing usage where practical.
- [ ] Divider is exported as an alias with the same behavior and prop type.
- [ ] Separator exposes stable data attributes for slot, element/composition mode, and active token states.
- [ ] Separator composes consumer `className` predictably with default classes.
- [ ] Public types are exported from the package entry point.
- [ ] Render and type-level tests cover semantic output, decorative mode, token maps, unsupported values, class merging, custom attributes, refs, Divider alias, and `asChild` behavior.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #63

## Published Issue #65

## What to build

Finish Separator as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, registry smoke coverage, and final verification for Separator and Divider.

The completed slice should make the Separator registry item installable and give consumers examples for horizontal and vertical separators, semantic and decorative modes, thickness, tone, spacing, toolbar/menu/settings/card/form examples, semantic wrappers, `asChild`, dark mode, density, RTL, responsive `className`, and composition with existing primitives.

## Acceptance criteria

- [ ] Registry metadata exists for Separator and includes accurate files, dependencies, registry dependencies, and CSS variable expectations.
- [ ] Storybook examples cover base horizontal separator, vertical separator, decorative separator, semantic separator, thickness matrix, tone matrix, spacing matrix, toolbar/menu/settings/card/form examples, semantic elements, `asChild`, Box/Container/Stack/Flex/Grid composition, dark mode, density, and RTL.
- [ ] Accessibility tests cover axe smoke, semantic `<hr>` defaults, non-`hr` role behavior, decorative `aria-hidden`, matching orientation, and no focusable behavior by default.
- [ ] Playground smoke coverage exercises Separator and Divider through the package export path.
- [ ] Registry smoke coverage verifies Separator metadata, no runtime dependencies, stable data attributes, tokenized classes, orientation semantics, and copied source files.
- [ ] Documentation or examples clearly direct users to Box, Container, Stack, Flex, Grid, Card, Menu, Toolbar, Splitter, Form, and Field instead of overloading Separator v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #64
