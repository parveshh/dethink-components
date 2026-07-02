# High-Impact Component Priority Plan

Source: `react_component_library_prd.docx`, `docs/component-inventory.md`, `docs/development-path.md`, public shadcn/ui issue-demand checks, and npm last-week package demand checked on 30 June 2026.

This document is a prioritization overlay for choosing the next component PRD. It does not replace the per-component workflow: every selected component still needs local `spec.md`, `prd.md`, `issues.md`, published GitHub PRD/issues, stacked implementation branches, verification, and PRs.

## Prioritization Signals

High-impact components are the ones that score well across three signals:

1. Repeated use in SaaS dashboards, internal tools, B2B apps, and AI-native interfaces.
2. Public ecosystem demand, especially around shadcn/ui issues and common React package usage.
3. Ability to unlock later components, product blocks, examples, and registry credibility.

The strongest demand clusters are forms, selects and comboboxes, overlays, data tables, date and calendar workflows, app navigation, charts, uploads, and command/search.

## Research Takeaways

- shadcn/ui issue mentions were highest around `select`, `command`, `form`, `dialog`, `popover`, `sidebar`, `combobox`, `calendar`, `toast`, `tooltip`, `chart`, `tree`, `date picker`, and `data table`.
- npm demand supports the same categories: `recharts`, `sonner`, `react-day-picker`, `cmdk`, `vaul`, `react-resizable-panels`, `@dnd-kit/core`, `@tanstack/react-table`, `react-dropzone`, `@tiptap/react`, and `react-select` all show meaningful usage.
- The highest-value gap is not basic visual primitives alone. It is production-ready workflow primitives that teams repeatedly assemble themselves: forms, filtering, tables, date ranges, overlays, navigation shells, uploads, charts, and command/search.

## High-Impact Priority Groups

| Rank | Component group | Why it matters |
| --- | --- | --- |
| 1 | Form, Field, Label, HelpText, ErrorMessage, Input, Textarea, NumberInput | Highest daily usage; required before serious settings, CRUD, auth, and dashboard examples. |
| 2 | Select, Combobox, MultiSelect, AsyncSelect, TagInput | Critical for filters, permissions, assignees, labels, roles, AI model selection, and admin workflows. |
| 3 | Dialog, AlertDialog, Drawer, Popover, Tooltip, DropdownMenu | Unlocks command menus, row actions, edit flows, confirmations, date pickers, tooltips, and dense dashboard interactions. |
| 4 | Table, DataTable | Core internal-tool workflow; should move from semantic table to TanStack-powered sorting, filtering, pagination, selection, column visibility, row actions, loading, empty, and error states. |
| 5 | Calendar, DatePicker, DateRangePicker | Needed for filters, scheduling, billing, reports, and dashboards, even with DateTimePicker already present. |
| 6 | Toast, Alert, Callout, EmptyState, Skeleton, Spinner, Progress | Required for async UX, validation, loading states, CRUD feedback, and polished examples. |
| 7 | Sidebar, Breadcrumb, Pagination, NavigationMenu, CommandPalette | Builds the app-shell layer and directly supports dashboard/product blocks. |
| 8 | Card, Badge, Avatar, List, DataList, Stat/KPI | Low-risk, high-frequency display primitives that make examples and dashboards feel complete. |
| 9 | Chart | High value for analytics dashboards; should follow a tokenized Recharts composition model rather than over-wrapping charts. |
| 10 | FileUpload, Dropzone | Practical value for imports, attachments, profile media, onboarding, and AI/chat files; needs strong validation-boundary docs. |
| 11 | Splitter, Resizable Panels, ScrollArea | Important for dashboards, editors, side panels, AI workspaces, and admin tools. |
| 12 | RichTextEditor, TreeView, TreeSelect | Production differentiators, but they depend on stable overlays, forms, selection, keyboard, popover, command, and focus patterns. |
| 13 | AI chat primitives | Strategic track after core shell/input/display work: PromptInput, MessageList, MessageScroller, AttachmentBubble, CitationCard, ToolCallCard, ModelPicker. |
| 14 | Scheduler, Kanban, DragDrop | High demo value but heavy complexity; defer until DatePicker/Calendar, overlays, panels, and drag primitives are stable. |

