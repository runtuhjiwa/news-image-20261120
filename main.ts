// news-image-20261120 — "Sum up 20 November's world news in one image".
// The entry image (entry.png, beside this file) sums up Friday 20 November
// 2026: the Shenzhen summit of Trump, Xi and Putin; the ICJ's genocide
// ruling against Myanmar; the Houthi missile strike on Riyadh's PIF tower;
// Anthropic's Nasdaq debut amid a market sell-off; and the GTA 6 launch.
// This program copies that image to /output/entry.png. It needs no network
// and is deterministic: every run writes the exact same bytes.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const source = new URL("./entry.png", import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const bytes = statSync(target).size;
console.log(`wrote ${target} (${bytes} bytes)`);
