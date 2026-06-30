import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DethinkProvider } from "../../foundation/dethink-provider";
import { Timeline, type TimelineItemData } from ".";

const eventItems: TimelineItemData[] = [
  {
    id: "release",
    title: "Launch",
    description: "Production release is complete.",
    datetime: "2026-03-01T09:00:00Z",
    dateLabel: "Mar 1, 2026",
    status: "complete",
  },
  {
    id: "kickoff",
    title: "Kickoff",
    description: "Project work starts.",
    datetime: "2026-01-01T09:00:00Z",
    dateLabel: "Jan 1, 2026",
    status: "current",
    image: {
      src: "https://example.com/kickoff.jpg",
      alt: "Team kickoff board",
      width: 640,
      height: 360,
    },
  },
  {
    id: "beta",
    title: "Beta",
    description: "Invite design partners.",
    datetime: "2026-02-01T09:00:00Z",
    dateLabel: "Feb 1, 2026",
    status: "warning",
  },
];

describe("Timeline", () => {
  it("renders semantic event content in chronological order", () => {
    render(<Timeline items={eventItems} viewport={{ controls: false }} />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    expect(items).toHaveLength(3);
    expect(screen.getAllByRole("heading", { level: 3 }).map((item) => item.textContent)).toEqual([
      "Kickoff",
      "Beta",
      "Launch",
    ]);
    expect(screen.getByText("Project work starts.")).toBeInTheDocument();
    expect(screen.getByAltText("Team kickoff board")).toHaveAttribute(
      "loading",
      "lazy",
    );
    expect(screen.getByText("Jan 1, 2026").closest("time")).toHaveAttribute(
      "datetime",
      "2026-01-01T09:00:00Z",
    );
    expect(screen.getByRole("button", { name: "Kickoff" })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("supports progress timelines without dates", () => {
    render(
      <Timeline
        data-testid="timeline-root"
        mode="progress"
        scale="auto"
        viewport={{ controls: false }}
        items={[
          { id: "todo", title: "Queued", status: "upcoming" },
          { id: "active", title: "Building", status: "current" },
          { id: "done", title: "Verified", status: "complete" },
        ]}
      />,
    );

    expect(screen.getByText("Queued")).toBeInTheDocument();
    expect(screen.queryByText("Queued")?.closest("time")).toBeNull();
    expect(screen.getByTestId("timeline-root")).toHaveAttribute(
      "data-scale",
      "sequence",
    );
  });

  it("supports layout, orientation, custom markers, and custom item rendering", () => {
    render(
      <Timeline
        data-testid="timeline-root"
        items={eventItems}
        orientation="vertical"
        layout="alternating"
        viewport={{ controls: false }}
        renderItem={(item) => (
          <div>
            <strong>{item.title}</strong>
            <span> custom content</span>
          </div>
        )}
      />,
    );

    expect(screen.getByTestId("timeline-root")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
    expect(screen.getByTestId("timeline-root")).toHaveAttribute(
      "data-layout",
      "alternating",
    );
    expect(screen.getByText("Kickoff")).toBeInTheDocument();
    expect(screen.getAllByText("custom content")).toHaveLength(3);
  });

  it("passes typed payload data to custom renderers", () => {
    type DeploymentPayload = {
      service: string;
      environment: "staging" | "production";
      version: string;
    };

    const deploymentItems: TimelineItemData<DeploymentPayload>[] = [
      {
        id: "api-deploy",
        datetime: "2026-04-01T12:00:00Z",
        dateLabel: "Apr 1, 2026",
        status: "current",
        data: {
          service: "Billing API",
          environment: "production",
          version: "v2.4.0",
        },
      },
    ];

    render(
      <Timeline<DeploymentPayload>
        items={deploymentItems}
        viewport={{ controls: false }}
        renderItem={(item) => (
          <div>
            <h3>{item.data?.service}</h3>
            <p>
              {item.data?.environment} - {item.data?.version}
            </p>
          </div>
        )}
      />,
    );

    expect(screen.getByText("Billing API")).toBeInTheDocument();
    expect(screen.getByText("production - v2.4.0")).toBeInTheDocument();
  });

  it("falls back to the item id when default rendering has no title", () => {
    render(
      <Timeline
        items={[{ id: "payload-only", data: { kind: "deployment" } }]}
        viewport={{ controls: false }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "payload-only" }),
    ).toBeInTheDocument();
  });

  it("supports optional viewport chrome and controls visibility", () => {
    render(
      <Timeline
        items={eventItems}
        viewport={{ chrome: "panel", controlsVisibility: "always" }}
      />,
    );

    expect(screen.getByRole("region", { name: "Timeline viewport" })).toHaveAttribute(
      "data-chrome",
      "panel",
    );
    expect(
      document.querySelector('[data-slot="timeline-controls"]'),
    ).toHaveAttribute("data-visibility", "always");
  });

  it("uses timeline contrast tokens for rail and card borders", () => {
    render(
      <DethinkProvider theme="dark">
        <Timeline items={eventItems} viewport={{ controls: false }} />
      </DethinkProvider>,
    );

    expect(document.querySelector('[data-slot="timeline-rail"]')).toHaveClass(
      "bg-timeline-rail",
    );
    expect(document.querySelector('[data-slot="timeline-card"]')).toHaveClass(
      "border-timeline-border",
    );
  });

  it("reveals viewport controls on hover", () => {
    render(<Timeline items={eventItems} />);

    const viewport = screen.getByRole("region", { name: "Timeline viewport" });
    const controls = document.querySelector('[data-slot="timeline-controls"]');

    expect(controls).toHaveAttribute("data-visible", "false");

    fireEvent.mouseEnter(viewport);

    expect(controls).toHaveAttribute("data-visible", "true");

    fireEvent.mouseLeave(viewport);

    expect(controls).toHaveAttribute("data-visible", "false");
  });

  it("handles uncontrolled pointer and keyboard selection", async () => {
    const user = userEvent.setup();

    render(<Timeline items={eventItems} viewport={{ controls: false }} />);

    await user.click(screen.getByRole("button", { name: "Beta" }));

    expect(screen.getByRole("button", { name: "Beta" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    const viewport = screen.getByRole("region", { name: "Timeline viewport" });
    viewport.focus();

    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Launch" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.keyboard("{Home}");

    expect(screen.getByRole("button", { name: "Kickoff" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("handles controlled selection and skips disabled items", async () => {
    const user = userEvent.setup();
    const onSelectedIdChange = vi.fn();

    render(
      <Timeline
        selectedId="kickoff"
        onSelectedIdChange={onSelectedIdChange}
        viewport={{ controls: false }}
        items={[
          { id: "kickoff", title: "Kickoff" },
          { id: "blocked", title: "Blocked", disabled: true },
          { id: "launch", title: "Launch" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Launch" }));

    expect(onSelectedIdChange).toHaveBeenCalledWith("launch");
    expect(screen.queryByRole("button", { name: "Blocked" })).toBeNull();

    const viewport = screen.getByRole("region", { name: "Timeline viewport" });
    viewport.focus();
    await user.keyboard("{ArrowRight}");

    expect(onSelectedIdChange).toHaveBeenLastCalledWith("launch");
  });

  it("zooms, resets, fits, and pans the viewport", async () => {
    const user = userEvent.setup();

    render(<Timeline items={eventItems} />);

    const viewport = screen.getByRole("region", { name: "Timeline viewport" });
    const content = document.querySelector(
      '[data-slot="timeline-viewport-content"]',
    ) as HTMLElement;

    await user.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(content.getAttribute("style")).toContain(
      "--timeline-transform: translate3d(0px, 0px, 0) scale(1.2)",
    );

    await user.click(screen.getByRole("button", { name: "Reset timeline view" }));
    expect(content.getAttribute("style")).toContain(
      "--timeline-transform: translate3d(0px, 0px, 0) scale(1)",
    );

    await user.click(screen.getByRole("button", { name: "Fit timeline" }));
    expect(content).toHaveAttribute("data-slot", "timeline-viewport-content");

    fireEvent.pointerDown(viewport, {
      button: 0,
      clientX: 10,
      clientY: 20,
      pointerId: 1,
    });
    fireEvent.pointerMove(viewport, {
      clientX: 30,
      clientY: 45,
      pointerId: 1,
    });
    fireEvent.pointerUp(viewport, { pointerId: 1 });

    expect(content.getAttribute("style")).toContain("translate3d(20px, 25px, 0)");
  });

  it("requires the configured modifier for wheel zoom by default", () => {
    render(<Timeline items={eventItems} viewport={{ controls: false }} />);

    const viewport = screen.getByRole("region", { name: "Timeline viewport" });
    const content = document.querySelector(
      '[data-slot="timeline-viewport-content"]',
    ) as HTMLElement;

    fireEvent.wheel(viewport, { deltaY: -100, clientX: 10, clientY: 10 });

    expect(content.getAttribute("style")).toContain(
      "--timeline-transform: translate3d(0px, 0px, 0) scale(1)",
    );

    fireEvent.wheel(viewport, {
      deltaY: -100,
      clientX: 10,
      clientY: 10,
      ctrlKey: true,
    });

    expect(content.getAttribute("style")).toContain("scale(1.15)");
  });
});