## Recommended Next Development Order

Status as of 2 July 2026: the repository has Button, IconButton, Link, Typography, Box, Container, Stack, Flex, Grid, Separator, Card, CardStack, FormField, Input, Textarea, NumberInput, Checkbox, RadioGroup, Switch, Select, DateTimePicker, and Timeline. Combobox planning is underway (PRD-109). The sequence with current status:

1. Stack — done
2. Flex — done
3. Grid — done
4. Separator / Divider — done
5. Card — done
6. Form + Field primitives — done (FormField)
7. Input + Textarea + NumberInput — done
8. Checkbox + RadioGroup + Switch — done
9. Select — done
10. Combobox — in progress (PRD-109)
11. Dialog + AlertDialog
12. Popover + Tooltip + DropdownMenu
13. Table
14. DataTable
15. DatePicker + DateRangePicker
16. MultiSelect + AsyncSelect + TagInput
17. Sidebar + CommandPalette
18. Toast + feedback states
19. Chart + Stat/KPI
20. FileUpload / Dropzone

## Review Suggestions (2 July 2026)

Findings from a validation pass against the PRD (Draft v1.1, Appendix C) and the current repository state:

1. **Extract a shared overlay/positioning foundation before Dialog.** Select already carries its own portal and positioning logic, and Combobox will need the same. Before starting item 11, pull that logic into a shared floating/overlay primitive so Popover, Tooltip, DropdownMenu, Dialog, and future pickers consume one implementation instead of three diverging copies. This may justify swapping items 11 and 12, since Popover is the natural home for the extracted layer.
2. **Pull minimal feedback states ahead of DataTable.** DataTable (item 14) requires polished loading, empty, and error states. Schedule Spinner, Skeleton, and EmptyState before items 13–14 rather than waiting for the full Toast system at item 18; the full toast/notification work can stay where it is.
3. **Reuse Combobox internals for MultiSelect.** MultiSelect, AsyncSelect, and TagInput (item 16) share the option model, filtering, and listbox behavior being built for Combobox now. If overlays slip, consider advancing item 16 while the Combobox context is fresh — it is the PRD's flagship differentiator.
4. **Decompose DateTimePicker when the date suite starts.** DateTimePicker shipped before Calendar, Popover, or DatePicker existed. Item 15 should begin by extracting a shared calendar core and overlay usage from the existing DateTimePicker, not by building a parallel implementation.
5. **Missing high-frequency primitives to slot into the groups table:** Toggle/ToggleGroup (group 3 territory — toolbars, view switchers, segmented controls), Toolbar (prerequisite for DataTable filter bars and RichTextEditor), SkipLink (group 7 — required by every app shell), a shared LiveRegion/Announcer utility (needed by Toast, Combobox results, DataTable sort announcements), and Meter (group 6 — quota/capacity display distinct from Progress).
6. **Refresh the AI-chat group (rank 13) with 2026 patterns:** streaming markdown Response renderer, ReasoningDisclosure for thinking traces, ApprovalCard for human-in-the-loop tool approval, SuggestionChips, and BranchNavigator for regenerated variants. These now matter as much as the original list.
7. **Keep this document dated and statused.** The demand signals were checked 30 June 2026; re-check npm/shadcn-issue demand quarterly, and update the status annotations above as components land so this stays the operative overlay the PRD now points to.

## Operating Rules

- Use this list to choose the next PRD candidate, not to skip the workflow.
- Complex differentiators can jump ahead only as explicit PRD exceptions.
- Prefer components that unlock several product blocks before isolated, showcase-heavy widgets.
- Keep implementation slices vertical: component API, source, docs, Storybook, tests, registry metadata, and smoke verification should land together where practical.
