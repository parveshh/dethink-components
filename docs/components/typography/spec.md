# Typography Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/26

Source: `react_component_library_prd.docx` component inventory, plus approved Typography PRD plan.

Package target: `@dethink/components`.

## Purpose

Typography, Heading, and Text provide the P0 text foundation for Dethink Components. They give application teams token-backed text primitives for semantic headings, body copy, captions, labels, muted text, status copy, truncation, and common dashboard composition without forcing each component to invent its own type scale.

## Priority

P0.

## Dependencies

- Foundation tokens for color, typography, focus, motion, density, and text contrast.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Button, IconButton, and Link conventions for class merging, stable `data-*` selectors, Storybook coverage, SSR tests, a11y tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

No new runtime dependency should be introduced for this component family.

## Public API

```ts
type TypographyElement =
  | "p"
  | "span"
  | "div"
  | "small"
  | "strong"
  | "em"
  | "label"
  | "figcaption";

type TypographyVariant =
  | "display"
  | "heading"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "label";

type TypographySize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type TypographyTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "success"
  | "warning"
  | "destructive";
type TypographyWeight = "regular" | "medium" | "semibold" | "bold";
type TypographyAlign = "start" | "center" | "end" | "justify";

type TypographyProps = React.HTMLAttributes<HTMLElement> & {
  as?: TypographyElement;
  variant?: TypographyVariant;
  size?: TypographySize;
  tone?: TypographyTone;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
};

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVisualLevel = HeadingLevel;

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  visualLevel?: HeadingVisualLevel;
  tone?: Extract<TypographyTone, "default" | "muted" | "subtle" | "primary" | "destructive">;
  align?: TypographyAlign;
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
};

type TextElement = "p" | "span" | "div" | "small" | "label" | "strong" | "em";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: TextElement;
  size?: TextSize;
  tone?: TypographyTone;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
};
```

Defaults:

- `Typography`: `as="p"`, `variant="body"`, `tone="default"`, `weight="regular"`, `align="start"`
- `Heading`: `level={2}`, `visualLevel={level}`, `tone="default"`, `align="start"`
- `Text`: `as="p"`, `size="md"`, `tone="default"`, `weight="regular"`, `align="start"`

## Behavior

- `Heading` renders a native heading element based on `level`.
- `Heading` uses `visualLevel` for styling, allowing semantic level and visual size to differ.
- `Text` renders a controlled set of text-oriented elements for body copy, inline text, labels, captions, and helper text.
- `Typography` is the low-level tokenized primitive for advanced text use cases that still need the design-system text scale.
- `truncate` applies single-line truncation.
- `lineClamp` applies multi-line clamping and should not be combined with `truncate`.
- Alignment values use logical `start` and `end` semantics so RTL remains correct.
- Components expose `data-slot`, `data-size` or `data-visual-level`, `data-tone`, `data-weight`, `data-align`, `data-truncate`, and `data-line-clamp` where applicable.
- Components do not create headings with ARIA roles when a native heading element is available.

## Variants

Typography variants:

- `display`: large marketing or product-level text, used sparingly in docs and major page surfaces.
- `heading`: section-level text style for semantic headings or heading-like text.
- `title`: compact title text for cards, dialogs, lists, and panels.
- `subtitle`: supporting title text with lower emphasis.
- `body`: default paragraph text.
- `caption`: small metadata and helper text.
- `label`: dense UI labels.

Text tones:

- `default`: normal foreground text.
- `muted`: secondary text with enough contrast for body copy.
- `subtle`: tertiary text for metadata and dense chrome.
- `primary`: brand/action-adjacent emphasis through semantic primary tokens.
- `success`: status copy for successful or positive outcomes.
- `warning`: status copy for cautionary states.
- `destructive`: risk, error, or destructive-state copy.

Weights:

- `regular`
- `medium`
- `semibold`
- `bold`

Alignment:

- `start`
- `center`
- `end`
- `justify`

## Accessibility

- Preserve native heading elements for headings.
- Do not skip heading levels for visual sizing; use `visualLevel` instead.
- Do not use `Heading` for non-heading text.
- Do not use `Typography` or `Text` to fake links, buttons, status regions, or form labels where a semantic component exists.
- Tones must not be the only signal for important states; surrounding text or iconography should communicate meaning.
- Muted and subtle tones must maintain readable contrast in light and dark themes.
- Truncation and line clamp can hide content visually, so examples should pair them with contexts where full content is still available or not critical.

## Theming

- Use semantic Tailwind utilities and CSS variables only; no hard-coded brand colors.
- Use explicit variant, size, tone, weight, alignment, truncation, and line-clamp class maps so Tailwind can statically detect classes.
- Support light, dark, density, RTL, and token override contexts through existing provider and utility conventions.
- Consumer `className` must compose predictably with default classes.
- Keep typography classes portable for registry-installed source.

## Registry Requirements

- Add a `typography` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with the existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Heading for headings, Text for copy, Typography for advanced text primitives.
- Installation through registry and package import.
- Anatomy and stable data attributes.
- Heading level versus visual level examples.
- Text size, tone, weight, alignment, truncation, and line-clamp examples.
- Dashboard, card, form-helper, and metadata composition examples.
- Accessibility, theming, SSR, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

- Render tests for semantic element output, heading levels, visual heading levels, text sizes, typography variants, tones, weights, alignment, truncation, line clamp, class merging, custom attributes, and ref forwarding.
- Accessibility tests with axe smoke, native heading semantics, no fake heading roles, readable tone examples, and status-tone guidance.
- SSR render and hydration tests.
- Storybook coverage for heading scale, semantic versus visual level, text scale, tone matrix, weight matrix, truncation, line clamp, dashboard examples, dark mode, density, and RTL.
- Registry validation and registry smoke.

## Out Of Scope

- Code and Kbd components.
- Markdown, MDX, prose, or rich text rendering.
- Automatic heading-level context or document outline management.
- Font loading or global typeface configuration.
- Global CSS reset changes beyond existing foundations.
- Responsive prop arrays or breakpoint-specific typography APIs.
- Copy-to-clipboard behavior.
- Tooltip integration.
- Text measurement, overflow detection callbacks, or virtualized text behavior.
- Localization or message formatting APIs.

## Definition Of Done

- Public types and component exports exist.
- Styling uses token-backed Tailwind utility maps and stable `data-*` selectors.
- Docs, Storybook, tests, SSR, a11y, registry metadata, playground smoke, and registry smoke are updated.
- Verification passes: `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke.
