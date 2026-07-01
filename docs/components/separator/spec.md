# Separator Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/62.

Source: `react_component_library_prd.docx` layout component inventory, `docs/development-path.md`, `docs/high-impact-component-priority.md`, current layout primitive conventions, MDN `<hr>` and ARIA separator references, WAI-ARIA structural-role guidance, Tailwind CSS documentation fetched through Context7 on 2026-07-01, and Modern Web Guidance `css-layout`.

Package target: `@dethink/components`.

## Candidate Selection

Separator / Divider is the next P0 candidate after Grid in both the static development path and the high-impact component sequence.

GitHub currently has no open issues, and there is no existing Separator planning folder or published PRD. Main already includes the layout primitives that Separator should compose with: Box, Container, Stack, Flex, and Grid.

## Purpose

Separator is a small static boundary primitive for visually and, when requested, semantically separating groups of content.

The component should replace ad hoc border utilities in dashboards, settings panels, menu groups, toolbar groups, card sections, form-adjacent layouts, and AI workspace surfaces. It should be token-backed, orientation-aware, writing-direction-safe, registry-portable, and explicit about accessibility semantics.

`Separator` is the canonical API name. `Divider` should be exported as an alias for teams and examples that use divider terminology.

## Research Decisions

- The native `<hr>` element represents a thematic break and has an implicit `separator` role.
- ARIA `separator` can describe static dividers between content or menu groups. Focusable separators are moveable splitter widgets and require value semantics; those belong to future Splitter / Resizable Panels work.
- Non-focusable separators do not need accessible names.
- `aria-orientation` should match separator orientation, especially for vertical separators.
- Native HTML should be preferred where it carries the right semantics. ARIA should only be added when rendering a non-native separator element or composing through `asChild`.
- Separator descendants are presentational in accessibility APIs, so v1 should not support labelled or content-bearing dividers.
- Modern Web Guidance recommends logical layout concepts and native layout primitives. Separator should use tokenized dimensions and logical spacing rather than physical left/right assumptions.
- Tailwind CSS supports static border, size, shrink, margin, and data-attribute class composition. Separator variants must use explicit class maps, not runtime-generated utility strings.

## Dependencies

- Foundation tokens for color, spacing, density, direction, and theme context.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Box, Stack, Flex, Grid, and Container conventions for `asChild`, ref composition, stable `data-*` selectors, Storybook coverage, SSR tests, a11y tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced.

## Public API

```ts
export type SeparatorElement = "hr" | "div" | "span";
export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorThickness = "1" | "2";
export type SeparatorTone = "default" | "muted" | "strong";
export type SeparatorSpacing = "none" | "1" | "2" | "3" | "4" | "6" | "8";

export type SeparatorProps =
  Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
    as?: SeparatorElement;
    asChild?: boolean;
    decorative?: boolean;
    orientation?: SeparatorOrientation;
    thickness?: SeparatorThickness;
    tone?: SeparatorTone;
    spacing?: SeparatorSpacing;
  };

export type DividerProps = SeparatorProps;
```

Defaults:

- `as="hr"`
- `asChild={false}`
- `decorative={false}`
- `orientation="horizontal"`
- `thickness="1"`
- `tone="default"`
- `spacing="none"`

## Behavior

- Native Separator mode renders the chosen `as` element.
- `asChild` accepts exactly one valid React element and applies Separator classes, data attributes, event props, refs, and accessibility attributes without adding a wrapper.
- `Separator` renders semantic markup by default. With the default `as="hr"` and `decorative={false}`, the component relies on native `<hr>` semantics.
- When `decorative={false}` and `as` is not `hr`, Separator sets `role="separator"`.
- When `decorative={false}`, Separator sets `aria-orientation` to match `orientation`.
- When `decorative={true}`, Separator sets `aria-hidden="true"` and should not set `role` or `aria-orientation`.
- `orientation="horizontal"` produces a full-width horizontal rule.
- `orientation="vertical"` produces a vertical rule that can stretch in flex, grid, or toolbar compositions.
- `thickness` controls line thickness through static size maps.
- `tone` controls token-backed separator color.
- `spacing` applies orientation-aware logical margin around the line.
- `className` composes after default classes so consumers can extend local layout.
- `Divider` is a named alias with the same runtime behavior and prop type.

