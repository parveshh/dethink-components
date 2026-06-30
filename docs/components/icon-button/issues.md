# IconButton Issue Breakdown

Status: Published to GitHub issue tracker.

Parent PRD: https://github.com/parveshh/dethink-components/issues/6

Package target: `@dethink/components`.

## Issue 1: IconButton Contract And Local Planning Docs

Tracker issue: https://github.com/parveshh/dethink-components/issues/7

HITL: AFK-friendly.

- Create IconButton local planning artifacts that mirror the GitHub PRD.
- Lock the public API, defaults, accessible-name requirement, visual variants, sizes, shapes, and v1 exclusions.
- Acceptance: spec, PRD, and issue breakdown exist locally and document implementation, accessibility, theming, registry, Storybook, SSR, and verification seams.

## Issue 2: IconButton Source, Exports, And Behavior Tests

Tracker issue: https://github.com/parveshh/dethink-components/issues/8

HITL: AFK-friendly.

- Implement IconButton as a native button with token-backed styling, TypeScript accessible-name enforcement, loading duplicate-prevention, disabled behavior, square and circular shapes, and public exports.
- Add render tests for native defaults, accessible names, variants, sizes, shape, loading, disabled, click prevention, submit type, `aria-pressed`, class composition, and ref forwarding.
- Acceptance: component source and package exports exist, behavior tests pass, and implementation follows Tailwind/static-class conventions.

## Issue 3: IconButton Registry, Storybook, A11y, SSR, And Verification

Tracker issue: https://github.com/parveshh/dethink-components/issues/9

HITL: AFK-friendly with visual review recommended.

- Add registry metadata, Storybook stories, a11y tests, SSR tests, registry smoke coverage, and final verification.
- Acceptance: registry validates, stories cover meaningful states, a11y/SSR tests pass, registry smoke covers IconButton, and required verification commands pass.
