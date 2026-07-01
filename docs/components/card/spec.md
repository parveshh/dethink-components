# Card Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/67.

Source: `react_component_library_prd.docx` data-display component inventory, `docs/development-path.md`, `docs/high-impact-component-priority.md`, current primitive conventions, and shadcn/ui Card documentation fetched through Context7 on 2026-07-01.

Package target: `@dethink/components`.

## Candidate Selection

Card is the next P0 candidate after Separator / Divider in the high-impact component sequence.

GitHub currently has no previous Card PRD or implementation issue set, and there is no existing Card planning folder. Main already has the primitives Card should compose with: Box, Container, Stack, Flex, Grid, Separator, Typography, Button, Link, and IconButton.

## Purpose

Card is a framed content surface and anatomy primitive for dashboards, settings panels, resource summaries, AI-adjacent panels, billing panels, empty-state containers, and form-adjacent sections.

Card should replace ad hoc combinations of background, border, radius, shadow, padding, header layout, title typography, description copy, action placement, content spacing, and footer alignment. It should remain a static content container, not a clickable-card widget or a replacement for Box, Stack, Flex, Grid, Separator, Form, Table, Stat/KPI, Chart, or AI-specific cards.

## Research Decisions

- Current shadcn/ui Card anatomy is `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, and `CardFooter`.
- shadcn/ui treats Card as an installable registry component rather than a runtime dependency, which matches Dethink's open-code registry direction.
- Card should compose existing primitives instead of duplicating their behavior: Grid arranges card matrices, Stack/Flex arrange internal content, Separator divides sections, Typography owns heading/text scale, and Button/Link own actions.
- Static cards should not invent widget roles. Interactive actions inside a Card should remain real Button or Link children.
- CardTitle should support real heading semantics when consumers need document outline participation, but Card should not force one global heading level.
- CardAction and CardFooter should use logical, wrapping-safe layout so RTL and narrow screens do not require physical left/right overrides.
- Variants must be explicit static Tailwind maps, not generated strings or runtime style parsing.

## Dependencies

- Foundation tokens for color, radius, spacing, density, theme, and direction.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Box, Stack, Flex, Grid, Separator, Typography, Button, and Link conventions for refs, stable data attributes, Storybook coverage, SSR tests, a11y tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced.

## Public API

The implementation issue should finalize names, but the planned public surface is:

```ts
export type CardElement = "div" | "article" | "section" | "aside" | "li";
export type CardSurface = "default" | "muted" | "transparent";
export type CardBorder = "default" | "muted" | "none";
export type CardRadius = "md" | "lg";
export type CardShadow = "none" | "sm" | "md";
export type CardSpacing = "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  asChild?: boolean;
  border?: CardBorder;
  radius?: CardRadius;
  shadow?: CardShadow;
  spacing?: CardSpacing;
  surface?: CardSurface;
}

export interface CardSlotProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "header" | "footer" | "section";
  spacing?: CardSpacing;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "div" | "span";
}
```

Exports should include:

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardAction`
- `CardContent`
- `CardFooter`
- class name helpers where consistent with existing primitives
- prop and token types

## Behavior

- Card root renders the chosen static element.
- Card root supports `asChild` with exactly one compatible child and no extra wrapper.
- Card root forwards refs in native and composed modes.
- Slot components forward refs and render stable DOM elements with predictable classes.
- CardHeader groups title, description, and optional action.
- CardAction aligns header actions without assuming physical left/right layout.
- CardContent owns body spacing.
- CardFooter owns footer action and metadata alignment.
- CardTitle uses compact title typography and can render as a heading element when requested.
- CardDescription uses muted supporting text styling.
- Card root and slots compose consumer `className` after default classes.
- Card root and slots expose stable data attributes for slot and active token states.
- Card remains static. Click, route, select, drag, disclosure, and focus-management behavior belongs to composed children or future components.

## Accessibility

