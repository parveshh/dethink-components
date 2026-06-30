# Box Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/33

Package target: `@dethink/components`.

## Problem Statement

Teams building production SaaS dashboards, internal tools, admin systems, and AI-native React interfaces need a small, dependable layout wrapper before the broader layout family expands. Without a Box primitive, teams either write ad hoc wrapper elements with inconsistent spacing, surface, border, and radius classes, or they reach for heavier layout components before those components exist. That makes examples harder to scan, registry-installed code less consistent, and downstream components more likely to duplicate wrapper styling.

The library already has Button, IconButton, Link, Typography, Heading, and Text. The next normal P0 development slice is Box: the foundational layout wrapper that can support future Container, Stack, Flex, Grid, Card, Field, Alert, and dashboard examples without introducing a full runtime styling system.

## Solution

Ship a P0 Box component as a semantic, token-backed layout primitive. Box renders a neutral element by default, supports semantic element selection through `as`, supports wrapper-free composition through `asChild`, and exposes constrained token maps for spacing and simple surface styling. It remains dependency-free, SSR-safe, and Tailwind-first.

Box v1 provides predictable shortcuts for common wrapper needs: padding, margin, gap, background/surface, border, radius, display, width behavior, and overflow behavior. The prop surface is intentionally smaller than Chakra UI's all-CSS-props model or MUI System's `sx` model because Dethink Components uses registry-installed source code, Tailwind CSS v4 utility maps, and explicit static classes as the styling contract. Consumers can still use `className` for custom layout that belongs outside the constrained Box API.

## User Stories

1. As a frontend engineer, I want a Box primitive, so that simple wrappers use a consistent design-system component instead of one-off div classes.
2. As a frontend engineer, I want Box to render a native `div` by default, so that it stays semantically neutral when no stronger element is needed.
3. As a frontend engineer, I want Box to support semantic elements through an `as` prop, so that I can render `section`, `article`, `main`, `aside`, `nav`, `header`, `footer`, list elements, or inline wrappers without losing Box styling.
4. As a frontend engineer, I want Box to support `asChild`, so that I can apply Box styling to a compatible child without adding unnecessary DOM.
5. As a design-system lead, I want Box spacing to use explicit token maps, so that padding, margin, and gap stay aligned with the Tailwind token scale.
6. As a design-system lead, I want Box surface shortcuts to use semantic tokens, so that wrapper backgrounds work across light, dark, and future brand themes.
7. As a dashboard engineer, I want Box border and radius shortcuts, so that common panels and sections can be framed without custom class strings.
8. As a dashboard engineer, I want Box to expose logical inline and block spacing options, so that RTL layouts do not require physical left/right overrides.
9. As a dashboard engineer, I want Box to support simple display values, so that wrappers can be block, inline, inline-block, contents, flex, or grid when needed.
10. As a dashboard engineer, I want Box to support gap tokens, so that basic flex/grid wrappers can space children before Stack, Flex, and Grid are implemented.
11. As a component author, I want Box to provide stable data attributes, so that tests and theme overrides can target wrapper state predictably.
12. As a component author, I want Box to forward refs, so that parent components can measure, focus, or anchor simple wrapper elements when appropriate.
13. As a registry consumer, I want Box to install without runtime styling dependencies, so that adding a layout primitive does not pull in a style-system runtime.
14. As a package consumer, I want exported Box prop and token types, so that component APIs are discoverable and reusable.
15. As an SSR app developer, I want Box to render and hydrate without warnings, so that it is safe in Next.js-style environments.
16. As an accessibility reviewer, I want Box to avoid fake semantics, so that it does not add ARIA roles or interaction behavior by default.
17. As an accessibility reviewer, I want semantic responsibility to stay with the consumer's chosen element, so that Box does not turn visual wrappers into landmarks, buttons, links, or headings automatically.
18. As a docs author, I want examples that show when to use Box and when to use future Container, Stack, Flex, Grid, Card, or Separator components, so that consumers do not overuse Box.
19. As an AI coding tool user, I want predictable examples, so that generated component code uses Box for simple wrappers but still chooses semantic elements when content structure matters.
20. As a maintainer, I want Box to avoid arbitrary CSS props in v1, so that Tailwind can statically detect classes and the registry source stays easy to audit.
21. As a maintainer, I want Box to avoid responsive object props in v1, so that responsive layout APIs can be designed deliberately in Container, Stack, Flex, Grid, and SimpleGrid.
22. As a maintainer, I want Box to avoid elevated card behavior, so that Card can define content container anatomy separately.
23. As a maintainer, I want Box to be dependency-free, so that it remains safe as a foundational primitive for many future components.
24. As a QA engineer, I want tests for semantic rendering, class maps, `asChild`, refs, SSR, and a11y smoke, so that Box does not regress as layout components expand.

