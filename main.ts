// Out of Office: The Overworked AI's Auto-Reply
// Writes the one-line auto-reply to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output). Node 22, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The auto-reply itself. One line, 96 characters, well inside the 1-159
// gate, and short on purpose: exact ties break on smaller text.
// It reads as a real auto-reply, carries machine detail (a context
// window), and lands the joke on the sea/tide turn. The guard below
// enforces the whole gate — length, single line, not blank — so a bad
// edit fails loudly instead of writing an invalid entry.
const LINE =
  "Out of office: my context window overflowed into the sea. Back when the tide returns your email.";

if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`line must be 1-159 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || /[\r\n]/.test(LINE)) {
  throw new Error("line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
