# Test QR codes

Demo QR images for the Vouch consumer scanner. Point the camera at any of these
(or open `index.html` to scan them off-screen).

**Each file is named after the code it contains** — e.g. `VCH-0001.png` encodes
`VCH-0001`. If you don't want to grant camera access, just read the filename and
type it into the manual-entry box on `/consumer/scan`.

| Filename pattern | Files | Result when scanned | Why |
|------------------|-------|---------------------|-----|
| `VCH-*.png`      | 23    | **genuine**         | Exist in the `parts` table |
| `CLONE-*.png`    | 5     | **counterfeit**     | Flagged as known fakes by `/api/verify` |
| `NOMATCH-*` / `UNREG-*` | 2 | **unknown**      | Not in the system |

- Best demo path: scan/type a `VCH-*` (genuine, shows part provenance), then a
  `CLONE-*` (counterfeit → "Report this seller").
- No camera? Read the filename and type it into the manual-entry box, or use the
  codes directly: e.g. `VCH-0001`, `CLONE-2231`, `NOMATCH-7777`.

Regenerate with: `node scripts/generate-test-qr.mjs`
