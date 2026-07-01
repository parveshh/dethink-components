# Stack Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/43

Source: `react_component_library_prd.docx` layout component inventory, `docs/development-path.md`, `docs/high-impact-component-priority.md`, current Box implementation conventions, published Container PRD, current Tailwind CSS documentation, and Modern Web Guidance `css-layout`.

Package target: `@dethink/components`.

## Purpose

Stack is the next high-impact P0 layout primitive after Container planning. It provides a small, dependency-free one-dimensional composition primitive for arranging children in a vertical or horizontal flow with token-backed gaps and alignment.

Stack should make common product layouts easier to scan: form groups, toolbar rows, button clusters, card sections, settings panels, empty-state bodies, and dashboard summary groups. It is intentionally narrower than a full Flex component. Stack owns direction, gap, alignment, justification, wrapping, semantic rendering, and wrapper-free composition. Future Flex and Grid components own lower-level layout control, item sizing, two-dimensional tracks, and advanced responsive layout contracts.

## Priority

P0, high-impact layout primitive.

## Dependencies

- Foundation tokens for spacing, density, direction, and theme context.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Button, IconButton, Link, Typography, Box, Timeline, DateTimePicker, and planned Container conventions for `asChild`, ref composition, stable `data-*` selectors, Storybook coverage, SSR tests, a11y tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced.

## Public API

```ts
type StackElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "nav"
  | "header"
  | "footer"
  | "ul"
  | "ol"
  | "li"
  | "form"
  | "fieldset"
  | "span";

type StackDirection = "vertical" | "horizontal";
type StackGap = "none" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
type StackAlign = "stretch" | "start" | "center" | "end" | "baseline";
type StackJustify = "start" | "center" | "end" | "between";
type StackWrap = "nowrap" | "wrap";

type StackProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: StackElement;
    asChild?: boolean;
    direction?: StackDirection;
    gap?: StackGap;
    align?: StackAlign;
    justify?: StackJustify;
    wrap?: StackWrap;
  };
```

Defaults:

- `as="div"`
- `asChild={false}`
- `direction="vertical"`
- `gap="4"`
- `align="stretch"`
- `justify="start"`
- `wrap="nowrap"`

## Behavior

- Native mode renders the chosen `as` element.
- `asChild` mode accepts exactly one valid React element and applies Stack classes, data attributes, event props, and composed refs to the child without adding a wrapper.
- Stack establishes a flex formatting context.
- `direction="vertical"` maps to a column flow.
- `direction="horizontal"` maps to a row flow.
- Stack uses `gap` for child spacing rather than child margins.
- Stack should not visually reverse children or expose an item ordering API in v1. DOM order must remain the source of reading and keyboard order.
- `wrap="wrap"` allows horizontal stacks to wrap when content cannot fit. Vertical wrapping is allowed only if it maps cleanly to native flex behavior and is documented as an advanced layout escape hatch.
- `align` controls cross-axis alignment for all children.
- `justify` controls main-axis distribution for all children.
- Stack does not add ARIA roles, focus behavior, keyboard behavior, click behavior, labels, form semantics, or list semantics beyond the selected native element.
- `className` composes after default classes so consumers can extend or override when needed.

## Token Maps

Gap:

- `none`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `8`
- `10`
- `12`

Direction:

- `vertical`
- `horizontal`

Align:

- `stretch`
- `start`
- `center`
- `end`
- `baseline`

Justify:

- `start`
- `center`
- `end`
- `between`

Wrap:

- `nowrap`
- `wrap`

## Accessibility

- Stack is semantically neutral by default.
- Consumers must choose meaningful semantic elements with `as` when content structure requires it.
- Stack must preserve DOM order as reading order and tab order.
- Stack must not expose reverse direction or item order props in v1 because those can desynchronize visual order from keyboard order.
- `as="ul"` and `as="ol"` preserve list semantics. Examples should keep direct list item semantics where possible.
- `as="form"` and `as="fieldset"` should be documented as layout wrappers only; validation, labeling, errors, and form orchestration belong to future Form and Field primitives.
- `as="nav"` and other landmarks require consumer-provided accessible names when multiple landmarks of the same type are present.

## Theming

- Use token-backed Tailwind utilities only; no hard-coded brand colors.
- Use explicit class maps so Tailwind can statically detect classes.
- Support light, dark, density, RTL, and token override contexts through existing provider and utility conventions.
- Prefer logical layout concepts and gap-based spacing. Do not rely on physical left/right margins for child spacing.
- Keep Stack source portable for registry installation.

## Registry Requirements

- Add a `stack` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Stack for simple one-dimensional composition, Box for generic wrappers, Container for page width, Flex for advanced flex control, Grid for two-dimensional layout.
- Installation through registry and package import.
- Anatomy and stable data attributes.
- `as` and `asChild` examples.
- Vertical stack examples for settings sections, form groups, card content, and empty states.
- Horizontal stack examples for toolbar rows, button clusters, metadata rows, and inline status groups.
- Gap, alignment, justification, wrapping, list semantics, form wrapper caveats, RTL, density, dark mode, and responsive composition examples.
- Accessibility, theming, SSR, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

- Render tests for default element output, supported `as` elements, `asChild`, direction maps, gap maps, alignment maps, justification maps, wrap behavior, custom attributes, class merging, children, and ref forwarding.
- Type-level tests for invalid token values and unsupported element values where practical.
- Accessibility tests with axe smoke, semantic element preservation, no fake roles by default, DOM-order preservation expectations, list examples, and landmark examples only when consumers intentionally choose landmark elements.
- SSR render and hydration tests.
- Storybook coverage for default vertical stack, horizontal toolbar, gap matrix, alignment matrix, justification examples, wrapping row, list semantics, form group layout, Box/Container composition, dashboard examples, dark mode, density, RTL, responsive `className` composition, and `asChild`.
- Registry validation and registry smoke.

## Out Of Scope

- Full Flex API.
- Flex item APIs such as grow, shrink, basis, order, self alignment, or spacer behavior.
- Reverse direction or visual reordering.
- Grid, SimpleGrid, subgrid, masonry, or two-dimensional layout.
- Container max-width or page gutter behavior.
- Box surface, border, radius, padding, margin, display, or overflow shortcuts.
- Separator or Divider insertion.
- Form state, validation, labels, help text, errors, or fieldset orchestration.
- Responsive object or array props.
- CSS-in-JS, `sx`, runtime style parsing, or dynamic class generation.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, navigation, or interactive behavior.

## Definition Of Done

- Public types and component export exist.
- Styling uses token-backed Tailwind utility maps and stable `data-*` selectors.
- Docs, Storybook, tests, SSR, a11y, registry metadata, playground smoke, and registry smoke are updated.
- Verification passes: `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke where available.
