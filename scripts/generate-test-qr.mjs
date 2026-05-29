// Generates test QR-code images for the Vouch demo.
// Run: node scripts/generate-test-qr.mjs
//
// The codes below are the REAL seed codes, so scanning them hits live verdicts:
//   - VCH-*   -> genuine    (exists in `parts`)
//   - CLONE-* -> counterfeit (flagged by /api/verify)
//   - others  -> unknown
//
// Output: test-qr-codes/<CODE>.png (filename = the code itself, so anyone who
// blocks camera access can just type the filename into the manual-entry box)
// + an index.html contact sheet you can open and scan straight off the screen.

import QRCode from "qrcode";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "test-qr-codes");

// 23 genuine (spread across Peugeot/Citroën/Opel/Fiat), 5 counterfeit, 2 unknown.
const genuine = Array.from({ length: 23 }, (_, i) => `VCH-${String(i + 1).padStart(4, "0")}`);
const counterfeit = ["CLONE-2231", "CLONE-8841", "CLONE-0457", "CLONE-7720", "CLONE-3398"];
const unknown = ["UNREG-4821", "NOMATCH-7777"];

const all = [
  ...genuine.map((code) => ({ code, result: "genuine" })),
  ...counterfeit.map((code) => ({ code, result: "counterfeit" })),
  ...unknown.map((code) => ({ code, result: "unknown" })),
];

await mkdir(outDir, { recursive: true });

for (const { code } of all) {
  const file = join(outDir, `${code}.png`);
  await QRCode.toFile(file, code, { width: 512, margin: 2 });
}

// Contact sheet for on-screen scanning.
const cards = await Promise.all(
  all.map(async ({ code, result }) => {
    const dataUrl = await QRCode.toDataURL(code, { width: 220, margin: 2 });
    const color =
      result === "genuine" ? "#0F9D58" : result === "counterfeit" ? "#D4302F" : "#64748b";
    return `<figure>
      <img src="${dataUrl}" width="220" height="220" alt="${code}" />
      <figcaption><strong>${code}</strong><span style="color:${color}">${result}</span></figcaption>
    </figure>`;
  })
);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>Vouch — Test QR codes</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; background: #f8fafc; color: #0A1929; }
  h1 { margin-bottom: .25rem; }
  p { color: #64748b; margin-top: 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
  figure { margin: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: .5rem; padding: 1rem; text-align: center; }
  figcaption { margin-top: .5rem; display: flex; flex-direction: column; gap: .15rem; }
  figcaption span { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; }
</style></head>
<body>
  <h1>Vouch — Test QR codes</h1>
  <p>Scan any of these with the Vouch consumer scanner. Green = genuine, red = counterfeit, grey = unknown.</p>
  <div class="grid">${cards.join("\n")}</div>
</body></html>`;

await writeFile(join(outDir, "index.html"), html);

console.log(`Generated ${all.length} QR PNGs + index.html in test-qr-codes/`);
