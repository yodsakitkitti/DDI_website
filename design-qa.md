# DDI Sandbox design QA

## Current verification status

The supplied visual assets are integrated and served correctly. Automated and
static responsive checks are complete. Live browser comparison is blocked
because this Codex session has no available browser backend.

## Verified

- The page content contract references `/images/ddi-sandbox-hero.png`.
- The university, DDI, and hero assets all return HTTP 200 from the specified
  Vite development server with `Content-Type: image/png`.
- Served byte lengths match the supplied originals:
  - university mark: 134,239 bytes;
  - DDI mark: 46,359 bytes;
  - hero: 133,341 bytes.
- The hero image uses `background-size: cover` and centered positioning.
- The dark `hero::before` gradient overlay remains above the background and
  behind the content.
- Both brand images have explicit responsive width and height values, with
  `object-fit: contain`.
- The headline remains content-driven and has the required split white/red
  treatment.
- Component tests verify that both unpublished actions are rendered as native
  disabled buttons with accessible “Coming soon” names.
- The stylesheet retains a visible three-pixel `:focus-visible` outline for
  enabled actions and disables motion when reduced motion is requested.
- The mobile breakpoint at 639px reduces brand padding and stacks both actions
  at full width.

## Browser checks not completed

The approved browser workflow returned `No browser is available` when opening
`http://127.0.0.1:4173/`. Therefore the following checks could not be observed
interactively:

- desktop comparison against the Figma Make reference;
- mobile viewport comparison;
- rendered crop and contrast assessment;
- live Tab-key focus traversal.

No alternate screenshot or browser automation path was used.

## Material differences and concerns

- No P0-P2 issue was identified by automated or static inspection.
- Pixel parity with the Figma reference is unconfirmed.
- The supplied logo PNGs include their original white canvas. Their bytes were
  preserved exactly as required; removing the canvas would alter the source
  assets.
- The supplied hero is 480×238. `background-size: cover` will upscale it on
  common desktop displays, so sharpness and crop should be checked when a
  browser becomes available.
