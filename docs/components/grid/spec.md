# Grid Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/56.

Source: `react_component_library_prd.docx` layout component inventory, `docs/development-path.md`, `docs/high-impact-component-priority.md`, current Box, Container, Stack, and Flex implementation conventions, Tailwind CSS documentation fetched through Context7 on 2026-07-01, and Modern Web Guidance `css-layout`.

Package target: `@dethink/components`.

## Candidate Selection

Grid is the next new PRD candidate after Stack and Flex in the high-impact sequence.

GitHub currently has no open PRDs or implementation issues. Main includes the foundational layout primitives before Grid: Box, Container, Stack, and Flex. There is no existing Grid planning folder, published PRD, or active Grid issue set, so Grid is the next component to plan.

## Purpose

Grid is the P0 two-dimensional layout primitive for product screens that need rows and columns with predictable spacing, alignment, and safe item spanning.

Box can create a basic grid formatting context, Stack covers common one-dimensional grouping, Flex covers lower-level one-dimensional control, and Container owns page width. Grid should own reusable two-dimensional layout patterns for dashboard card matrices, settings layouts, responsive resource lists, comparison panels, KPI sections, form-adjacent two-column layouts, and AI workspace panes.

Grid v1 should stay intentionally constrained. It should expose static Tailwind class maps for common track counts, auto-fit card grids, gaps, item alignment, track distribution, and item spans. It should not become a generic CSS grid template parser, a masonry system, a subgrid abstraction, or a responsive object prop system.

## Priority

P0, high-impact layout primitive.

## Dependencies

- Foundation tokens for spacing, density, direction, and theme context.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Box, Container, Stack, and Flex conventions for `asChild`, ref composition, stable `data-*` selectors, Storybook coverage, SSR tests, accessibility tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced.

## Research Decisions

- Modern Web Guidance recommends Grid when the layout defines rows and columns first, and Flex when items flow along one axis.
- Auto-fit card grids should use `repeat(auto-fit, minmax(min, 1fr))` when the item count or available width is unknown.
- Auto-fit and auto-fill track sizing depends on the repeat size argument, not item content.
- Grid v1 must not expose `grid-auto-flow: dense` for interactive content because it can visually reorder content away from DOM order and keyboard order.
- Grid v1 must not expose line-start, line-end, named area, or arbitrary template string APIs because those can create layout-specific visual reordering and stale docs quickly.
- Subgrid is Baseline widely available, but Grid v1 should not formalize a subgrid API until nested card, data list, and dashboard examples prove the stable contract. Consumers can still use `className` for local subgrid experiments.
- Tailwind CSS supports explicit grid utility classes and arbitrary-value utilities, but Grid component variants must keep all class names statically detectable.

## Public API

```ts
export type GridElement =
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
  | "fieldset";

export type GridColumns =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "12"
  | "auto-fit-xs"
  | "auto-fit-sm"
  | "auto-fit-md"
  | "auto-fit-lg";

export type GridRows = "none" | "1" | "2" | "3" | "4" | "5" | "6";
export type GridGap = "none" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
export type GridAlign = "stretch" | "start" | "center" | "end";
export type GridJustify = "stretch" | "start" | "center" | "end";
export type GridContent = "start" | "center" | "end" | "between" | "around" | "evenly" | "stretch";

export type GridProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: GridElement;
    asChild?: boolean;
    columns?: GridColumns;
    rows?: GridRows;
    gap?: GridGap;
    rowGap?: GridGap;
    columnGap?: GridGap;
    align?: GridAlign;
    justify?: GridJustify;
    alignContent?: GridContent;
    justifyContent?: GridContent;
  };

export type GridItemElement = "div" | "span" | "li" | "section" | "article" | "aside";
export type GridItemSpan = "1" | "2" | "3" | "4" | "5" | "6" | "full";
export type GridItemAlign = "auto" | "stretch" | "start" | "center" | "end";
export type GridItemJustify = "auto" | "stretch" | "start" | "center" | "end";
export type GridItemMinInlineSize = "auto" | "0";

export type GridItemProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: GridItemElement;
    asChild?: boolean;
    colSpan?: GridItemSpan;
    rowSpan?: GridItemSpan;
    align?: GridItemAlign;
    justify?: GridItemJustify;
    minInlineSize?: GridItemMinInlineSize;
  };
```

