# IconButton Component Spec

Status: Draft local spec.

Tracker PRD: https://github.com/parveshh/dethink-components/issues/6

Package target: `@dethink/components`.

## Summary

IconButton is the P0 icon-only action primitive. It is the companion to Button for dense toolbars, table row actions, command surfaces, topbars, and compact dashboard controls.

IconButton renders a native `button`, requires an accessible name, uses Button's token-backed visual language, and keeps navigation, tooltip coupling, `asChild`, and managed toggle state out of v1.

## Public API

```ts
export type IconButtonVariant = Exclude<ButtonVariant, "link">;
export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconButtonShape = "square" | "circle";

export type IconButtonAccessibleName =
  | { "aria-label": string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby": string };

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "aria-labelledby"
> &
  IconButtonAccessibleName & {
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    shape?: IconButtonShape;
    loading?: boolean;
    children: React.ReactNode;
  };
```

Defaults:

- `variant="ghost"`
- `size="md"`
- `shape="square"`
- `loading={false}`
- `type="button"`

## Behavior

- Native `button` is always rendered in v1.
- Default native type is `button`; consumers must opt into `submit` or `reset`.
- Either `aria-label` or `aria-labelledby` is required by the TypeScript API.
- `children` is the visual icon content and is treated as decorative.
- Loading state renders a spinner, exposes `aria-busy`, disables the native button, and prevents activation.
- Disabled state uses native `disabled`.
- Toggle usage is supported by passing native/ARIA props such as `aria-pressed`; IconButton does not manage selected state in v1.
- `asChild`, icon-only links, and tooltip props are out of scope.

## Styling And Theming

- Use Tailwind CSS v4 utilities, semantic tokens, explicit class maps, and `cn`.
- Reuse Button's variant language except the `link` variant.
- Use stable attributes: `data-slot`, `data-variant`, `data-size`, `data-shape`, `data-loading`, and `data-disabled`.
- Provide square dimensions for every size and a circular shape variant.
- Preserve visible focus indicators in light, dark, density, and high-contrast-friendly states.
- Do not add component-specific global CSS unless a token bridge is required.

## Accessibility

- Native button semantics are preferred over ARIA.
- Accessible name is required because icon-only controls have no visible text label.
- Decorative icon content must not pollute the accessible name.
- Loading and disabled states must not rely on color alone.
- Focus-visible styling must remain obvious.
- Docs must include guidance for `aria-label` versus `aria-labelledby`.

## Registry

IconButton receives a `registry:ui` item under `registry/items/icon-button.json`.

The registry item depends on `dethink-base` and includes IconButton source files plus the shared `cn` helper and Button type dependency if required by the final source shape.

## Test Requirements

- Render tests cover native defaults, default type, accessible names, variants, sizes, shape, loading, disabled, activation prevention, submit type, `aria-pressed`, class composition, and ref forwarding.
- Accessibility tests cover axe, `aria-label`, `aria-labelledby`, decorative icon behavior, focus behavior, disabled state, and loading state.
- SSR tests cover server rendering and hydration.
- Storybook covers variants, sizes, shapes, loading, disabled, destructive, toggle toolbar, density, dark mode, RTL, and dashboard toolbar examples.
