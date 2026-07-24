# DDI Sandbox Dashboard design

## Goal

Add a working `/dashboard` route that follows the supplied Figma dashboard screen and presents one representative mock project until real group information is available.

## Scope

- Enable the existing **View Group Projects** hero action and route it to `/dashboard`.
- Add a dashboard with the Figma screen's red application header, academic-year context, summary cards, project search/filter controls, and card grid.
- Render exactly one editable mock project for the initial release.
- Keep all mock dashboard values in the existing content module so real information can replace them without changing the UI structure.
- Make search and status filters work against the mock-project collection.
- Make the example project's **View Demo** action open a small in-app detail panel; it must not claim to open a real external demo.

## Architecture

The app uses browser path state for two screens: `/` for the existing hero and `/dashboard` for the project dashboard. `siteContent.ts` gains typed dashboard content and a single `projects` collection. The dashboard derives its summary values, statuses, category options, and visible cards from that collection rather than duplicating fixed numbers in components.

## Components

- `App`: selects the hero or dashboard from `window.location.pathname` and links the screens.
- `Dashboard`: owns search, status, category, and selected-project UI state.
- `DashboardSummary`: renders calculated group, complete, in-progress, and average-progress values.
- `ProjectCard`: renders an individual project and emits a detail request.
- `ProjectDetail`: renders the selected project's mock detail panel.
- `siteContent`: owns the editable project schema and the initial representative project record.

## Mock project

The initial project is **Smart Campus Navigator** (Group 1): an AI-powered indoor-navigation concept. It is marked completed at 100%, with an editable member count, date, category, description, and technology list. It is deliberately labelled as an example project in the detail panel.

## Behaviour

- The primary hero action becomes an enabled internal link to `/dashboard`.
- Search matches a project's name, description, member names, and category without case sensitivity.
- Status and category controls narrow the visible collection; a no-results state explains that no mock projects match.
- The dashboard Home link returns to `/`.
- The detail panel can be opened and closed with mouse or keyboard.

## Testing

- Tests verify the primary action links to `/dashboard`.
- Tests verify dashboard summary values are derived from the supplied project record.
- Tests verify search/filter behaviour and the no-results state.
- Tests verify opening and closing the mock-project detail panel.
- Run the full test suite and production build before handoff.

## Non-goals

- No backend, persistence, authentication, CMS, or real project data.
- No separate real-demo URL or external navigation.
- No implementation of all ten Figma project cards until the real collection is available.
