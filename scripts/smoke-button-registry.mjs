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

assert(button.name === "button", "button registry item must be named button.");
assert(
  button.registryDependencies?.includes("dethink-base"),
  "button registry item must depend on dethink-base.",
);
assert(
  Array.isArray(button.dependencies) && button.dependencies.length === 0,
  "button registry item must not add runtime dependencies.",
);

for (const item of [base, button]) {
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

assert(styles.includes('@import "tailwindcss";'), "base styles must import Tailwind.");
assert(styles.includes("@source"), "base styles must register component sources.");
assert(styles.includes("@theme"), "base styles must define Tailwind theme tokens.");
assert(styles.includes("--color-primary"), "base styles must expose primary token.");
assert(styles.includes("--spacing-density-control"), "base styles must expose density token.");
assert(buttonSource.includes("leftIcon"), "button source must expose leftIcon.");
assert(buttonSource.includes("rightIcon"), "button source must expose rightIcon.");
assert(buttonSource.includes("asChild"), "button source must expose asChild.");
assert(buttonSource.includes("data-slot=\"button\""), "button source must expose stable slot data.");
assert(buttonSource.includes("bg-primary"), "button source must use tokenized primary utilities.");
assert(!buttonSource.includes("@radix-ui"), "button source must remain dependency-free.");

console.log("Button registry smoke passed.");