## Accessibility

- Separator is static and non-interactive in v1.
- Separator must not be focusable by default.
- Separator must not expose splitter, resize, drag, keyboard, or value semantics.
- Focusable moveable separators, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and pane resizing belong to future Splitter / Resizable Panels.
- Decorative separators should be hidden from assistive technologies.
- Semantic separators should preserve native `<hr>` semantics when possible.
- Vertical semantic separators should expose matching orientation.
- Separator should not accept content children because descendant semantics are presentational for separator roles.
- `asChild` must not accidentally remove child refs, events, or class names.

## Styling

- Use Tailwind CSS v4 utilities and explicit variant maps.
- Use `cn` for class merging.
- Use `border-0`, `shrink-0`, token-backed background color utilities, and stable block/inline dimensions.
- Horizontal separators should use full inline size and fixed block thickness.
- Vertical separators should use fixed inline thickness and stretchable block size suitable for Stack/Flex/Grid examples.
- Use logical spacing concepts where possible and avoid physical left/right assumptions.
- Avoid hard-coded brand colors.
- Avoid CSS-in-JS, Emotion, styled-components, style-system runtimes, `sx`, and arbitrary CSS prop parsing.

## Data Attributes

Separator should expose stable data attributes:

- `data-slot="separator"`
- `data-as-child="true"` when composed.
- `data-element` for native rendering.
- `data-orientation`
- `data-decorative`
- `data-thickness`
- `data-tone`
- `data-spacing`

## Registry Requirements

- Add a `separator` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Separator / Divider for static visual or semantic boundaries, not layout containers or resizable splitters.
- Installation through registry and package import.
- Anatomy and stable data attributes.
- `Separator` and `Divider` import examples.
- Horizontal and vertical examples.
- Decorative and semantic examples.
- Thickness, tone, and spacing examples.
- Toolbar, menu group, settings section, card section, form section, Stack/Flex/Grid composition examples.
- `asChild` composition example.
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
- Orientation classes and data attributes.
- Decorative versus semantic ARIA attributes.
- Thickness, tone, and spacing class maps.
- Divider alias export and behavior.
- Rejection of children and unsupported tokens where practical.

Accessibility tests:

- Axe smoke.
- Semantic `<hr>` behavior.
- Non-`hr` role and orientation behavior.
- Decorative separators hidden from assistive technologies.
- No focusable behavior by default.

SSR tests:

- Server render smoke.
- Hydration smoke without warnings.

Storybook tests and examples:

- Base horizontal separator.
- Vertical separator.
- Decorative separator.
- Semantic separator.
- Thickness, tone, and spacing matrices.
- Toolbar/menu/settings/card/form examples.
- Stack, Flex, Grid, Box, and Container composition.
- `asChild` composition.
- Dark mode.
- Density.
- RTL.
- Responsive `className` composition.

Registry and playground tests:

- Registry metadata validates.
- Registry smoke verifies files, dependency-free behavior, stable slot data, tokenized classes, orientation semantics, and copied source files.
- Playground imports and renders Separator and Divider from `@dethink/components`.

## Out Of Scope

- Resizable splitter or panel divider behavior.
- Focusable separator widgets.
- Drag handles.
- Keyboard interaction.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, or pane-size state.
- Labelled or content-bearing dividers.
- Automatic insertion between Stack, Flex, Grid, or menu children.
- Layout primitives such as Stack, Flex, Grid, Container, Spacer, Center, or SimpleGrid.
- Card anatomy, section headers, or content grouping.
- Menu, toolbar, command, tabs, breadcrumb, navigation, or form behavior.
- Arbitrary CSS props, `sx`, CSS-in-JS, runtime class generation, responsive object props, or polymorphic style systems.
