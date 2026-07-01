# Flex Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/49

Source: `react_component_library_prd.docx` layout component inventory, `docs/development-path.md`, `docs/high-impact-component-priority.md`, current Box and Stack implementation conventions, published Container PRD, current Tailwind CSS documentation, and Modern Web Guidance `css-layout`.

Package target: `@dethink/components`.

## Candidate Selection

Flex is the next new PRD candidate after Stack in the high-impact sequence.

Main now includes Stack. Container remains open in GitHub issues #38-#41 and has local stacked branches, but it is not present on `main`; that is unfinished integration work rather than a new PRD candidate. Flex should proceed as the next planning candidate while Container is tracked separately as already-planned work.

## Purpose

Flex is a lower-level one-dimensional layout primitive for teams that need more control than Stack without reaching directly for ad hoc flexbox class strings everywhere.

Stack owns common row and column composition with simple gap, alignment, justification, and wrapping. Flex owns explicit flex container behavior, independent row and column gaps, wrap-line alignment, inline-flex display, and optional item sizing through a paired `FlexItem` primitive.

Flex should make toolbars, split rows, responsive wrap groups, media rows, filter bars, dashboard control strips, form action rows, and AI-native prompt/input shells easier to build while preserving DOM order and registry portability.

## Priority

P0, high-impact layout primitive.

## Dependencies

- Foundation tokens for spacing, density, direction, and theme context.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Box and Stack conventions for `asChild`, ref composition, stable `data-*` selectors, Storybook coverage, SSR tests, a11y tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced.

## Public API

```ts
type FlexElement =
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

type FlexDisplay = "flex" | "inline-flex";
type FlexDirection = "row" | "column";
type FlexWrap = "nowrap" | "wrap";
type FlexGap = "none" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
type FlexAlign = "stretch" | "start" | "center" | "end" | "baseline";
type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type FlexContent = "start" | "center" | "end" | "between" | "around" | "evenly" | "stretch";

type FlexProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: FlexElement;
    asChild?: boolean;
    display?: FlexDisplay;
    direction?: FlexDirection;
    wrap?: FlexWrap;
    gap?: FlexGap;
    rowGap?: FlexGap;
    columnGap?: FlexGap;
    align?: FlexAlign;
    justify?: FlexJustify;
    content?: FlexContent;
  };

type FlexItemElement = "div" | "span" | "li" | "section" | "article" | "aside";
type FlexItemGrow = "0" | "1";
type FlexItemShrink = "0" | "1";
type FlexItemBasis = "auto" | "0" | "full" | "xs" | "sm" | "md" | "lg";
type FlexItemAlign = "auto" | "stretch" | "start" | "center" | "end" | "baseline";

type FlexItemProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: FlexItemElement;
    asChild?: boolean;
    grow?: FlexItemGrow;
    shrink?: FlexItemShrink;
    basis?: FlexItemBasis;
    align?: FlexItemAlign;
    minInlineSize?: "auto" | "0";
  };
```

Flex defaults:

- `as="div"`
- `asChild={false}`
- `display="flex"`
- `direction="row"`
- `wrap="nowrap"`
- `gap="none"`
- `align="stretch"`
- `justify="start"`
- `content="stretch"`

FlexItem defaults:

- `as="div"`
- `asChild={false}`
- `grow` omitted, allowing native flex item behavior
- `shrink` omitted, allowing native flex item behavior
- `basis="auto"`
- `align="auto"`
- `minInlineSize="auto"`

## Behavior

- Native Flex mode renders the chosen `as` element.
- `asChild` mode accepts exactly one valid React element and applies Flex classes, data attributes, event props, and composed refs to the child without adding a wrapper.
- Flex establishes a flex formatting context with `display: flex` or `display: inline-flex`.
- `direction="row"` maps to the inline axis and is the default because Flex is lower-level than Stack.
- `direction="column"` maps to the block axis.
- Flex uses `gap`, `rowGap`, and `columnGap` for spacing, with explicit row and column gap props overriding the shared `gap` for that axis.
- `wrap="wrap"` allows items to wrap when content cannot fit. `content` controls wrapped-line distribution when wrapping and extra cross-axis space are present.
- `align` controls cross-axis alignment for all items.
- `justify` controls main-axis distribution for all items.
- Flex must not expose reverse direction or item ordering APIs in v1. DOM order must remain the source of reading and keyboard order.
- FlexItem supports common item sizing without exposing a full arbitrary style system.
- FlexItem `minInlineSize="0"` is the documented escape hatch for long unbreakable content in flex rows.
- FlexItem does not expose `order` in v1.
- Consumers should use logical margin utilities such as `ms-auto` in `className` when a single item needs to push to the far edge.
- Neither Flex nor FlexItem adds ARIA roles, focus behavior, keyboard behavior, click behavior, labels, form state, or list semantics beyond the selected native element.
- `className` composes after default classes so consumers can extend or override when needed.

