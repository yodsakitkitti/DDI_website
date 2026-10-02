# DDI Sandbox redesign QA

Verified on 3 October 2026.

## Content

- Ten venture profiles: the existing six plus PACE, Creator House, YOS, and MEGURI.
- Supplied logo files copied unchanged. YOS uses the supplied CTRL + A artwork.
- MEGURI includes English and Thai descriptions from the supplied ZIP and its team photo.
- Original Assumption University and DDI marks remain in the About section.

## Interaction and accessibility

- Four-venture spotlight selector and next button, with direct profile links.
- Search across names, categories, English descriptions, and supplied Thai descriptions.
- Category filters, saved favorites persisted in local browser storage, grid/list layouts, and random discovery.
- Empty-state reset and a status message when browser storage cannot persist favorites.
- Modal keyboard focus containment, Escape dismissal, background inertness, scroll lock, and focus restoration.
- Browser Back and profile deep links covered by regression tests.
- Reduced-motion preferences disable decorative animation and smooth scrolling.
- Main and secondary text colors meet WCAG AA contrast against the page background.

## Verification

- Production build: `npm run build`.
- Automated suite: `npm test -- --run` (26 tests).
- Real browser inspection of desktop and 390 px / 320 px mobile layouts.
- Verified spotlight selection, saved-favorite persistence after reload, list layout, search, profile dismissal, and MEGURI image loading.
- Corrected decorative horizontal overflow and the narrow-screen minimum body width.

## Preview and deployment

Run `npm run dev -- --host 127.0.0.1` for the local preview. The production output is generated in `dist/`. This task updates the local project; it does not publish a remote deployment.

Fonts use Google Fonts with local sans-serif fallbacks. Supplied artwork is preserved and displayed with CSS containment; team images are not generated or retouched.

## Original visuals restored

The university crest and original DDI logo now appear prominently in the shared header. The original campus/DDI image is restored as the opening section background with a light overlay for readability. Verified logo loading and the 390 px mobile layout; the existing interactive features remain in place.
