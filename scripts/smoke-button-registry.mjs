import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const registryRoot = join(root, "registry/items");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function assertFileExists(path) {
  await access(path);
}

const base = await readJson(join(registryRoot, "base.json"));
const button = await readJson(join(registryRoot, "button.json"));
const dateTimePicker = await readJson(join(registryRoot, "date-time-picker.json"));
const timeline = await readJson(join(registryRoot, "timeline.json"));

assert(button.name === "button", "button registry item must be named button.");
assert(
  dateTimePicker.name === "date-time-picker",
  "date-time-picker registry item must be named date-time-picker.",
);
assert(timeline.name === "timeline", "timeline registry item must be named timeline.");
assert(
  button.registryDependencies?.includes("dethink-base"),
  "button registry item must depend on dethink-base.",
);
assert(
  dateTimePicker.registryDependencies?.includes("dethink-base"),
  "date-time-picker registry item must depend on dethink-base.",
);
assert(
  timeline.registryDependencies?.includes("dethink-base"),
  "timeline registry item must depend on dethink-base.",
);
assert(
  Array.isArray(button.dependencies) && button.dependencies.length === 0,
  "button registry item must not add runtime dependencies.",
);
assert(
  Array.isArray(timeline.dependencies) && timeline.dependencies.length === 0,
  "timeline registry item must not add runtime dependencies.",
);
assert(
  dateTimePicker.dependencies?.includes("@internationalized/date"),
  "date-time-picker registry item must include @internationalized/date.",
);
assert(
  dateTimePicker.dependencies?.includes("react-aria-components"),
  "date-time-picker registry item must include react-aria-components.",
);

for (const item of [base, button, dateTimePicker, timeline]) {
  for (const file of item.files ?? []) {
    await assertFileExists(join(root, file.path));
  }
}

const stylePath = base.files.find((file) => file.type === "registry:style")?.path;
assert(stylePath, "base registry item must include a registry:style file.");

const styles = await readFile(join(root, stylePath), "utf8");
const buttonSource = await readFile(
  join(root, "packages/components/src/components/button/button.tsx"),
  "utf8",
);
const timelineSource = await readFile(
  join(root, "packages/components/src/components/timeline/timeline.tsx"),
  "utf8",
);
const dateTimePickerSource = await readFile(
  join(root, "packages/components/src/components/date-time-picker/date-time-picker.tsx"),
  "utf8",
);

assert(styles.includes('@import "tailwindcss";'), "base styles must import Tailwind.");
assert(styles.includes("@source"), "base styles must register component sources.");
assert(styles.includes("@theme"), "base styles must define Tailwind theme tokens.");
assert(styles.includes("--color-primary"), "base styles must expose primary token.");
assert(styles.includes("--spacing-density-control"), "base styles must expose density token.");
assert(
  styles.includes("--color-timeline-border"),
  "base styles must expose timeline border token.",
);
assert(
  styles.includes("--color-timeline-rail"),
  "base styles must expose timeline rail token.",
);
assert(buttonSource.includes("leftIcon"), "button source must expose leftIcon.");
assert(buttonSource.includes("rightIcon"), "button source must expose rightIcon.");
assert(buttonSource.includes("asChild"), "button source must expose asChild.");
assert(buttonSource.includes("data-slot=\"button\""), "button source must expose stable slot data.");
assert(buttonSource.includes("bg-primary"), "button source must use tokenized primary utilities.");
assert(!buttonSource.includes("@radix-ui"), "button source must remain dependency-free.");
assert(timelineSource.includes("data-slot=\"timeline\""), "timeline source must expose stable root slot data.");
assert(timelineSource.includes("data-slot=\"timeline-viewport\""), "timeline source must expose viewport slot data.");
assert(timelineSource.includes("<ol"), "timeline source must render an ordered list.");
assert(timelineSource.includes("<time"), "timeline source must render machine-readable time elements.");
assert(timelineSource.includes("bg-primary"), "timeline source must use tokenized primary utilities.");
assert(timelineSource.includes("bg-success"), "timeline source must use tokenized success utilities.");
assert(
  timelineSource.includes("border-timeline-border"),
  "timeline source must use timeline border token utilities.",
);
assert(
  timelineSource.includes("bg-timeline-rail"),
  "timeline source must use timeline rail token utilities.",
);
assert(!timelineSource.includes("@radix-ui"), "timeline source must remain dependency-free.");
assert(
  dateTimePickerSource.includes("react-aria-components"),
  "date-time-picker source must use React Aria Components.",
);
assert(
  dateTimePickerSource.includes('data-slot="date-time-picker"'),
  "date-time-picker source must expose a stable root slot.",
);
assert(
  dateTimePickerSource.includes('data-slot="date-time-picker-field"'),
  "date-time-picker source must expose a stable field slot.",
);
assert(
  dateTimePickerSource.includes('data-slot="date-time-picker-calendar"'),
  "date-time-picker source must expose a stable calendar slot.",
);
assert(
  dateTimePickerSource.includes("border-input"),
  "date-time-picker source must use tokenized input border utilities.",
);
assert(
  dateTimePickerSource.includes("focus-visible:ring-2"),
  "date-time-picker source must include visible focus styling.",
);
assert(!dateTimePickerSource.includes("@radix-ui"), "date-time-picker source must not use Radix.");

console.log("Registry smoke passed.");