Grid defaults:

- `as="div"`
- `asChild={false}`
- `columns="1"`
- `rows="none"`
- `gap="none"`
- `align="stretch"`
- `justify="stretch"`
- `alignContent="start"`
- `justifyContent="start"`

GridItem defaults:

- `as="div"`
- `asChild={false}`
- `colSpan="1"`
- `rowSpan="1"`
- `align="auto"`
- `justify="auto"`
- `minInlineSize="auto"`

## Behavior

- Native Grid mode renders the chosen `as` element.
- `asChild` mode accepts exactly one valid React element and applies Grid classes, data attributes, event props, and composed refs to the child without adding a wrapper.
- Grid establishes a grid formatting context with `display: grid`.
- `columns` controls the column template through static class maps.
- Numeric `columns` values map to uniform `repeat(n, minmax(0, 1fr))` style tracks through Tailwind utilities.
- `auto-fit-*` values map to static `repeat(auto-fit, minmax(..., 1fr))` classes for responsive card and resource grids.
- `rows` controls explicit row count when needed and defaults to no explicit row template.
- `gap`, `rowGap`, and `columnGap` use the shared spacing token scale. Row and column gap props override the shared gap for their axis.
- `align` and `justify` align item content within tracks.
- `alignContent` and `justifyContent` distribute tracks within the container when there is extra space.
- GridItem supports common safe spanning through `colSpan` and `rowSpan`.
- GridItem supports per-item `align`, `justify`, and `minInlineSize`.
- GridItem does not expose `order`, line placement, named areas, or arbitrary template placement in v1.
- Grid and GridItem must preserve DOM order as reading and keyboard order.
- Consumers can use `className` for local responsive breakpoint classes and rare advanced grid utilities.
- Neither Grid nor GridItem adds ARIA roles, focus behavior, keyboard behavior, click behavior, labels, form state, or list semantics beyond the selected native element.
- `className` composes after default classes so consumers can extend or override when needed.

## Token Maps

Grid columns:

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `12`
- `auto-fit-xs`
- `auto-fit-sm`
- `auto-fit-md`
- `auto-fit-lg`

Grid rows:

