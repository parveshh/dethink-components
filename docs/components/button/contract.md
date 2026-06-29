# Button Visual And API Contract

Status: Proposed for HITL approval.

Parent PRD: https://github.com/parveshh/dethink-components/issues/1

Tracker issue: https://github.com/parveshh/dethink-components/issues/2

Mockup reference: [button-contract-reference.png](./mockups/button-contract-reference.png)

Generated mockup source: built-in imagegen, copied into the workspace from `$CODEX_HOME/generated_images/...`.

## Decision Needed

Approve or revise this contract before AFK implementation starts on issue #3.

If approved, issue #3 can implement the baseline Button without reopening the variant, size, token, or default form-behavior decisions.

## Scope

Button is the default action primitive for Dethink Components. It covers text buttons with optional icons, tokenized variants, responsive theme behavior, form-safe defaults, and installability through package and registry paths.

Button does not cover icon-only actions, grouped action layout, permission policy, async orchestration, analytics, or navigation semantics beyond the controlled `asChild` composition path.

## Target Files

- `packages/components/src/components/button/button.tsx`
- `packages/components/src/components/button/index.ts`
- `packages/components/src/components/button/button.test.tsx`
- `packages/components/src/components/button/button.a11y.test.tsx`
- `packages/components/src/index.ts`
- `apps/storybook/src/Button.stories.tsx`
- `apps/playground-vite/src/App.tsx`
- `registry/items/button.json`
- `docs/components/button/*`

## Public API

```tsx
export type ButtonVariant =
  | "solid"
  | "soft"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}
```

Defaults:

- `variant="solid"`
- `size="md"`
- `loading={false}`
- `asChild={false}`
- `type="button"` when rendering a native button and `type` is not supplied

Native button props, `className`, `children`, event handlers, `aria-*`, and `data-*` attributes pass through.

## Variants

- `solid`: primary action emphasis using `primary` and `primary-foreground` tokens.
- `soft`: lower-emphasis primary action using a muted primary surface and primary foreground.
- `outline`: neutral action with tokenized border, background, and foreground.
- `ghost`: low-emphasis action with no border in the default state.
- `link`: inline action style with button semantics, reserved for cases that still trigger an action.
- `destructive`: risk action emphasis using `destructive` and `destructive-foreground` tokens.

Destructive styling is visual emphasis only. Copy, dialog context, and labels must still communicate the risk.

## Sizes

- `xs`: dense table rows and compact toolbars.
- `sm`: compact product surfaces.
- `md`: default application control size.
- `lg`: higher-emphasis forms and panels.
- `xl`: page-level primary actions where space allows.
- `icon`: square action affordance for icon-bearing buttons with an accessible name. Dedicated icon-only behavior belongs to IconButton when that component exists.

Density modes may adjust the control height and gap through existing density tokens, but they must not change the public size names.

## Styling Contract

Button styling must use Tailwind CSS v4 utilities, semantic CSS variables, and explicit static class maps.

Required implementation conventions:

- Use `cn` from `packages/components/src/utils/cn.ts`.
- Use complete static class strings in variant and size maps so Tailwind can detect every class.
- Use token utilities generated from the base `@theme` setup, including `background`, `foreground`, `border`, `ring`, `primary`, `destructive`, and `muted`.
- Use `data-slot="button"` on the root.
- Use stable attributes such as `data-variant`, `data-size`, `data-loading`, `data-disabled`, `aria-busy`, and `aria-disabled` where relevant.
- Use `focus-visible` ring styling backed by the `ring` token.
- Avoid hard-coded brand colors, CSS-in-JS, styled-components, Emotion, and generated Tailwind class fragments.
- Keep component-specific CSS out of global styles unless it is a shared primitive or token bridge.

## Behavior Contract

- Native `button` is the default rendered element.
- Default native type is `button`, not `submit`.
- Consumers must explicitly set `type="submit"` or `type="reset"` for form actions.
- Disabled native buttons use the real `disabled` attribute and cannot fire activation.
- Loading buttons expose `aria-busy="true"`, set `data-loading`, and prevent duplicate activation.
- Loading state keeps readable label text visible.
- Keyboard activation remains native for default buttons.
- `asChild` preserves the child element semantics and documents disabled/loading limitations.
- When `asChild` renders a non-button element, use `aria-disabled` and event prevention instead of invalid native `disabled`.

## Icon Contract

- `leftIcon` renders before text.
- `rightIcon` renders after text.
- Icons are decorative unless the button has no visible text.
- Text buttons with icons keep consistent gap and alignment across sizes and writing directions.
- Icon-only actions require an accessible name and should migrate to IconButton when available.

## Accessibility Contract

- Focus indicators must remain visible in light and dark themes.
- Loading and disabled states cannot be communicated by color alone.
- Disabled state must not be focusable when using native `disabled`.
- `asChild` limitations must be documented because links and custom elements do not share native button disabled semantics.
- Storybook and tests must cover accessible names, disabled behavior, loading behavior, and keyboard activation.

## Documentation Contract

Button docs must include:

- Overview and installation.
- Package import and registry install notes.
- Variant and size examples.
- Loading, disabled, destructive, icon, and `asChild` examples.
- Submit, reset, and default non-submit form examples.
- Button versus Link versus IconButton guidance.
- Accessibility notes and keyboard acceptance criteria.
- Theming and density notes.
- Testing guidance and recommended selectors.

## Approval Checklist

- [ ] Variants are approved.
- [ ] Sizes are approved.
- [ ] Default `type="button"` behavior is approved.
- [ ] Loading and disabled contracts are approved.
- [ ] `asChild` composition boundary is approved.
- [ ] Button versus Link versus IconButton guidance is approved.
- [ ] Mockup reference is approved as a visual direction, with implementation details remaining token-driven.
- [ ] Issue #3 may start after this checklist is approved or revised.
