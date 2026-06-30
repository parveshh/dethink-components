import { Button, DethinkProvider, IconButton, cn } from "@dethink/components";

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path
        d="M13 4.5V1.75h-2.75M3 11.5v2.75h2.75M12.15 6A4.5 4.5 0 0 0 4.2 3.7L3 5M3.85 10A4.5 4.5 0 0 0 11.8 12.3L13 11"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function App() {
  return (
    <DethinkProvider className="min-h-screen p-8" theme="light">
      <main className="mx-auto max-w-3xl space-y-4">
        <p className="text-sm font-medium text-muted-foreground">
          @dethink/components playground
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Foundation scaffold is active
        </h1>
        <p className="text-muted-foreground">
          This app verifies package imports, style imports, Tailwind tokens, the
          foundation provider, and the first Button component.
        </p>
        <div className="flex flex-wrap items-center gap-density-gap">
          <Button>Primary action</Button>
          <Button variant="outline">Secondary action</Button>
          <Button variant="ghost">Quiet action</Button>
          <Button loading>Saving</Button>
          <Button asChild rightIcon={<ArrowRightIcon />}>
            <a href="#smoke-input">Jump to input</a>
          </Button>
          <IconButton aria-label="Refresh playground" variant="outline">
            <RefreshIcon />
          </IconButton>
        </div>
        <div
          className={cn(
            "rounded-lg border border-border bg-muted p-4 text-foreground",
            "focus-within:ring-2 focus-within:ring-ring",
          )}
        >
          <label className="block text-sm font-medium" htmlFor="smoke-input">
            Smoke input
          </label>
          <input
            id="smoke-input"
            className="mt-2 h-density-control rounded-md border border-input bg-background px-3"
            placeholder="Token-backed field"
          />
        </div>
      </main>
    </DethinkProvider>
  );
}
