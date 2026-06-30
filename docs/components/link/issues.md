# Link Issue Breakdown

Status: Published to GitHub issue tracker.

This uses the `to-issues` tracer-bullet format.

Package target: `@dethink/components`.

## Published Issues

- Parent PRD: https://github.com/parveshh/dethink-components/issues/11
- AFK contract and local planning docs: https://github.com/parveshh/dethink-components/issues/12
- AFK source, exports, and behavior tests: https://github.com/parveshh/dethink-components/issues/13
- AFK registry, Storybook, a11y, SSR, and verification: https://github.com/parveshh/dethink-components/issues/14

## Branch Stack

1. `codex/prd-11-link`
2. `codex/issue-12-link-contract-docs`
3. `codex/issue-13-link-source-tests`
4. `codex/issue-14-link-registry-storybook`

The final implementation PR should target `codex/prd-11-link` from the top issue branch.

## Proposed Breakdown

1. **Title**: Link contract and local planning docs (#12)
   **Type**: AFK
   **Blocked by**: #11
   **User stories covered**: 1-22

2. **Title**: Link source, exports, and behavior tests (#13)
   **Type**: AFK
   **Blocked by**: #12
   **User stories covered**: 1-16, 18, 21, 22

3. **Title**: Link registry, Storybook, a11y, SSR, and verification (#14)
   **Type**: AFK
   **Blocked by**: #13
   **User stories covered**: 11, 17-22

## Published Issue #12

## What to build

Create the local Link planning artifacts from the published PRD. This slice makes the Link contract implementation-ready by capturing the component purpose, API, semantic boundary between links and actions, token/theming approach, testing seams, and stacked issue workflow.

## Acceptance criteria

- [ ] Local Link planning docs exist and reflect the published PRD decisions.
- [ ] The docs define native anchor mode, router composition through `asChild`, Link variants, underline modes, current-state semantics, and new-tab rel safety.
- [ ] The docs clearly mark disabled/loading/button behavior, route matching, prefetch, tooltip integration, external icon API, and visited-color API as out of scope for v1.
- [ ] Testing seams are documented for render behavior, accessibility, SSR, Storybook, registry validation, and registry smoke.
- [ ] The implementation issue breakdown documents stacked branch order and references this parent PRD.

## Blocked by

- #11

## Published Issue #13

## What to build

Build the Link source contract and behavior tests. This slice should deliver the exported component and types with native-anchor rendering, router-style `asChild` composition, token-backed class maps, current-state data attributes, ref forwarding, class merging, and automatic `noopener` merging for new-tab links.

## Acceptance criteria

- [ ] Link renders a native anchor by default and native mode requires an `href` in the public TypeScript API.
- [ ] Link supports `variant`, `underline`, `asChild`, native anchor props, `className`, `children`, and forwarded refs.
- [ ] `asChild` accepts a single child element and applies Link styling/state behavior without replacing router semantics.
- [ ] `aria-current` is preserved and exposes a stable current-state data attribute.
- [ ] `target="_blank"` links include `noopener` in `rel` while preserving existing `rel` tokens.
- [ ] Unit/render tests cover anchor output, variants, underline modes, class composition, refs, current state, rel behavior, and router-style composition.
- [ ] Link is exported from the package public entrypoint.

## Blocked by

- #12

## Published Issue #14

## What to build

Complete Link's distribution and verification surfaces. This slice should make Link installable and reviewable through registry metadata, Storybook examples, playground or registry smoke coverage, accessibility tests, SSR tests, and the standard verification commands.

## Acceptance criteria

- [ ] Registry metadata installs Link with accurate files and no unnecessary runtime dependencies.
- [ ] Storybook covers inline links, navigation/current state, external links, router-style `asChild`, variants, underline modes, dashboard examples, dark mode, density, and RTL.
- [ ] Accessibility coverage includes axe smoke, visible focus styling, meaningful link text examples, current-state semantics, and no fake-button behavior.
- [ ] SSR coverage verifies server render and hydration without warnings.
- [ ] Playground or registry smoke coverage proves package and registry install paths include Link correctly.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm build`, `pnpm storybook:build`, `pnpm registry:validate`, and registry smoke pass or any environment limitation is documented.

## Blocked by

- #13
