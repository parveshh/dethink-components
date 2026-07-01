# Registry

This folder contains shadcn-compatible registry metadata and generated payloads.

Current status:

- `items/base.json` defines the shared Tailwind, provider, and utility base payload.
- Component registry metadata exists for Button, IconButton, Link, Typography, Box, Stack, DateTimePicker, and Timeline.
- `pnpm registry:validate` checks registry item shape.
- `pnpm registry:smoke` checks dependency metadata, declared files, and key source invariants.
