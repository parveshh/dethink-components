# Container Component Spec

Status: Draft for implementation issue #39.

Tracker:

- PRD: https://github.com/parveshh/dethink-components/issues/38
- Contract/docs issue: https://github.com/parveshh/dethink-components/issues/39
- Source/tests issue: https://github.com/parveshh/dethink-components/issues/40
- Registry/Storybook issue: https://github.com/parveshh/dethink-components/issues/41

Package target: `@dethink/components`.

## Purpose

Container is the P0 responsive max-width wrapper for page and section content. It constrains content width, centers or aligns the wrapper on the inline axis, applies responsive horizontal gutters, and can opt into safe-area-aware gutters for viewport-adjacent layouts.

Container is intentionally narrower than Box:

- Use Box for generic semantic wrappers, local spacing, surfaces, borders, radius, display, and overflow.
- Use Container for page or section width constraints and viewport gutters.
- Use future Stack, Inline, Flex, Grid, and SimpleGrid for child arrangement.
- Use future Card for framed content anatomy.
- Use future SidebarShell or dashboard blocks for app chrome.

## Public API

```ts
export type ContainerElement =
  | "div"
  | "main"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type ContainerGutter = "none" | "sm" | "md" | "lg" | "xl";
export type ContainerAlign = "start" | "center" | "end";

export type ContainerProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: ContainerElement;
    asChild?: boolean;
    size?: ContainerSize;
    gutter?: ContainerGutter;
    fluid?: boolean;
    align?: ContainerAlign;
    safeArea?: boolean;
    children?: React.ReactNode;
  };
```

Defaults:

- `as="div"`
- `size="xl"`
- `gutter="md"`
- `fluid={false}`
- `align="center"`
- `safeArea={false}`

## Behavior

### Element Rendering

- Container renders a native `div` by default.
- `as` supports a controlled set of semantic page and section wrapper elements.
- Container does not add ARIA roles, labels, focus behavior, keyboard behavior, or interaction state by default.
- Consumers remain responsible for landmark labels when rendering repeated or ambiguous landmarks such as multiple `nav`, `aside`, or `section` elements.

### asChild

- `asChild` applies Container props and classes to one compatible child element with no extra wrapper.
- `asChild` should forward refs to the child.
- Container and child classes should merge predictably.
- Duplicate event handlers should compose consistently with Box behavior.
- Child props should remain the source of element-specific semantics such as `href`, `type`, `aria-label`, and router props.

### Width

Container always uses `box-border`, `w-full`, and `min-w-0`.

Size map:

- `sm`: small readable content width.
- `md`: medium form or prose width.
- `lg`: common content section width.
- `xl`: default product page width.
- `2xl`: wide dashboard page width.
- `full`: no max-width constraint.

Implementation should use static Tailwind max-width classes. `fluid={true}` removes the max-width constraint regardless of `size` and sets `data-fluid="true"`.

Container must not set fixed heights. It should let content determine block size.

### Gutters

`gutter` controls responsive inline padding:

- `none`: no inline padding.
- `sm`: compact inline padding.
- `md`: default inline padding.
- `lg`: spacious inline padding.
- `xl`: large page padding.

Implementation should use explicit static Tailwind classes. A CSS variable such as `--container-gutter` may be used inside static arbitrary value classes when that keeps safe-area behavior portable.

Gutters should be symmetric and writing-direction-safe for LTR and RTL content.

### Safe Area

`safeArea={true}` should preserve at least the selected gutter while also respecting device safe-area insets. It is intended for viewport-adjacent application shells and full-width page bands.

The safe-area implementation must be static and registry-compatible. It should not require runtime measurement or browser-specific JavaScript.

### Alignment

`align` controls inline-axis placement when the Container is narrower than its parent:

- `start`: align to inline start.
- `center`: center with inline auto margins.
- `end`: align to inline end.

The default is `center`.

### Data Attributes

Container should expose stable data attributes:

- `data-slot="container"`
- `data-as-child="true"` when composed.
- `data-element` for native rendering.
- `data-size`
- `data-gutter`
- `data-fluid`
- `data-align`
- `data-safe-area`

These attributes are for tests, examples, and downstream styling hooks. They should not encode private implementation details.

## Styling

- Use Tailwind CSS v4 utilities and explicit variant maps.
- Use `cn` for class merging.
- Avoid runtime-generated class names that Tailwind cannot detect.
- Avoid CSS-in-JS, Emotion, styled-components, style-system runtimes, `sx`, and arbitrary CSS prop parsing.
- `className` remains the escape hatch for app-specific one-off layout.
- Container should not define color, surface, border, radius, shadow, typography, or display abstractions. Those belong to Box, Typography, Card, and future layout primitives.

## Accessibility

Container is a layout primitive. Its accessibility contract is mostly about not adding incorrect semantics:

- No fake roles by default.
- No tab stops by default.
- No keyboard behavior by default.
- No automatic landmark labels.
- Landmark semantics are opt-in through `as`.
- Repeated landmarks must be labelled by consumers.
- `asChild` must not remove accessible names or child semantics.

## Storybook Coverage

Stories should cover:

- Base centered layout.
- Size matrix.
- Gutter modes.
- No-gutter mode.
- Fluid mode.
- Safe-area mode.
- Full-width band with an inner Container.
- Semantic elements.
- `asChild` composition.
- Box composition.
- Dark mode.
- Density.
- RTL.

## Tests

Unit/render tests:

- Default native element.
- Supported `as` elements.
- `asChild` composition.
- Ref forwarding.
- `className` merging.
- Custom attributes.
- Size class maps.
- Gutter class maps.
- Fluid mode.
- Alignment mode.
- Safe-area mode.
- Stable data attributes.
- Invalid token values rejected by TypeScript where practical.

Accessibility tests:

- Axe smoke.
- Landmark semantics only when chosen by the consumer.
- No fake roles or focusable behavior by default.
- `asChild` preserves child semantics.

SSR tests:

- Server render smoke.
- Hydration smoke without warnings.

Registry/playground tests:

- Registry metadata validates.
- Registry smoke verifies files, dependency-free behavior, stable slot data, and tokenized class maps.
- Playground imports and renders Container from `@dethink/components`.

## Out Of Scope

- Box spacing, surface, border, radius, display, and overflow shortcuts.
- Stack, Inline, Flex, Grid, or SimpleGrid child arrangement APIs.
- Card anatomy or elevation.
- Page shell, sidebar, topbar, breadcrumbs, navigation menu, or dashboard chrome.
- Scroll containers, sticky headers, split panes, or viewport-height app shells.
- Container query API in v1.
- Arbitrary style props, `sx`, CSS-in-JS, responsive object props, or runtime class generation.
- Automatic ARIA roles, labels, focus management, keyboard behavior, command actions, links, or buttons.

## Research Notes

- Source PRD: Container is a P0 layout component for responsive max-width wrappers with sizes, centering, gutters, fluid option, no fixed heights, and safe-area awareness.
- Modern Web Guidance: prefer logical layout, intrinsic sizing, and viewport mechanics that avoid `100vw` overflow traps; safe-area behavior should be intentional and static.
- Material UI Container: current docs show common precedent for centered responsive wrappers with `maxWidth`, fluid behavior, and optional fixed behavior. Dethink keeps the same core layout responsibility but uses static Tailwind maps and registry-owned source.
