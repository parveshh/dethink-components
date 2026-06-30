# IconButton Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/6

Package target: `@dethink/components`.

## Problem Statement

React teams building SaaS dashboards, internal tools, and dense application chrome need icon-only action buttons that are visually consistent with Button while preserving native button semantics and accessible names. Button already supports text actions and an `icon` size, but the library still needs a dedicated IconButton primitive so teams do not ship unlabeled icon controls, inconsistent square sizing, or ad hoc toolbar affordances.

## Solution

Ship a P0 IconButton component for icon-only actions. It renders a native `button`, requires either `aria-label` or `aria-labelledby` at the TypeScript API boundary, reuses Button's visual language and token-backed variants, supports loading and disabled states, and ships through the package and shadcn-compatible registry with docs, Storybook examples, accessibility coverage, SSR smoke tests, and registry validation.

## User Stories

1. As a frontend engineer, I want an IconButton component, so that icon-only actions do not require custom one-off styling.
2. As a frontend engineer, I want IconButton to render a native button by default, so that keyboard and form behavior remain predictable.
3. As a frontend engineer, I want IconButton to default to `type="button"`, so that toolbar actions do not accidentally submit forms.
4. As a frontend engineer, I want TypeScript to require an accessible name, so that unlabeled icon-only buttons are caught during development.
5. As a screen reader user, I want icon-only controls to expose a useful name, so that I can understand each action.
6. As a keyboard user, I want visible focus states, so that I can see which icon action is focused.
7. As a dashboard user, I want consistent square icon controls, so that dense toolbars and table row actions are easy to scan.
8. As a design-system lead, I want IconButton variants to align with Button variants, so that action hierarchy remains consistent.
9. As a design-system lead, I want a circular shape option, so that topbar and floating utility actions can use a softer affordance without custom CSS.
10. As a form builder, I want explicit submit support when needed, so that icon-only form actions can still participate in forms intentionally.
11. As a user triggering async actions, I want loading IconButtons to prevent duplicate activation, so that repeat actions are avoided.
12. As a maintainer, I want IconButton to avoid tooltip coupling, so that Tooltip can remain a separate future component.
13. As a maintainer, I want IconButton to avoid `asChild` and navigation semantics in v1, so that Link can define navigation guidance later.
14. As a QA engineer, I want tests for disabled, loading, pressed, and accessible-name behavior, so that regressions are caught.
15. As an accessibility reviewer, I want axe coverage and keyboard acceptance criteria, so that IconButton is not just visually correct.
16. As a registry consumer, I want accurate metadata, so that installing IconButton pulls only the files and dependencies it needs.
17. As an AI coding tool user, I want predictable examples, so that generated code supplies labels and avoids decorative-name mistakes.

## Implementation Decisions

- IconButton is the next normal P0 component after Button in the component order.
- IconButton is an action primitive for icon-only actions, not navigation.
- Icon-only navigation waits for Link guidance.
- IconButton renders a native `button` and defaults `type` to `button`.
- IconButton requires either `aria-label` or `aria-labelledby` at the public TypeScript API boundary.
- IconButton supports `variant`, `size`, `shape`, `loading`, `children`, `className`, native button props, and forwarded refs.
- IconButton variant values reuse Button's variant model except `link`.
- IconButton sizes are `xs`, `sm`, `md`, `lg`, and `xl` with square dimensions.
- IconButton shapes are `square` and `circle`.
- Defaults are `variant="ghost"`, `size="md"`, `shape="square"`, and `loading={false}`.
- Toggle use is supported by passing native or ARIA props such as `aria-pressed`; no separate toggle-state API ships in v1.
- Loading state exposes busy state, renders a spinner, and prevents activation.
- Child icons are treated as decorative visual content. The accessible name comes from `aria-label` or `aria-labelledby`.
- Styling uses Tailwind CSS v4 utilities, semantic tokens, explicit class maps, shared class merging, data attributes, and no hard-coded brand colors beyond existing token use.
- Tooltip integration is a future recipe after Tooltip exists; no tooltip prop is included in v1.

## Testing Decisions

- Test public behavior and DOM semantics, not private implementation details.
- Reuse Button's existing testing seams: rendered component tests, axe tests, SSR smoke tests, Storybook examples, build checks, and registry validation.
- Render tests cover native button defaults, default type, accessible names, variants, sizes, shape, disabled, loading, click prevention, submit type, `aria-pressed`, class composition, and ref forwarding.
- Accessibility tests cover axe smoke, `aria-label`, `aria-labelledby`, decorative icon behavior, disabled/loading semantics, and focus-visible styling presence.
- SSR tests cover server rendering and hydration without browser-only render access.
- Storybook covers variants, sizes, shapes, loading, disabled, destructive, toggle toolbar, density, dark mode, RTL, and dashboard toolbar examples.

## Out Of Scope

- Link or icon-only navigation semantics.
- `asChild` composition.
- Tooltip integration.
- ButtonGroup implementation.
- ToggleButton state management APIs.
- Analytics, permissions, or async orchestration beyond loading duplicate-prevention.

## Further Notes

- Research basis: React Aria ToggleButton guidance, WAI-ARIA Button Pattern, MUI IconButton, Chakra IconButton, and the existing Button contract.
- The key accessibility invariant is that icon-only buttons must have a reliable accessible name.
