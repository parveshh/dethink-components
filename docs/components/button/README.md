# Button

Button is the baseline action primitive for `@dethink/components`.

## Installation

Package import:

```tsx
import { Button } from "@dethink/components";
import "@dethink/components/styles.css";
```

Registry item:

```sh
button
```

The Button registry item depends on `dethink-base` for Tailwind CSS variables, base styles, and the shared `cn` helper.

## Basic Usage

```tsx
<Button>Save changes</Button>
<Button variant="outline">Cancel</Button>
<Button size="sm">Compact action</Button>
<Button leftIcon={<PlusIcon />}>Create project</Button>
```

Native `button` is the default rendered element and defaults to `type="button"`. Set `type="submit"` or `type="reset"` explicitly for form actions.

## Form Safety

Button defaults to `type="button"` to avoid accidental form submissions.

```tsx
<form onSubmit={saveProject}>
  <Button>Open preview</Button>
  <Button type="submit">Save project</Button>
  <Button type="reset" variant="outline">
    Reset
  </Button>
</form>
```

Use actionable submit text. Do not disable submit buttons to hide validation errors; let users submit so native and app validation can explain what needs attention. After a valid submission starts, set `loading` to prevent duplicate activation.

## Variants

- `solid`
- `soft`
- `outline`
- `ghost`
- `link`
- `destructive`

`destructive` is visual emphasis only. Use clear text and surrounding confirmation context so destructive intent is not communicated by color alone.

## Sizes

- `xs`
- `sm`
- `md`
- `lg`
- `xl`
- `icon`

## States

```tsx
<Button disabled>Disabled</Button>
<Button loading>Saving changes</Button>
<Button variant="destructive">Delete project</Button>
```

Disabled buttons use the native `disabled` attribute and expose `data-disabled="true"`.

Loading buttons:

- keep the visible label in place
- expose `aria-busy="true"`
- expose `data-loading="true"`
- render a decorative spinner
- disable the native button to prevent duplicate submission

Focus styling uses token-backed `focus-visible` ring utilities. Do not remove focus styling without replacing it with an equally visible tokenized indicator.

## Icons

Use `leftIcon` and `rightIcon` for decorative affordances around a visible label.

```tsx
<Button leftIcon={<PlusIcon />}>Create project</Button>
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>
```

Icons render in decorative slots with `aria-hidden="true"`. Keep visible button text unless the control has a separate accessible name. Icon-only actions should move to IconButton when that component exists.

## Composition

Use `asChild` when Button styling needs to be applied to a compatible child element such as a routing link.

```tsx
<Button asChild rightIcon={<ArrowRightIcon />}>
  <a href="/docs">Read docs</a>
</Button>
```

When `asChild` is true, Button clones the single child element and composes class names, data attributes, click behavior, loading state, and icon slots onto it.

Native `disabled` and `type` are not applied to `asChild` children because they are invalid for links and many custom components. Disabled or loading `asChild` buttons use `aria-disabled="true"` and prevent click activation. If the child component performs navigation or mutation outside standard click handling, the consumer must guard that behavior.

## Choosing The Right Action

- Use Button for in-page actions, form actions, dialogs, mutations, and workflows.
- Use Link for navigation when no button styling or action semantics are needed.
- Use Button with `asChild` for a routing link that must visually match Button while preserving link semantics.
- Use IconButton for icon-only controls once IconButton exists.
- Use ButtonGroup for visually connected sets of actions once ButtonGroup exists.

## Known Limitations

- `asChild` requires exactly one valid React element child.
- `asChild` keeps the child element's semantics; Button does not convert links into native buttons.
- `leftIcon` and `rightIcon` are decorative by default.
- Loading state is intentionally local. Consumers remain responsible for async action orchestration and error handling.

## Testing Guidance

Prefer public behavior checks:

- role and accessible name
- default `type="button"` behavior
- explicit submit/reset behavior
- disabled and loading activation prevention
- `aria-busy`, `aria-disabled`, `data-loading`, and `data-disabled`
- icon slot rendering without changing the accessible name
- `asChild` semantic preservation
- SSR render and hydration smoke coverage
- registry metadata and base token availability

## Current Slice

Issue #5 adds icon affordances, `asChild` composition, usage guidance, SSR smoke coverage, registry smoke coverage, and final Button Definition of Done.

## Definition Of Done

- Public props and exported types are documented.
- Variants and sizes use static Tailwind class maps and semantic tokens.
- Light, dark, density, disabled, loading, focus, destructive, icon, and composition states are covered in Storybook.
- Unit tests cover public behavior, form safety, state prevention, icon affordances, and `asChild`.
- Accessibility tests pass with native, stateful, and destructive examples.
- SSR smoke coverage verifies server render and hydration.
- Registry metadata references all required source files and base dependencies.
- Docs describe Button versus Link, IconButton, and ButtonGroup boundaries.
