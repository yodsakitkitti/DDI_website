# DDI Sandbox site design

## Goal

Create a responsive public landing page based on the approved Figma Make design. The page introduces DDI Sandbox and gives future visitors a clear route to group projects and Sandbox information.

## Scope

- Build a React and Vite site from the empty repository.
- Recreate the visual direction of the approved design: dark photographic hero, institutional and DDI marks, centred headline, supporting copy, and two calls to action.
- Make every business-facing value editable in one typed content module: title, highlighted title word, description, links, labels, image paths, and logo paths.
- Hide optional content when it is not published rather than showing invented data.
- Include responsive layouts, keyboard-visible focus states, and functional navigation links.

## Architecture

`src/content/siteContent.ts` is the only location editors need to change for future copy and destinations. It exports a typed site-content object consumed by presentational components. A small `isPublished` flag controls optional page blocks so later dashboard information can be prepared without appearing to visitors.

The first delivery is static: no database, authentication, admin panel, or CMS. It runs locally with `npm run dev` and produces deployable files through `npm run build`.

## Components

- `App`: assembles the page from content.
- `Hero`: renders the design's logos, eyebrow, split-colour headline, description, and actions.
- `ActionLink`: renders an accessible primary or secondary link from editable action data.
- `siteContent`: the public-content contract and initial placeholders derived from the design.

## Content behaviour

Every public string and URL is supplied by the content module. Optional content blocks with `isPublished: false` are not rendered. Calls to action remain visible as disabled “Coming soon” controls until their destination is published, preserving the approved hero layout without exposing invented information.

## Testing and verification

- Add unit tests for content visibility and action-link rendering before implementation.
- Run the full test suite and production build.
- Preview the site locally and visually compare the hero against the Figma reference at desktop and mobile widths.

## Non-goals

- No live data integration or content-management dashboard.
- No authentication or persistence.
- No publishing/deployment unless requested separately.