- `none`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`

Gap, rowGap, and columnGap:

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

Container align and justify:

- `stretch`
- `start`
- `center`
- `end`

Track content distribution:

- `start`
- `center`
- `end`
- `between`
- `around`
- `evenly`
- `stretch`

Item span:

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `full`

Item align and justify:

- `auto`
- `stretch`
- `start`
- `center`
- `end`

Item min inline size:

- `auto`
- `0`

## Accessibility

- Grid is semantically neutral by default.
- Consumers must choose meaningful semantic elements with `as` when content structure requires it.
- Grid must preserve DOM order as reading order and tab order.
- Grid must not expose dense packing, visual ordering, or line-placement APIs in v1 because those can desynchronize visual order from keyboard order.
- `as="ul"` and `as="ol"` preserve list semantics. Examples should keep direct list item semantics where possible.
- `as="form"` and `as="fieldset"` are layout wrappers only; validation, labels, errors, and form orchestration belong to future Form and Field primitives.
- `as="nav"` and other landmarks require consumer-provided accessible names when multiple landmarks of the same type are present.
- Examples should avoid layouts where responsive wrapping changes the meaningful sequence of interactive content.
- Examples should use `minInlineSize="0"` where long content inside a track must shrink without causing horizontal overflow.

## Theming

- Use token-backed Tailwind utilities only; no hard-coded brand colors.
- Use explicit class maps so Tailwind can statically detect classes.
- Support light, dark, density, RTL, responsive, and token override contexts through existing provider and utility conventions.
- Prefer logical layout concepts and gap-based spacing. Do not rely on physical left/right margins for child spacing.
- Keep Grid source portable for registry installation.

## Data Attributes

Grid should expose stable data attributes:

- `data-slot="grid"`
- `data-as-child="true"` when composed.
- `data-element` for native rendering.
- `data-columns`
- `data-rows`
- `data-gap`
- `data-row-gap`
- `data-column-gap`
- `data-align`
- `data-justify`
- `data-align-content`
- `data-justify-content`

GridItem should expose stable data attributes:

- `data-slot="grid-item"`
- `data-as-child="true"` when composed.
- `data-element` for native rendering.
- `data-col-span`
- `data-row-span`
- `data-align`
- `data-justify`
- `data-min-inline-size`

## Registry Requirements

- Add a `grid` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Grid for two-dimensional layout, Flex for one-dimensional control, Stack for common grouped content, Box for generic wrappers, Container for page width.
- Installation through registry and package import.
- Anatomy and stable data attributes for Grid and GridItem.
- `as` and `asChild` examples for both primitives.
- Examples for fixed columns, auto-fit grids, explicit rows, shared gap, row and column gaps, item alignment, track distribution, column spans, row spans, and long-content shrink behavior.
- Practical examples for dashboard card grids, settings panels, comparison layouts, KPI matrices, resource lists, and form-adjacent two-column layouts.
- Accessibility, theming, SSR, RTL, density, responsive `className`, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

Render and type tests:

- Default native element.
- Supported `as` elements.
- `asChild` composition.
- Ref forwarding.
- `className` merging.
- Custom attributes.
- Column class maps, including auto-fit variants.
- Row class maps.
- Shared gap, rowGap, and columnGap class maps.
- Container align, justify, alignContent, and justifyContent class maps.
- GridItem native rendering.
- GridItem `asChild` composition.
- GridItem refs, custom attributes, className merging, colSpan, rowSpan, align, justify, and `minInlineSize`.
- Unsupported token values and unsupported element values rejected by TypeScript where practical.

Accessibility tests:

- Axe smoke.
- Semantic element preservation.
- No fake roles by default.
- No focusable behavior by default.
- List semantics when consumers choose list elements.
- DOM order remains authoritative in examples and docs.

SSR tests:

- Server render smoke.
- Hydration smoke without warnings.

Storybook tests and examples:

- Base grid.
- Fixed column matrix.
- Auto-fit resource grid.
- Explicit row example.
- Gap matrix.
- Row and column gap example.
- Item alignment and track distribution matrix.
- Column and row span examples.
- Long-content shrink example.
- Dashboard, settings, comparison, KPI, and resource-list examples.
- Semantic elements.
- `asChild` composition.
- Box, Container, Stack, and Flex composition.
- Dark mode.
- Density.
- RTL.
- Responsive `className` composition.

Registry and playground tests:

- Registry metadata validates.
- Registry smoke verifies files, dependency-free behavior, stable slot data, and tokenized classes.
- Playground imports and renders Grid and GridItem from `@dethink/components`.

## Out Of Scope

- Generic Box spacing, surface, border, radius, display, or overflow shortcuts.
- Stack replacement for common grouped content.
- Flex replacement for one-dimensional alignment and item sizing.
- Container max-width, gutters, safe-area behavior, or page-width rules.
- Separator or Divider insertion between children.
- Card anatomy, surfaces, headers, footers, or action areas.
- Form state, validation, labels, help text, errors, or fieldset orchestration.
- Table, DataTable, DataGrid, calendar grid, or spreadsheet semantics.
- Masonry, grid lanes, or `grid-auto-flow: dense`.
- Subgrid API.
- Named grid areas.
- Line-start and line-end placement.
- Visual reordering APIs.
- Arbitrary template strings, arbitrary CSS props, `sx`, CSS-in-JS, or runtime class generation.
- Responsive object or array props.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, or interactive behavior.