- Card does not add widget roles by default.
- Interactive examples must use Button or Link children for actions.
- Card must not turn a full surface into an inaccessible clickable region.
- CardTitle should support heading elements so consumers can create meaningful document outlines.
- CardDescription should remain normal text semantics.
- Card should support `article`, `section`, `aside`, and `li` roots when consumers need semantic grouping.
- Slot components must not hide descendants from assistive technologies.
- Layout and spacing should not create overlap, truncation, or overflow on mobile.

## Styling

- Use Tailwind CSS v4 utilities and explicit variant maps.
- Use `cn` for class merging.
- Use token-backed background, foreground, border, radius, shadow, and spacing utilities.
- Keep cards visually restrained for SaaS dashboards and internal tools.
- Keep radius at 8px or less unless global tokens change.
- Use logical layout and wrapping-safe alignment for action/footer areas.
- Avoid hard-coded brand colors.
- Avoid CSS-in-JS, Emotion, styled-components, style-system runtimes, `sx`, arbitrary CSS prop parsing, runtime class generation, and responsive object props.

## Data Attributes

Card should expose stable data attributes:

- `data-slot="card"`
- `data-slot="card-header"`
- `data-slot="card-title"`
- `data-slot="card-description"`
- `data-slot="card-action"`
- `data-slot="card-content"`
- `data-slot="card-footer"`
- `data-as-child="true"` when composed.
- `data-element` for native rendering where useful.
- `data-surface`
- `data-border`
- `data-radius`
- `data-shadow`
- `data-spacing`

## Registry Requirements

- Add a `card` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with existing registry validation and smoke scripts.

## Documentation Requirements

- Overview: Card is a static framed content surface and anatomy primitive.
- Installation through registry and package import.
- Anatomy and stable data attributes.
- Base Card example.
- Header, title, description, action, content, and footer examples.
- Dashboard metric card examples without implementing Stat/KPI.
- Settings panel and form-adjacent examples without implementing Form/Field.
- Resource summary and AI-adjacent panel examples.
- Separator composition examples.
- `asChild` composition example.
- Accessibility, theming, SSR, RTL, density, responsive `className`, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

Render and type tests:

- Default root element.
- Supported root elements.
- Root `asChild` composition.
- Ref forwarding for root and slots.
- `className` merging.
- Custom attributes.
- Slot rendering and stable data attributes.
- CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter composition.
- Title heading element support.
- Surface, border, radius, shadow, and spacing class maps.
- Rejection of unsupported tokens and unsupported elements where practical.

Accessibility tests:

- Axe smoke.
- Static non-widget semantics.
- Heading/title composition.
- Nested Button and Link action patterns.
- No clickable-card role behavior by default.

SSR tests:

- Server render smoke.
- Hydration smoke without warnings.

Storybook tests and examples:

- Base anatomy.
- Header action.
- Content-only card.
- Footer actions.
- Dashboard metric card.
- Settings panel card.
- Resource card.
- Media/content composition.
- Empty/content states.
- Separator composition.
- Stack, Flex, Grid, Box, Container, Typography, Button, and Link composition.
- `asChild` composition.
- Dark mode.
- Density.
- RTL.
- Responsive `className` composition.

Registry and playground tests:

- Registry metadata validates.
- Registry smoke verifies files, dependency-free behavior, stable slot data, tokenized classes, and copied source files.
- Playground imports and renders Card and all slots from `@dethink/components`.

## Out Of Scope

- Clickable-card or selectable-card behavior.
- Card-as-link routing behavior.
- Drag and drop cards.
- Collapsible cards.
- Data fetching, loading orchestration, or query state management.
- Metric formatting, Stat/KPI logic, charts, table/list rendering, or rich media abstraction.
- Form, Field, Label, validation, or input behavior.
- Alert, Callout, Toast, EmptyState, Badge, Avatar, List, DataList, Table, DataTable, Chart, or AI-specific card primitives.
- Automatic header/content/footer insertion.
- Runtime child inspection for slot ordering.
- Arbitrary CSS props, `sx`, CSS-in-JS, runtime class generation, responsive object props, or polymorphic style systems.
- Focus management, keyboard interaction, disclosure state, menu behavior, popover behavior, or overlay behavior.
