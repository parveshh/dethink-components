# Dethink Components Planning Docs

This folder contains implementation planning derived from `react_component_library_prd.docx`.

## Files

- `component-inventory.md` lists the full component, foundation, utility, and block inventory from the PRD.
- `development-path.md` defines the component-by-component build order and the repeated PRD-to-issues workflow.
- `high-impact-component-priority.md` records the current demand-weighted component priority overlay used to choose the next PRD candidate.
- `provider-theming.md` documents provider-level theme configuration, CSS variable cascade behavior, nested providers, and the optional no-flash script.
- `components/button/spec.md` is the first concrete component specification.
- `components/button/prd.md` is the first component PRD drafted with the `to-prd` template.
- `components/button/issues.md` is the first component issue breakdown drafted with the `to-issues` template. It is not published yet because the issue breakdown needs approval first.

## Source Notes

- Source PRD: `react_component_library_prd.docx`
- Source date in PRD: 29 June 2026
- Current product working name in PRD: TBD UI
- Package name: `@dethink/components`
- Primary distribution model: custom shadcn-style registry first, optional npm package second.
- Styling model: Tailwind CSS v4 by default, using CSS-first theme variables, token-backed utilities, and registry-compatible `cssVars`.
- Documentation lookup model: use logged-in `ctx7` before web search for library, framework, SDK, API, CLI, and cloud-service documentation. `npx ctx7 whoami` was checked while creating these docs and reported an active login.
- Current shadcn registry docs checked through `ctx7`: registry items support metadata such as `name`, `type`, `title`, `description`, `dependencies`, `devDependencies`, `registryDependencies`, `files`, and `cssVars`. Tailwind v4-oriented registry work should prefer `cssVars.theme` over deprecated Tailwind config extension fields where possible.

## Scaffold Notes

- `packages/components` is the public React package.
- `apps/storybook` is the Storybook documentation and visual/a11y surface.
- `apps/playground-vite` is the smoke-test app for package and stylesheet imports.
- `registry/items/base.json` is the first registry metadata placeholder.
- `scripts/validate-registry.mjs` validates registry item shape.
