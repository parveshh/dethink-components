# Typography Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/26
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/27
- AFK source, exports, and behavior tests: https://github.com/parveshh/dethink-components/issues/28
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/29

## Branch Stack

1. `codex/prd-26-typography`
2. `codex/issue-27-typography-contract-docs`
3. `codex/issue-28-typography-source-tests`
4. `codex/issue-29-typography-registry-storybook`

The final implementation PR should target `codex/prd-26-typography` from the top issue branch after all Typography child issues are complete.

## Proposed Breakdown

1. **Title**: Typography contract and local planning docs (#27)
   **Type**: AFK
   **Blocked by**: #26
   **User stories covered**: 1-24

2. **Title**: Typography, Heading, and Text source with behavior tests (#28)
   **Type**: AFK
   **Blocked by**: #27
   **User stories covered**: 1-12, 16-20, 22-24

3. **Title**: Typography registry, Storybook, a11y, and verification (#29)
   **Type**: AFK
   **Blocked by**: #28
   **User stories covered**: 13-24

## Published Issue #27

## What to build

Create the local contract and planning documents for the Typography, Heading, and Text component family from the published PRD. The docs should define the public API, semantic boundaries, variant model, token and theming expectations, accessibility invariants, testing seams, out-of-scope decisions, and the stacked issue mapping for implementation.

This slice should not implement runtime component source beyond any documentation examples needed to clarify the contract.

## Acceptance criteria

- [ ] The local specification captures Typography, Heading, and Text responsibilities separately.
- [ ] The local PRD mirrors the published GitHub PRD decisions and links back to the parent PRD issue.
- [ ] The local issue breakdown maps this PRD to the approved stacked child issues.
- [ ] The docs define Heading semantic level versus visual level behavior clearly.
- [ ] The docs define Text and Typography variant, tone, weight, alignment, truncation, and line-clamp expectations.
- [ ] The docs explicitly keep Code, Kbd, Markdown/prose rendering, rich text, and automatic heading-outline context out of v1.
- [ ] The docs list render, accessibility, SSR, Storybook, registry, and playground smoke testing seams.

## Blocked by

- #26

## Published Issue #28

## What to build

Build the Typography, Heading, and Text component source from the approved contract. The slice should deliver the public exports, exported prop and variant types, shared class maps, semantic heading rendering, text rendering, className composition, ref forwarding, stable data attributes, and behavior tests for the component family.

The completed slice should make the components usable from the package source and verify their public DOM behavior without depending on Storybook or registry metadata yet.

## Acceptance criteria

- [ ] Typography, Heading, and Text components are implemented as dependency-light React primitives.
- [ ] Heading renders native h1 through h6 elements from semantic level and supports independent visual scale.
- [ ] Text supports common text elements, sizes, tones, weights, alignment, truncation, and line clamp.
- [ ] Typography exposes the low-level tokenized primitive behavior documented in the contract.
- [ ] Components use Tailwind CSS v4 utilities, semantic tokens, explicit variant maps, shared class merging, and stable data attributes.
- [ ] Public types are exported from the package entry point.
- [ ] Render tests cover semantic output, variants, tones, weights, alignment, truncation, line clamp, className composition, custom attributes, and refs.
- [ ] SSR smoke tests cover server rendering and hydration without warnings.
- [ ] Existing component tests continue to pass for the touched package surface.

## Blocked by

- #27

## Published Issue #29

## What to build

Finish the Typography family as an installable and documented component surface. Add registry metadata, Storybook coverage, accessibility tests, playground smoke coverage, and final verification for Typography, Heading, and Text.

The completed slice should make the Typography registry item installable and give consumers examples for semantic headings, visual heading scale, text sizes, tones, truncation, dark mode, density, RTL, and dashboard composition.

## Acceptance criteria

- [ ] Registry metadata exists for the Typography family and includes accurate files, dependencies, and CSS variable expectations.
- [ ] Storybook examples cover heading scale, semantic versus visual level, text scale, tones, weights, truncation, line clamp, dashboard copy, dark mode, density, and RTL.
- [ ] Accessibility tests cover axe smoke, native heading semantics, absence of fake heading roles, and readable tone examples.
- [ ] Playground smoke coverage exercises package and registry-style Typography usage.
- [ ] Documentation or examples clearly direct users to future Code and Kbd components instead of overloading Typography v1.
- [ ] Verification commands pass for the implemented slice: typecheck, tests, a11y tests, package build, Storybook build, registry validation, and registry smoke where available.

## Blocked by

- #28