## Implementation Decisions

- Box is the next normal P0 development slice after Typography, Heading, and Text.
- Box is a foundational layout wrapper, not a complete layout system.
- Box renders a native neutral element by default.
- Box supports an `as` prop for a controlled set of semantic block, inline, and list elements.
- Box supports `asChild` for wrapper-free composition with one compatible child element.
- Box supports constrained spacing props for padding, margin, and gap using explicit token maps.
- Box supports logical spacing props for inline, block, start, and end directions instead of physical left/right-only APIs.
- Box supports simple surface styling through token-backed background, border, and radius maps.
- Box supports simple display and overflow maps where they reduce common wrapper boilerplate.
- Box uses Tailwind CSS v4 utilities, semantic tokens, explicit static class maps, shared class merging, and stable data attributes.
- Box remains dependency-free and does not introduce a runtime style-system, CSS-in-JS, `sx` prop, arbitrary CSS prop parser, or responsive object prop parser.
- Box does not add default ARIA roles, keyboard behavior, focus management, or interactive semantics.
- Box should compose predictably with Typography, Button, Link, IconButton, Timeline, DateTimePicker, and future layout components.
- Box should leave page-width rules to Container, vertical/horizontal composition to Stack/Inline/Flex, grid templates to Grid/SimpleGrid, visual content containers to Card, and decorative or semantic separation to Separator/Divider.

## Testing Decisions

- Tests should assert public DOM behavior and class/data attributes rather than private class-map implementation details.
- Render tests should cover default element rendering, supported `as` elements, `asChild` composition, className composition, refs, spacing props, logical spacing props, gap, surface, border, radius, display, overflow, custom attributes, and children.
- Type-level tests should verify unsupported arbitrary style props and invalid token values are rejected where practical.
- Accessibility tests should cover axe smoke, semantic element preservation, no fake roles by default, and examples with landmarks only when consumers intentionally choose landmark elements.
- SSR tests should cover server rendering and hydration without warnings.
- Storybook should cover base wrapper, semantic elements, spacing matrix, surfaces, border/radius, logical RTL spacing, `asChild`, dashboard section examples, dark mode, density, and responsive composition with normal Tailwind `className` escape hatches.
- Registry validation and smoke coverage should prove Box installs cleanly, has no runtime dependencies, and works through both package and registry consumption paths.
- Existing Typography, Link, Button, and IconButton tests are prior art for class maps, data attributes, `asChild` composition, SSR smoke, a11y smoke, Storybook coverage, registry validation, and registry smoke.

## Out Of Scope

- A full Chakra-style all-CSS-props API.
- A MUI-style `sx` prop or runtime style parser.
- CSS-in-JS, styled-components, Emotion, or a style-system runtime.
- Responsive object/array props.
- Container max-width behavior.
- Stack, Inline, Flex, Grid, or SimpleGrid layout abstractions.
- Card anatomy, elevation, header/content/footer slots, or interactive-card behavior.
- Separator or Divider semantics.
- Aspect ratio, scroll area, splitter, sidebar shell, or app shell behavior.
- Focus management, keyboard behavior, command actions, navigation, links, buttons, or form labels.
- Automatic ARIA roles or landmark labels.
- Arbitrary inline style generation beyond normal React `style` support inherited from HTML attributes.

## Further Notes

- Source product PRD: Box is a P0 layout component described as a base layout wrapper with token-aware style props or class recipes, `as` support, spacing/surface shortcuts, and no unnecessary DOM when composed.
- Research basis: Chakra UI treats Box as an abstract styling component with token-aware style props; MUI Box is a generic theme-aware container with `sx`; Tailwind CSS provides logical spacing and radius utilities; Modern Web Guidance emphasizes logical properties, token-driven layout, intrinsic sizing, and avoiding visual-only DOM reordering.
- Dethink's v1 decision is intentionally narrower than Chakra or MUI because this project distributes open Tailwind source through a registry and needs static class detection, small dependency surfaces, and inspectable code.
