// The listing action renders `Website/app.js` as a Scriban template, so the raw
// template must never end up in the bundle. It is copied next to the build
// output instead, where the workflow publishes it.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const target = join(root, "dist", "app.js");

mkdirSync(dirname(target), { recursive: true });
copyFileSync(join(root, "templates", "app.js"), target);

console.log(`copied templates/app.js -> ${target}`);
