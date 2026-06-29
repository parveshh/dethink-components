# Button Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`. Implementation should use the base scaffold in `packages/components`, `apps/storybook`, `apps/playground-vite`, and `registry/items`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/1
- HITL contract issue: https://github.com/parveshh/dethink-components/issues/2
- AFK baseline Button issue: https://github.com/parveshh/dethink-components/issues/3
- AFK state/form safety issue: https://github.com/parveshh/dethink-components/issues/4
- AFK composition/guidance issue: https://github.com/parveshh/dethink-components/issues/5

## Proposed Breakdown

1. **Title**: Confirm Button visual and API contract (#2)
   **Type**: HITL
   **Blocked by**: None
   **User stories covered**: 3, 4, 5, 6, 7, 13, 14

2. **Title**: Ship installable baseline Button (#3)
   **Type**: AFK
   **Blocked by**: #2
   **User stories covered**: 1, 2, 3, 4, 10, 11, 13, 17

3. **Title**: Add Button state behavior and form safety (#4)
   **Type**: AFK
   **Blocked by**: #3
   **User stories covered**: 7, 8, 9, 10, 11, 12, 16, 18

4. **Title**: Add Button composition, icon affordances, and guidance (#5)
   **Type**: AFK
   **Blocked by**: #3
   **User stories covered**: 5, 6, 14, 19, 20

## Published Issue #2

Local contract draft: `docs/components/button/contract.md`.

Visual reference mockup: `docs/components/button/mockups/button-contract-reference.png`.

## What to build

Confirm the Button visual and API contract before implementation proceeds. The decision should settle supported variants, sizes, Tailwind utility and token usage, default type behavior, icon affordances, as-child composition, and the boundary between Button, Link, IconButton, and ButtonGroup.

## Acceptance criteria

- [ ] Variants and sizes are approved or revised.
- [ ] Tailwind CSS variant maps, class merge behavior, and token dependencies are approved.
- [ ] Default `type` behavior is approved.
- [ ] Token dependencies for color, radius, spacing, focus, motion, and density are confirmed.
- [ ] `packages/components`, `apps/storybook`, `apps/playground-vite`, and `registry/items` integration points are confirmed.
- [ ] Button versus Link versus IconButton guidance is approved.
- [ ] Any unresolved design/API decisions are recorded before AFK implementation starts.

## Blocked by

None - can start immediately.

## Published Issue #3

## What to build

Ship the smallest installable Button slice end to end: tokenized Tailwind variants and sizes, native button rendering, TypeScript props, package export, registry metadata, basic docs, stories, and tests for baseline rendering and keyboard activation.

## Acceptance criteria

- [ ] Button renders a native button by default.
- [ ] Required variants and sizes render from tokenized styling.
- [ ] Styling uses explicit Tailwind class maps and a shared class merge helper.
- [ ] Runtime-generated class names that Tailwind cannot statically detect are avoided.
- [ ] Public prop types are exported.
- [ ] Registry metadata installs Button without unrelated advanced dependencies.
- [ ] Docs include overview, installation, variants, sizes, and basic usage.
- [ ] Storybook includes baseline variant and size stories.
- [ ] Vite playground verifies Button package import and stylesheet import.
- [ ] Tests cover rendering, click activation, keyboard activation, and basic accessibility checks.
- [ ] `pnpm typecheck`, `pnpm build`, `pnpm test`, `pnpm test:a11y`, `pnpm storybook:build`, and `pnpm registry:validate` pass.

## Blocked by

- #2

## Published Issue #4

Local implementation status: issue #4 state and form-safety slice is implemented in `packages/components/src/components/button/button.tsx`, `apps/storybook/src/Button.stories.tsx`, and `docs/components/button/README.md`.

## What to build

Add Button state behavior and form safety end to end: disabled, loading, focus-visible, destructive, explicit form type guidance, duplicate-submit prevention, Tailwind state selectors, docs examples, visual states, and behavior tests.

## Acceptance criteria

- [ ] Disabled Button cannot be activated.
- [ ] Loading Button communicates busy state and prevents duplicate activation.
- [ ] Button defaults to non-submit behavior unless submit/reset is explicit.
- [ ] Focus-visible styling is tokenized and visible.
- [ ] State styling uses stable data/ARIA selectors and token-backed Tailwind utilities.
- [ ] Destructive variant is documented as a visual emphasis that still requires clear surrounding copy.
- [ ] Docs include submit, reset, disabled, loading, destructive, and focus guidance.
- [ ] Tests cover disabled prevention, loading prevention, explicit form type behavior, and focus-visible expectations.
- [ ] Visual stories cover loading, disabled, focus-visible, destructive, dark mode, and density.
- [ ] Token override stories verify Button responds to semantic color, radius, focus ring, and density changes.

## Blocked by

- #3

## Published Issue #5

Local implementation status: issue #5 composition and guidance slice is implemented in `packages/components/src/components/button/button.tsx`, `apps/storybook/src/Button.stories.tsx`, `docs/components/button/README.md`, and registry smoke tooling.

## What to build

Add Button composition and guidance end to end: left and right icon support, as-child composition, Button versus Link and IconButton documentation, SSR smoke coverage, registry smoke verification, Tailwind theming guidance, and contribution-ready Definition of Done.

## Acceptance criteria

- [ ] Left and right icon affordances align consistently across sizes and writing directions.
- [ ] `asChild` composition works for compatible child elements and documents disabled/loading limitations.
- [ ] Docs explain when to use Button, Link, IconButton, and ButtonGroup.
- [ ] SSR smoke coverage verifies no hydration warnings.
- [ ] Registry install smoke test verifies Button in a clean consumer app.
- [ ] Registry smoke coverage verifies Tailwind base setup, CSS variables, and component classes are sufficient after installation.
- [ ] Docs include known limitations and testing guidance.
- [ ] Definition of Done is documented for future Button changes.

## Blocked by

- #3
