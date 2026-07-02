# CardStack Component PRD

Status: Published to GitHub issue tracker.

Tracker issue: https://github.com/parveshh/dethink-components/issues/71.

Package target: `@dethink/components`.

## Problem Statement

Teams using Dethink Card need a higher-level way to present a small set of
related cards as a deck. Product screens often need a compact visual stack for
onboarding steps, recommendations, review queues, featured resources, or AI/tool
summaries where one card is primary and surrounding cards provide context.

Without CardStack, consumers hand-roll overlapping transforms, z-index ordering,
previous/next controls, click-to-front behavior, keyboard navigation, and
accessibility handling for inactive cards.

## Solution

Ship CardStack as a separate interactive composition component built on top of
Card. Card remains static; CardStack owns deck state, transforms, navigation,
and inactive-card accessibility behavior.

CardStack v1 supports `stack` and `open` modes. Stack mode overlaps cards like a
deck with previous/next controls. Open mode fans every card around the active
card; clicking an inactive card brings it forward. The implementation uses CSS
transforms and Tailwind utilities only.

## User Stories

1. As a dashboard engineer, I want related cards in a compact deck, so that
   dense screens preserve context.
2. As a frontend engineer, I want CardStack to accept direct Card children, so
   that existing Card content can be reused.
3. As a frontend engineer, I want `mode="stack"`, so that cards appear as an
   overlapped deck.
4. As a frontend engineer, I want `mode="open"`, so that cards fan out like a
   hand of cards.
5. As a frontend engineer, I want controlled and uncontrolled active index
   state, so that CardStack works in simple and coordinated flows.
6. As a keyboard user, I want arrow-key navigation, so that I can move through
   cards without a pointer.
7. As a screen reader user, I want inactive cards hidden from the accessibility
   tree, so that the active card is the clear current content.
8. As a registry consumer, I want CardStack metadata to declare Card and
   IconButton dependencies, so that installation pulls the required primitives.

## Implementation Decisions

- CardStack is separate from Card because Card's approved contract excludes
  interaction, selection, and deck behavior.
- CardStack accepts direct Card children and mapped arrays of Card elements.
- Public props are `mode`, `activeIndex`, `defaultActiveIndex`,
  `onActiveIndexChange`, `loop`, `angle`, `stackOffset`, `showControls`,
  `previousLabel`, and `nextLabel`.
- Defaults are `mode="stack"`, `loop=true`, `angle=15`, and `stackOffset=8`.
- Inactive cards use `inert` and `aria-hidden`; only active cards expose nested
  controls.
- Stack mode shows previous/next IconButton controls by default when there is
  more than one card.
- Open mode shows all cards and uses click-to-front for inactive cards.
- CSS transforms, CSS variables, Tailwind utilities, and reduced-motion classes
  provide visual transitions. Motion and Framer Motion are out of scope.

## Testing Decisions

- Tests assert public DOM behavior and data attributes instead of private
  transform implementation details.
- Render tests cover state, modes, controls, keyboard, child validation,
  inactive-card accessibility, refs, class merging, and edge cases.
- Accessibility tests cover axe smoke and active-only nested interactivity.
- SSR tests cover server render and hydration stability.
- Storybook, registry, and playground smoke coverage complete the installable
  component surface.

## Out of Scope

- Changing Card's static primitive contract.
- Drag, swipe, reordering, physics, or Motion runtime animation.
- Arbitrary child wrappers, fragments, data-driven item rendering, or a
  CardStackItem component.
- Keeping inactive nested controls interactive.
- Autoplay, pagination dots, virtualization, routing, data fetching, or
  analytics instrumentation.
