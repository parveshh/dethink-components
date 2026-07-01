# Link Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/11

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, and AI-native React interfaces need a first-class Link component that is clearly distinct from Button and IconButton. Without a dedicated navigation primitive, teams are likely to style anchors ad hoc, use buttons for navigation, ship inconsistent focus/current states, or miss external-link security defaults. The library already has Button for actions; Link establishes the matching contract for navigation.

## Solution

Ship a P0 Link component for real hyperlinks and router links. It renders a native anchor by default, supports router integration through `asChild`, uses token-backed Tailwind styling aligned with the existing component system, exposes stable data attributes for state and slot styling, preserves accessible link semantics, supports current navigation state through `aria-current`, and automatically merges `rel="noopener"` for `target="_blank"` links while preserving user-provided `rel` values.

## User Stories

1. As a frontend engineer, I want a Link component, so that navigation uses a consistent design-system primitive instead of one-off anchor styling.
2. As a frontend engineer, I want Link to render a native anchor by default, so that browser navigation, context menus, copy link, open in new tab, and keyboard behavior remain intact.
3. As a frontend engineer, I want native Link mode to require an `href`, so that anchors without destinations are not accidentally shipped as fake controls.
4. As a dashboard engineer, I want Link variants for default, muted, navigation, and destructive contexts, so that links fit dense application UI without custom classes.
5. As a dashboard engineer, I want underline behavior to be configurable, so that inline prose links and navigation links can use appropriate affordances.
6. As a router user, I want `asChild` composition, so that Next.js, React Router, or custom router links can receive the same styling without losing routing behavior.
7. As a router user, I want Link to preserve child semantics in `asChild` mode, so that the router component owns navigation and prefetch behavior.
8. As a keyboard user, I want Link to expose visible focus states, so that I can track focus while navigating through links.
9. As a screen reader user, I want Link to keep real link semantics, so that assistive technology announces it as a link rather than a button.
10. As a screen reader user, I want current navigation links to support `aria-current`, so that I can understand the active page or section.
11. As a design-system lead, I want Link styling to use semantic tokens, so that light mode, dark mode, density, and brand themes remain consistent.
12. As a design-system lead, I want stable data attributes, so that downstream teams can target Link states in tests and theme overrides.
13. As a security-conscious developer, I want new-tab links to include `noopener`, so that external targets cannot access the opener browsing context.
14. As a developer, I want Link to preserve user-provided `rel` values, so that `nofollow`, `noreferrer`, and other policies can still be expressed.
15. As a maintainer, I want Link to avoid disabled and loading states, so that action semantics stay with Button and IconButton.
16. As a maintainer, I want Link to avoid prefetch and route matching APIs, so that framework-specific behavior stays in router components.
17. As a docs author, I want examples for inline, navigation, current, external, and router links, so that consumers choose the right pattern.
18. As a QA engineer, I want tests for native and `asChild` behavior, so that Link does not regress across routing and anchor use cases.
19. As an accessibility reviewer, I want axe and keyboard-focused coverage, so that Link stays accessible in common variants and states.
20. As a registry consumer, I want accurate metadata, so that installing Link pulls only the files and dependencies it needs.
21. As an SSR app developer, I want Link to server-render and hydrate without warnings, so that it works in Next.js-style environments.
22. As an AI coding tool user, I want predictable Link examples, so that generated code does not use buttons for navigation or anchors for commands.

## Implementation Decisions

- Link is the next normal P0 component after Button and IconButton in the development path.
- Link is a navigation primitive for real hyperlinks and router links, not a command/action primitive.
- Link renders a native anchor by default.
- Native Link mode requires an `href` at the TypeScript API boundary.
- Link supports `asChild` for router components and custom links that own their own navigation behavior.
- Link supports `variant`, `underline`, `asChild`, `children`, native anchor props, `className`, and forwarded refs.
- Link variants are `default`, `muted`, `nav`, and `destructive`.
- Link underline modes are `hover`, `always`, and `none`.
- Defaults are `variant="default"`, `underline="hover"`, and `asChild={false}`.
- `aria-current` is the public current-state mechanism; Link derives a stable current-state data attribute when `aria-current` is present.
- `target="_blank"` automatically merges `noopener` into `rel` while preserving any user-provided `rel` tokens.
- Link uses Tailwind CSS v4 utilities, semantic tokens, explicit class maps, shared class merging, and stable data attributes.
- Link does not implement disabled, loading, pressed, or command behavior in v1.
- Link does not add framework-specific route matching, prefetch, external icon, tooltip, analytics, or visited-color APIs in v1.

## Testing Decisions

- Tests should target public behavior and DOM semantics rather than private implementation details.
- Render tests should cover native anchor output, required destination behavior, variants, underline modes, class composition, ref forwarding, `aria-current`, external rel merging, and router-style `asChild` composition.
- Accessibility tests should cover axe smoke, visible focus class presence, accessible link text examples, current-state semantics, and absence of fake-button behavior.
- SSR tests should cover server rendering and hydration without warnings.
- Storybook should cover inline text links, navigation/current links, external links, router composition, variants, underline modes, dashboard examples, dark mode, density, and RTL.
- Registry validation and smoke coverage should prove Link metadata is installable and dependency-light.
- Existing Button tests are the closest prior art for class maps, slots, state attributes, a11y smoke tests, SSR smoke tests, Storybook coverage, and registry validation.

## Out Of Scope

- Command actions or button-like behavior.
- Disabled links, loading links, pressed state, or submit/reset behavior.
- Icon-only navigation guidance beyond normal link text content.
- External icon API.
- Tooltip integration.
- Framework-specific prefetch controls.
- Built-in route matching.
- Analytics instrumentation.
- Visited-link color API.
- ButtonGroup, Breadcrumb, Pagination, NavigationMenu, or Sidebar implementation.

## Further Notes

- Research references: MDN anchor element guidance, WAI-ARIA Authoring Practices Link Pattern, MDN `aria-current`, React documentation via Context7, Modern Web Guidance accessibility guidance, Tailwind CSS documentation via Context7, and existing Button implementation conventions.
- The key semantic boundary is: use Link for navigation and Button/IconButton for actions.
- The key security default is: when opening a new tab, ensure `noopener` is present without deleting consumer-provided relationship tokens.