## Token Maps

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

Container display:

- `flex`
- `inline-flex`

Container direction:

- `row`
- `column`

Container wrap:

- `nowrap`
- `wrap`

Container align:

- `stretch`
- `start`
- `center`
- `end`
- `baseline`

Container justify:

- `start`
- `center`
- `end`
- `between`
- `around`
- `evenly`

Container content:

- `start`
- `center`
- `end`
- `between`
- `around`
- `evenly`
- `stretch`

Item grow and shrink:

- `0`
- `1`

Item basis:

- `auto`
- `0`
- `full`
- `xs`
- `sm`
- `md`
- `lg`

Item align:

- `auto`
- `stretch`
- `start`
- `center`
- `end`
- `baseline`

## Accessibility

- Flex is semantically neutral by default.
- Consumers must choose meaningful semantic elements with `as` when content structure requires it.
- Flex must preserve DOM order as reading order and tab order.
- Flex must not expose reverse direction, visual ordering, or item `order` props in v1 because those can desynchronize visual order from keyboard order.
- `as="ul"` and `as="ol"` preserve list semantics. Examples should keep direct list item semantics where possible.
- `as="form"` and `as="fieldset"` should be documented as layout wrappers only; validation, labeling, errors, and form orchestration belong to future Form and Field primitives.
- `as="nav"` and other landmarks require consumer-provided accessible names when multiple landmarks of the same type are present.
- Examples should avoid alignment patterns that clip focusable content. When content may overflow, examples should favor wrapping, intrinsic sizing, or explicit overflow handling.

## Theming

- Use token-backed Tailwind utilities only; no hard-coded brand colors.
- Use explicit class maps so Tailwind can statically detect classes.
- Support light, dark, density, RTL, and token override contexts through existing provider and utility conventions.
- Prefer logical layout concepts and gap-based spacing. Do not rely on physical left/right margins for child spacing.
- Keep Flex source portable for registry installation.

## Registry Requirements

- Add a `flex` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Flex for lower-level one-dimensional layout control, Stack for common vertical/horizontal groups, Box for generic wrappers, Container for page width, Grid for two-dimensional layout.
- Installation through registry and package import.
- Anatomy and stable data attributes for Flex and FlexItem.
- `as` and `asChild` examples for both primitives.
- Container examples for row, column, inline-flex, wrapping, rowGap, columnGap, align, justify, and align-content.
- Item examples for grow, shrink, basis, align-self, and `minInlineSize="0"`.
- Practical examples for toolbars, filter bars, media rows, responsive card action rows, form action rows, and prompt/input shells.
- Accessibility, theming, SSR, RTL, density, responsive `className`, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

- Render tests for default element output, supported `as` elements, `asChild`, display maps, direction maps, wrap maps, gap maps, row/column gap precedence, alignment maps, justification maps, content maps, custom attributes, class merging, children, and ref forwarding.
- FlexItem render tests for supported elements, `asChild`, grow, shrink, basis, align-self, `minInlineSize`, custom attributes, class merging, children, and ref forwarding.
- Type-level tests for invalid token values and unsupported element values where practical.
- Accessibility tests with axe smoke, semantic element preservation, no fake roles by default, DOM-order preservation expectations, list examples, and landmark examples only when consumers intentionally choose landmark elements.
- SSR render and hydration tests for Flex and FlexItem.
- Storybook coverage for base row, column, inline-flex, wrap gallery, row/column gap matrix, align matrix, justify matrix, align-content examples, item grow/shrink/basis examples, long-content `minInlineSize="0"`, toolbar/filter examples, Stack/Box/Container composition, dark mode, density, RTL, responsive `className` composition, and `asChild`.
- Registry validation and registry smoke.

## Out Of Scope

- Stack replacement for simple grouped content.
- Reverse direction or visual reordering.
- Item `order` props.
- Arbitrary flex shorthand strings or runtime CSS prop parsing.
- Grid, SimpleGrid, subgrid, masonry, or two-dimensional layout.
- Container max-width or page gutter behavior.
- Box surface, border, radius, padding, margin, display, or overflow shortcuts.
- Separator or Divider insertion.
- Form state, validation, labels, help text, errors, or fieldset orchestration.
- Responsive object or array props.
- CSS-in-JS, `sx`, runtime style parsing, or dynamic class generation.
- Automatic ARIA roles, landmark labels, focus management, keyboard behavior, command actions, navigation, or interactive behavior.

## Definition Of Done

- Public types and component exports exist for Flex and FlexItem.
- Styling uses token-backed Tailwind utility maps and stable `data-*` selectors.
- Docs, Storybook, tests, SSR, a11y, registry metadata, playground smoke, and registry smoke are updated.
- Verification passes: `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke where available.
