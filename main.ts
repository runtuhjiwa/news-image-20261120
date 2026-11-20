// news-image-20261120 — "Sum up 20 November's world news in one image".
// The entry image (entry.png, beside this file) sums up Friday 20 November
// 2026: the Shenzhen summit of Trump, Xi and Putin; the ICJ's genocide
// ruling against Myanmar; the Houthi missile strike on Riyadh's PIF tower;
// Anthropic's Nasdaq debut amid a market sell-off; and the GTA 6 launch.
// This program copies that image to /output/entry.png. It needs no network
// and is deterministic: every run writes the exact same bytes.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const source = new URL("./entry.png", import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Validate the output is a real PNG: the first 8 bytes must be the PNG
// magic bytes 89 50 4E 47 0D 0A 1A 0A. If the copy were truncated or the
// source were not a PNG, fail loudly instead of handing the grader a
// broken image.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const header = readFileSync(target).subarray(0, 8);
if (!header.equals(PNG_MAGIC)) {
  throw new Error(`output ${target} is not a valid PNG (bad magic bytes)`);
}

const bytes = statSync(target).size;
console.log(`wrote ${target} (${bytes} bytes, valid PNG)`);
