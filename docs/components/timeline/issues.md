# Timeline Issue Breakdown

Status: Draft local issue plan.

Package target: `@dethink/components`.

## Issue 1: Timeline Contract And Docs

HITL: Human review recommended.

- Finalize `docs/components/timeline/spec.md` and `prd.md`.
- Confirm API names, v1 read-only scope, DOM viewport choice, and out-of-scope editing features.
- Acceptance: docs describe public API, semantics, accessibility, styling, registry, and test seams.

## Issue 2: Data Model, Normalization, And Public Exports

HITL: AFK-friendly.

- Add Timeline types and pure utilities for typed item payloads, date normalization, order resolution, scale selection, zoom clamping, transform math, and keyboard navigation.
- Export Timeline symbols from `@dethink/components`.
- Acceptance: unit tests cover payload preservation, sorting, scale fallback, clamping, reset/fit math, and next/previous enabled selection.

## Issue 3: Semantic Timeline Rendering

HITL: AFK-friendly.

- Implement `Timeline` and `TimelineItem` with ordered-list semantics, headings, descriptions, images, dates, markers, statuses, layout variants, typed payload templates, and custom item rendering.
- Acceptance: rendered tests cover default content, payload-rendered content, statuses, dates, orientation, layout, custom markers, custom rendering, disabled state, and controlled/uncontrolled selection.

## Issue 4: Pannable And Zoomable Viewport

HITL: Human review recommended.

- Implement `TimelineViewport` and `TimelineControls` with transform-based pan/zoom, pointer drag, wheel zoom rules, fit/reset, selected item centering, and keyboard navigation.
- Acceptance: interaction tests cover pointer pan, icon control buttons, hover/focus control reveal, optional viewport chrome, keyboard navigation, wheel modifier behavior, reset, fit, and selection callbacks.

## Issue 5: Registry, Storybook, Accessibility, And Verification

HITL: AFK-friendly with visual review recommended.

- Add `registry/items/timeline.json`.
- Add Storybook stories for event, progress, image-rich, horizontal, vertical, alternating, dark mode, density, RTL, and responsive examples.
- Add a11y and SSR tests.
- Acceptance: `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm storybook:build`, `pnpm build`, and `pnpm registry:validate` pass.
