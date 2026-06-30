# Box Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/33

Source: `react_component_library_prd.docx` layout component specification, plus approved Box PRD plan.

Package target: `@dethink/components`.

## Purpose

Box is the first P0 layout primitive for Dethink Components. It provides a semantic, token-backed wrapper for simple layout and surface needs before higher-level layout components such as Container, Stack, Flex, Grid, Card, Separator, AspectRatio, and ScrollArea are implemented.

Box is intentionally smaller than a full runtime style system. It should cover common wrapper needs with explicit Tailwind utility maps and leave custom layout to `className`.

## Priority

P0.

## Dependencies

- Foundation tokens for spacing, color, border, radius, density, and focus.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Button, Link, Typography, and IconButton conventions for `asChild`, ref composition, stable `data-*` selectors, Storybook coverage, SSR tests, a11y tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced.

## Public API

```ts
type BoxElement =
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
  | "span";

type BoxDisplay = "block" | "inline" | "inline-block" | "contents" | "flex" | "inline-flex" | "grid";
type BoxSpacing = "none" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
type BoxSurface = "transparent" | "background" | "muted" | "primary" | "destructive" | "success" | "warning" | "info";
type BoxBorder = "none" | "default" | "muted" | "input" | "primary" | "destructive" | "success" | "warning" | "info";
type BoxRadius = "none" | "sm" | "md" | "lg" | "full";
type BoxOverflow = "visible" | "hidden" | "clip" | "auto";

type BoxProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: BoxElement;
    asChild?: boolean;
    display?: BoxDisplay;
    p?: BoxSpacing;
    px?: BoxSpacing;
    py?: BoxSpacing;
    ps?: BoxSpacing;
    pe?: BoxSpacing;
    pt?: BoxSpacing;
    pb?: BoxSpacing;
    m?: BoxSpacing;
    mx?: BoxSpacing;
    my?: BoxSpacing;
    ms?: BoxSpacing;
    me?: BoxSpacing;
    mt?: BoxSpacing;
    mb?: BoxSpacing;
    gap?: BoxSpacing;
    surface?: BoxSurface;
    border?: BoxBorder;
    radius?: BoxRadius;
    overflow?: BoxOverflow;
  };
```

Defaults:

- `as="div"`
- `asChild={false}`
- `display` omitted, allowing the rendered element's native display behavior to apply
- `surface="transparent"`
- `border="none"`
- `radius="none"`
- `overflow` omitted

## Behavior

- Native mode renders the chosen `as` element.
- `asChild` mode accepts exactly one valid React element and applies Box classes, data attributes, event props, and composed refs to the child without adding a wrapper.
- `asChild` child props should win for element-specific attributes where composition requires it, while Box class names and data attributes remain stable.
- Box does not add ARIA roles, focus behavior, keyboard behavior, click behavior, labels, or interactive semantics.
- Box spacing props map to explicit Tailwind utilities and support logical inline/block/start/end directions.
- Box supports small display and overflow maps for common wrapper needs, but complex layout remains the responsibility of future layout primitives or `className`.
- `className` composes after default classes so consumers can extend or override when needed.

## Token Maps

Spacing:

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

Surfaces:

- `transparent`
- `background`
- `muted`
- `primary`
- `destructive`
- `success`
- `warning`
- `info`

Borders:

- `none`
- `default`
- `muted`
- `input`
- `primary`
- `destructive`
- `success`
- `warning`
- `info`

Radius:

- `none`
- `sm`
- `md`
- `lg`
- `full`

Overflow:

- `visible`
- `hidden`
- `clip`
- `auto`

Display:

- `block`
- `inline`
- `inline-block`
- `contents`
- `flex`
- `inline-flex`
- `grid`

## Accessibility

- Box is semantically neutral by default.
- Consumers must choose meaningful semantic elements with `as` when content structure requires it.
- Box must not automatically create landmarks, regions, buttons, links, headings, labels, or status messages.
- `as="nav"` and other landmark elements require consumer-provided accessible names when multiple landmarks of the same type are present.
- `as="ul"` or `as="ol"` should preserve list semantics; avoid styling examples that strip list semantics without restoring them.
- `display="contents"` should be documented as a visual-layout tool that can affect accessibility trees in some browser/assistive-tech combinations; do not use it in critical examples.

## Theming

- Use semantic Tailwind utilities and CSS variables only; no hard-coded brand colors.
- Use explicit class maps so Tailwind can statically detect classes.
- Support light, dark, density, RTL, and token override contexts through existing provider and utility conventions.
- Use logical spacing utilities for inline/start/end directions.
- Keep Box source portable for registry installation.

## Registry Requirements

- Add a `box` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Box for simple wrappers, future layout components for structured layout.
- Installation through registry and package import.
- Anatomy and stable data attributes.
- `as` and `asChild` examples.
- Spacing, logical spacing, gap, surface, border, radius, display, overflow, and `className` examples.
- Accessibility, theming, SSR, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

- Render tests for default element output, supported `as` elements, `asChild`, spacing maps, logical spacing, gap, surfaces, borders, radius, display, overflow, custom attributes, class merging, and ref forwarding.
- Type-level tests for invalid token values where practical.
- Accessibility tests with axe smoke, semantic element preservation, and no fake roles by default.
- SSR render and hydration tests.
- Storybook coverage for base wrapper, semantic elements, spacing matrix, logical RTL spacing, surfaces, border/radius, display/overflow, dashboard examples, dark mode, density, and `asChild`.
- Registry validation and registry smoke.

## Out Of Scope

- Full CSS prop API.
- `sx` prop or runtime style parser.
- CSS-in-JS or style-system runtime.
- Responsive object or array props.
- Container max-width behavior.
- Stack, Inline, Flex, Grid, SimpleGrid, Card, Separator, Divider, AspectRatio, ScrollArea, Splitter, or SidebarShell behavior.
- Automatic ARIA roles or landmark labels.
- Focus management, keyboard behavior, command actions, navigation, or form control behavior.

## Definition Of Done

- Public types and component export exist.
- Styling uses token-backed Tailwind utility maps and stable `data-*` selectors.
- Docs, Storybook, tests, SSR, a11y, registry metadata, playground smoke, and registry smoke are updated.
- Verification passes: `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke.
