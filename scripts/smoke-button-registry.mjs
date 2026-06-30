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
const box = await readJson(join(registryRoot, "box.json"));
const button = await readJson(join(registryRoot, "button.json"));
const container = await readJson(join(registryRoot, "container.json"));
const iconButton = await readJson(join(registryRoot, "icon-button.json"));
const link = await readJson(join(registryRoot, "link.json"));
const typography = await readJson(join(registryRoot, "typography.json"));
const dateTimePicker = await readJson(join(registryRoot, "date-time-picker.json"));
const timeline = await readJson(join(registryRoot, "timeline.json"));

assert(box.name === "box", "box registry item must be named box.");
assert(button.name === "button", "button registry item must be named button.");
assert(container.name === "container", "container registry item must be named container.");
assert(iconButton.name === "icon-button", "icon-button registry item must be named icon-button.");
assert(link.name === "link", "link registry item must be named link.");
assert(typography.name === "typography", "typography registry item must be named typography.");
assert(
  dateTimePicker.name === "date-time-picker",
  "date-time-picker registry item must be named date-time-picker.",
);
assert(timeline.name === "timeline", "timeline registry item must be named timeline.");
assert(
  box.registryDependencies?.includes("dethink-base"),
  "box registry item must depend on dethink-base.",
);
assert(
  button.registryDependencies?.includes("dethink-base"),
  "button registry item must depend on dethink-base.",
);
assert(
  container.registryDependencies?.includes("dethink-base"),
  "container registry item must depend on dethink-base.",
);
assert(
  iconButton.registryDependencies?.includes("dethink-base"),
  "icon-button registry item must depend on dethink-base.",
);
assert(
  iconButton.registryDependencies?.includes("button"),
  "icon-button registry item must depend on button for shared variant types.",
);
assert(
  link.registryDependencies?.includes("dethink-base"),
  "link registry item must depend on dethink-base.",
);
assert(
  typography.registryDependencies?.includes("dethink-base"),
  "typography registry item must depend on dethink-base.",
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
  Array.isArray(box.dependencies) && box.dependencies.length === 0,
  "box registry item must not add runtime dependencies.",
);
assert(
  Array.isArray(button.dependencies) && button.dependencies.length === 0,
  "button registry item must not add runtime dependencies.",
);
assert(
  Array.isArray(container.dependencies) && container.dependencies.length === 0,
  "container registry item must not add runtime dependencies.",
);
assert(
  Array.isArray(iconButton.dependencies) && iconButton.dependencies.length === 0,
  "icon-button registry item must not add runtime dependencies.",
);
assert(
  Array.isArray(link.dependencies) && link.dependencies.length === 0,
  "link registry item must not add runtime dependencies.",
);
assert(
  Array.isArray(typography.dependencies) && typography.dependencies.length === 0,
  "typography registry item must not add runtime dependencies.",
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

for (const item of [
  base,
  box,
  button,
  container,
  iconButton,
  link,
  typography,
  dateTimePicker,
  timeline,
]) {
  for (const file of item.files ?? []) {
    await assertFileExists(join(root, file.path));
  }
}

const stylePath = base.files.find((file) => file.type === "registry:style")?.path;
assert(stylePath, "base registry item must include a registry:style file.");

const styles = await readFile(join(root, stylePath), "utf8");
const boxSource = await readFile(
  join(root, "packages/components/src/components/box/box.tsx"),
  "utf8",
);
const buttonSource = await readFile(
  join(root, "packages/components/src/components/button/button.tsx"),
  "utf8",
);
const containerSource = await readFile(
  join(root, "packages/components/src/components/container/container.tsx"),
  "utf8",
);
const iconButtonSource = await readFile(
  join(root, "packages/components/src/components/icon-button/icon-button.tsx"),
  "utf8",
);
const linkSource = await readFile(
  join(root, "packages/components/src/components/link/link.tsx"),
  "utf8",
);
const typographySource = await readFile(
  join(root, "packages/components/src/components/typography/typography.tsx"),
  "utf8",
);
const dateTimePickerSource = await readFile(
  join(root, "packages/components/src/components/date-time-picker/date-time-picker.tsx"),
  "utf8",
);
const timelineSource = await readFile(
  join(root, "packages/components/src/components/timeline/timeline.tsx"),
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
assert(boxSource.includes('"data-slot": "box"'), "box source must expose stable slot data.");
assert(boxSource.includes("asChild"), "box source must expose child composition.");
assert(boxSource.includes("boxClassNames"), "box source must expose class-name composition.");
assert(boxSource.includes("ps-4"), "box source must use logical start spacing utilities.");
assert(boxSource.includes("me-4"), "box source must use logical end margin utilities.");
assert(boxSource.includes("bg-primary"), "box source must use tokenized primary surface utilities.");
assert(boxSource.includes("border-input"), "box source must use tokenized input border utilities.");
assert(boxSource.includes("rounded-md"), "box source must use tokenized radius utilities.");
assert(boxSource.includes("overflow-clip"), "box source must expose overflow clip utilities.");
assert(!boxSource.includes("@radix-ui"), "box source must remain dependency-free.");
assert(buttonSource.includes("leftIcon"), "button source must expose leftIcon.");
assert(buttonSource.includes("rightIcon"), "button source must expose rightIcon.");
assert(buttonSource.includes("asChild"), "button source must expose asChild.");
assert(buttonSource.includes("data-slot=\"button\""), "button source must expose stable slot data.");
assert(buttonSource.includes("bg-primary"), "button source must use tokenized primary utilities.");
assert(!buttonSource.includes("@radix-ui"), "button source must remain dependency-free.");
assert(
  containerSource.includes('"data-slot": "container"'),
  "container source must expose stable slot data.",
);
assert(containerSource.includes("asChild"), "container source must expose child composition.");
assert(
  containerSource.includes("containerClassNames"),
  "container source must expose class-name composition.",
);
assert(
  containerSource.includes("max-w-[80rem]"),
  "container source must use static max-width utilities.",
);
assert(containerSource.includes("px-4"), "container source must use static gutter utilities.");
assert(
  containerSource.includes("safe-area-inset-left"),
  "container source must support safe-area gutters.",
);
assert(containerSource.includes("mx-auto"), "container source must default to centered layout.");
assert(containerSource.includes("me-auto"), "container source must support logical start alignment.");
assert(containerSource.includes("ms-auto"), "container source must support logical end alignment.");
assert(!containerSource.includes("@radix-ui"), "container source must remain dependency-free.");
assert(
  iconButtonSource.includes("IconButtonAccessibleName"),
  "icon-button source must expose accessible-name typing.",
);
assert(
  iconButtonSource.includes("data-slot=\"icon-button\""),
  "icon-button source must expose stable root slot data.",
);
assert(
  iconButtonSource.includes("data-slot=\"icon-button-icon\""),
  "icon-button source must expose stable icon slot data.",
);
assert(
  iconButtonSource.includes("aria-busy"),
  "icon-button source must expose loading busy state.",
);
assert(iconButtonSource.includes("bg-primary"), "icon-button source must use tokenized primary utilities.");
assert(!iconButtonSource.includes("@radix-ui"), "icon-button source must remain dependency-free.");
assert(linkSource.includes("data-slot=\"link\""), "link source must expose stable slot data.");
assert(linkSource.includes("aria-current"), "link source must preserve aria-current state.");
assert(linkSource.includes("noopener"), "link source must add new-tab noopener safety.");
assert(linkSource.includes("asChild"), "link source must expose router composition.");
assert(linkSource.includes("text-primary"), "link source must use tokenized primary utilities.");
assert(!linkSource.includes("@radix-ui"), "link source must remain dependency-free.");
assert(
  typographySource.includes('"data-slot": "typography"'),
  "typography source must expose stable typography slot data.",
);
assert(
  typographySource.includes('"data-slot": "heading"'),
  "typography source must expose stable heading slot data.",
);
assert(
  typographySource.includes('"data-slot": "text"'),
  "typography source must expose stable text slot data.",
);
assert(
  typographySource.includes("headingElements"),
  "typography source must render native heading elements by level.",
);
assert(typographySource.includes("text-primary"), "typography source must use tokenized primary utilities.");
assert(typographySource.includes("text-start"), "typography source must use logical alignment utilities.");
assert(typographySource.includes("line-clamp-3"), "typography source must support line clamp utilities.");
assert(!typographySource.includes("@radix-ui"), "typography source must remain dependency-free.");
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

console.log("Registry smoke passed.");
