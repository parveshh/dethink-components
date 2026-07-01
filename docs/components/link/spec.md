# Link Component Spec

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/11

Source: `react_component_library_prd.docx` component inventory, plus approved Link PRD plan.

Package target: `@dethink/components`.

## Purpose

Link is the navigation primitive for real hyperlinks and router links. It gives teams a token-backed, accessible anchor component that is visually consistent with the rest of Dethink Components while keeping Button and IconButton reserved for actions.

## Priority

P0.

## Dependencies

- Foundation tokens for color, focus, radius, motion, and density.
- Tailwind CSS v4 utilities with static class maps.
- Shared `cn` class name utility.
- Existing Button conventions for class merging, focus-visible rings, stable `data-*` selectors, Storybook coverage, SSR tests, and registry smoke.
- Registry base setup under `registry/items/base.json`.

## Public API

```tsx
type LinkVariant = "default" | "muted" | "nav" | "destructive";
type LinkUnderline = "hover" | "always" | "none";

type LinkBaseProps = {
  variant?: LinkVariant;
  underline?: LinkUnderline;
  asChild?: boolean;
  children: React.ReactNode;
};

type LinkProps =
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> &
      LinkBaseProps & {
        asChild?: false;
        href: string;
      })
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> &
      LinkBaseProps & {
        asChild: true;
        href?: string;
        children: React.ReactElement;
      });
```

Defaults:

- `variant="default"`
- `underline="hover"`
- `asChild={false}`

## Behavior

- Native mode renders an `<a>` element and requires `href`.
- `asChild` mode accepts exactly one React element and applies Link styling, state attributes, refs, and safety behavior to that child without replacing router semantics.
- `target="_blank"` merges `noopener` into `rel` while preserving existing `rel` tokens.
- `aria-current` remains the public current-state mechanism. Link derives `data-current="true"` when `aria-current` is present and not `false`.
- Link exposes `data-slot="link"`, `data-variant`, `data-underline`, and optional `data-current`.
- Link does not prevent clicks, simulate disabled state, show loading state, or act like a command button.

## Variants

- `default`: primary text link for inline and standalone navigation.
- `muted`: lower-emphasis link for metadata and secondary actions.
- `nav`: navigation item styling that can visually respond to `aria-current`.
- `destructive`: risk-oriented navigation, such as leaving a flow or opening a dangerous destination. Surrounding copy must still communicate intent.

Underline modes:

- `hover`: underline on hover/focus-visible.
- `always`: underline at rest.
- `none`: no underline, intended for nav chrome where other affordances are present.

## Accessibility

- Prefer native anchor behavior over ARIA. A link should navigate, not trigger a command.
- Link text should be meaningful. Reused accessible names should point to the same destination.
- `aria-current` communicates the active page or section in navigation contexts.
- Focus-visible styling must remain visible and token-backed.
- `asChild` children must preserve link semantics through their rendered output.
- Do not use Link for disabled or loading controls; use Button or IconButton for actions.

## Theming

- Use semantic Tailwind utilities and CSS variables only; no hard-coded brand colors.
- Use explicit variant and underline class maps so Tailwind can statically detect classes.
- Support light, dark, density, RTL, and token override contexts through existing provider and utility conventions.
- Consumer `className` must compose predictably with default classes.

## Registry Requirements

- Add a `link` registry item with component source, index export, and `cn` utility.
- Depend on `dethink-base`.
- Add no runtime dependencies.
- Keep metadata compatible with the existing registry validation and smoke scripts.

## Documentation Requirements

- Overview and semantic boundary: Link for navigation, Button/IconButton for actions.
- Installation through registry and package import.
- Anatomy and stable data attributes.
- Native, inline, navigation/current, external, and router `asChild` examples.
- Variants and underline modes.
- Accessibility, security, theming, SSR, and testing guidance.
- Known limitations and out-of-scope behavior.

## Testing Requirements

- Render tests for native anchor output, required `href` typing, variants, underline modes, `aria-current`, class merging, ref forwarding, `target="_blank"` rel merging, and `asChild`.
- Accessibility tests with axe smoke, focus-visible class presence, meaningful link text examples, current-state semantics, and no fake-button behavior.
- SSR render and hydration tests.
- Storybook coverage for inline, nav/current, external, router composition, variants, underline modes, dashboard examples, dark mode, density, and RTL.
- Registry validation and registry smoke.

## Definition Of Done

- Public types and component export exist.
- Styling uses token-backed Tailwind utility maps and stable `data-*` selectors.
- Docs, Storybook, tests, SSR, a11y, registry metadata, playground smoke, and registry smoke are updated.
- Verification passes: `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke.
