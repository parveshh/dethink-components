# Button Component Spec

Status: Draft for approval.

Source: `react_component_library_prd.docx`, section 9.1 and Appendix B.

Package target: `@dethink/components`.

## Purpose

Button is the primary action trigger for the component library. It is the first concrete component because it exercises the smallest complete product path: tokenized styling, variants, native semantics, loading and disabled behavior, docs, registry metadata, package export, and tests.

## Priority

P0.

## Dependencies

- Foundation tokens, including color, radius, spacing, focus, motion, and density tokens.
- Tailwind CSS v4 base setup with CSS-first theme variables and semantic utility tokens.
- Shared `cn` class name utility from `packages/components/src/utils/cn.ts`.
- Variant recipe convention using explicit static Tailwind class maps.
- Registry item metadata under `registry/items`.
- Documentation shell and Storybook test harness under `apps/storybook`.
- Vite playground smoke app under `apps/playground-vite`.
- Optional slot/as-child helper for composition.

## Variants

Required variants:

- `solid`
- `soft`
- `outline`
- `ghost`
- `link`
- `destructive`

Required sizes:

- `xs`
- `sm`
- `md`
- `lg`
- `xl`
- `icon`

## Public API

Initial API target:

```tsx
<Button variant="solid" size="md" loading leftIcon={<PlusIcon />}>
  Create project
</Button>
```

Required props:

- `variant`
- `size`
- `loading`
- `disabled`
- `leftIcon`
- `rightIcon`
- `asChild`
- `type`
- `className`
- `children`
- Native button props when rendering a button element.

Recommended default:

- Render a native `button` by default.
- Default `type` to `button` unless a consumer explicitly sets `submit` or `reset`.
- When `asChild` is true, preserve the child element semantics and document the limitations around disabled and loading behavior.

## Behavior

- Click and keyboard activation use native button behavior by default.
- Disabled buttons cannot be activated.
- Loading buttons expose busy state, prevent duplicate submission, and retain readable button text.
- Focus-visible styling is always visible and token-driven.
- Left and right icons align consistently across sizes and writing directions.
- `destructive` communicates risk visually and through text context, not by color alone.
- Motion respects `prefers-reduced-motion`.

## Accessibility

- Native button semantics are required by default.
- Focus-visible indicator must meet contrast expectations and never be removed without replacement.
- Loading state should expose `aria-busy` or equivalent useful status where appropriate.
- Disabled state should use real `disabled` for native buttons.
- Icon-only actions belong to `IconButton`; Button can visually contain icons but still needs readable text unless composition intentionally provides an accessible name.

## Theming

- No hard-coded brand colors.
- All colors, focus rings, radius, spacing, and motion values come from tokens/CSS variables exposed through Tailwind utilities.
- Button variants and sizes should use explicit Tailwind class maps plus a shared class merge helper.
- State styling should use stable selectors such as `data-loading`, `data-disabled`, `data-invalid`, `aria-disabled`, and `aria-busy` where applicable.
- Consumer `className` values must compose predictably without breaking required accessibility states.
- Must support light, dark, high-contrast, and density modes.
- Must expose stable data attributes for state and slot styling where useful.

## Registry Requirements

The registry item should include:

- Component metadata: `name`, `type`, `title`, and `description`.
- Required files for the component, stories, docs, and tests where registry publishing supports them.
- `registryDependencies` for shared utilities and token setup.
- `dependencies` only when the component requires runtime packages beyond the base setup.
- `cssVars` only for Button-specific variables if they are not already supplied by the base design system.

Current shadcn registry docs support registry item fields such as `dependencies`, `devDependencies`, `registryDependencies`, `files`, and `cssVars`. Tailwind v4-oriented registry work should prefer CSS variable theme data rather than deprecated Tailwind config extension fields.

The base registry item currently lives at `registry/items/base.json`. Button should add its own registry item only after the Button PRD and issue breakdown are approved.

## Documentation Requirements

The docs page must include:

- Overview and when to use Button versus Link or IconButton.
- Installation through registry and optional package import.
- Anatomy and named parts.
- Variants and sizes.
- Loading, disabled, destructive, icon, and as-child examples.
- Form submit and non-submit examples.
- Accessibility notes.
- Theming notes.
- Testing guidance and recommended selectors.
- Known limitations.

## Testing Requirements

Use external behavior as the testing target:

- Rendering with each variant and size.
- Click activation and disabled prevention.
- Loading behavior prevents duplicate actions.
- Keyboard activation works for native buttons.
- `type` behavior is explicit in forms.
- `asChild` composition preserves child semantics.
- Storybook visual states cover light, dark, density, hover, active, focus-visible, disabled, and loading.
- Tailwind variant maps are exercised for all variants and sizes.
- Token override stories verify Button responds to semantic color, radius, focus ring, and density changes.
- Vite playground smoke test verifies package and stylesheet imports.
- Registry validation verifies Button metadata once its registry item exists.
- SSR smoke test verifies no hydration warnings.

## Definition Of Done

- API reviewed against library naming conventions.
- Design review covers variants, sizes, dark mode, high contrast, and density.
- Accessibility review covers native semantics, focus, disabled, loading, and keyboard activation.
- TypeScript types are exported.
- Docs cover usage, API, states, accessibility, theming, recipes, and known limitations.
- Tests cover behavior, accessibility checks, visual states, registry install, and SSR.
- Registry metadata declares dependencies and installable files.
- Changelog entry and migration notes exist if behavior changes after release.

## Scaffold Verification Commands

- `pnpm typecheck`
- `pnpm build`
- `pnpm test`
- `pnpm test:a11y`
- `pnpm storybook:build`
- `pnpm registry:validate`
