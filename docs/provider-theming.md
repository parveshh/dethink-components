# Provider-Level Theming

Provider theming is configured on `DethinkProvider` and cascades to all components through CSS custom properties. The provider does not read `localStorage`, call `matchMedia`, or require a CSS-in-JS runtime.

## Public API

```tsx
import {
  DethinkProvider,
  DethinkThemeScript,
  defineDethinkTheme,
} from "@dethink/components";

const theme = defineDethinkTheme({
  colorSchemes: {
    light: {
      primary: "oklch(0.52 0.2 255)",
      primaryForeground: "oklch(0.99 0.01 250)",
    },
    dark: {
      primary: "oklch(0.72 0.16 250)",
      primaryForeground: "oklch(0.16 0.04 255)",
    },
  },
  fonts: {
    body: "Inter, ui-sans-serif, system-ui, sans-serif",
    heading: "Sora, Inter, ui-sans-serif, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace",
  },
  spacing: {
    "4": "1.125rem",
  },
  radii: {
    md: "0.625rem",
  },
  density: {
    compact: {
      control: "1.875rem",
      gap: "0.375rem",
    },
  },
});

export function App() {
  return (
    <DethinkProvider theme="system" density="default" themeConfig={theme}>
      {/* components */}
    </DethinkProvider>
  );
}
```

## Token Model

`themeConfig` is flattened to provider inline CSS variables such as `--dt-color-primary-light`, `--dt-font-heading`, `--dt-space-4`, `--dt-radius-md`, and `--dt-density-control-compact`.

`packages/components/src/styles.css` defines defaults and resolves active variables through `data-theme` and `data-density`:

- `data-theme="light"` resolves active color tokens from `--dt-color-*-light`.
- `data-theme="dark"` resolves active color tokens from `--dt-color-*-dark`.
- `data-theme="system"` resolves light by default and dark inside `prefers-color-scheme: dark`.
- `data-density` resolves `--dt-density-control` and `--dt-density-gap`.

User `style` props are merged after `themeConfig`, so explicit inline CSS variable overrides still win.

## Nested Providers

Nested providers work through normal CSS cascade. Override only the tokens needed in an inner provider:

```tsx
<DethinkProvider theme="light" themeConfig={brandTheme}>
  <DethinkProvider theme="dark" themeConfig={panelTheme}>
    {/* panel uses the nested variables */}
  </DethinkProvider>
</DethinkProvider>
```

## Optional No-Flash Script

Use `DethinkThemeScript` only when the app stores a color mode before React hydration:

```tsx
<html>
  <head>
    <DethinkThemeScript storageKey="app-theme" defaultTheme="system" />
  </head>
  <body>{/* app root */}</body>
</html>
```

The script sets `document.documentElement.dataset.theme` and native `color-scheme` metadata early. It is optional; `DethinkProvider` itself remains SSR-safe and side-effect free.

## Registry Surface

`registry/items/base.json` exposes provider-level `cssVars.theme` entries for semantic colors, light/dark source colors, fonts, spacing, radius, and density. Component registry items should depend on the base item instead of re-declaring these foundation tokens.
