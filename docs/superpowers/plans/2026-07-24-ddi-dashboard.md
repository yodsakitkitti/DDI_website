# DDI Sandbox Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Figma-style `/dashboard` page with one editable mock project and a working link from the landing hero.

**Architecture:** Extend the typed content module with dashboard labels and a single-project collection. `App` selects the hero or dashboard using `window.location.pathname`; pure helpers derive summary counts and filter the collection; dashboard components own only search/filter/detail-panel state.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, CSS.

## Global Constraints

- Use `src/content/siteContent.ts` as the single editable source for public and mock-project information.
- The initial collection contains exactly one example project, **Smart Campus Navigator** (Group 1), and must not claim to be real published group data.
- The landing-page **View Group Projects** action links internally to `/dashboard`.
- The dashboard follows the supplied Figma visual direction: red header, light workspace, summary cards, search/filter toolbar, and project cards.
- No backend, persistence, authentication, CMS, or external demo URL.
- Tests are written first; each task is committed after tests pass.

---

## File structure

- `src/content/siteContent.ts`: dashboard schema, mock project, summary, and pure filter helpers.
- `src/content/siteContent.test.ts`: helper and supplied-data tests.
- `src/App.tsx`: route selection and hero/dashboard composition.
- `src/App.test.tsx`: route/link integration tests.
- `src/components/Dashboard.tsx`: dashboard filter/detail state and screen layout.
- `src/components/Dashboard.test.tsx`: dashboard interaction tests.
- `src/components/ProjectCard.tsx`: individual project summary card.
- `src/components/ProjectDetail.tsx`: accessible example-project panel.
- `src/styles.css`: dashboard visual styles and mobile breakpoints.

### Task 1: Add editable dashboard data and landing-to-dashboard navigation

**Files:**
- Modify: `src/content/siteContent.ts`
- Modify: `src/content/siteContent.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Create: `src/components/Dashboard.tsx`

**Interfaces:**
- Consumes: existing `SiteAction`, `SiteContent`, `Hero`, and `siteContent` exports.
- Produces: `ProjectStatus`, `Project`, `dashboardContent`, `projects`, `getDashboardSummary(projects)`, `filterProjects(projects, query, status, category)`, and a `/dashboard` application route.

- [ ] **Step 1: Write failing content-helper and route tests**

```ts
import { filterProjects, getDashboardSummary, projects } from './siteContent';

test('derives dashboard totals from the example project', () => {
  expect(getDashboardSummary(projects)).toEqual({ total: 1, completed: 1, inProgress: 0, averageProgress: 100 });
});

test('filters projects by case-insensitive project search', () => {
  expect(filterProjects(projects, 'campus', 'All', 'All Categories')).toEqual(projects);
  expect(filterProjects(projects, 'missing', 'All', 'All Categories')).toEqual([]);
});
```

```tsx
test('links the primary hero action to the dashboard', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.getByRole('link', { name: /view group projects/i })).toHaveAttribute('href', '/dashboard');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm.cmd run test -- --run src/content/siteContent.test.ts src/App.test.tsx`

Expected: FAIL because the helper exports do not exist and the hero action is disabled.

- [ ] **Step 3: Implement typed mock data and route selection**

Add this contract to `src/content/siteContent.ts`:

```ts
export type ProjectStatus = 'Completed' | 'In Progress' | 'Review' | 'Planning';
export interface Project {
  id: string; groupLabel: string; name: string; status: ProjectStatus; progress: number;
  description: string; members: string[]; dueDate: string; category: string; technologies: string[];
}
export const projects: Project[] = [{
  id: 'smart-campus-navigator', groupLabel: 'Group 1', name: 'Smart Campus Navigator', status: 'Completed', progress: 100,
  description: 'An AI-powered indoor navigation concept for university campuses using BLE beacons and mobile wayfinding.',
  members: ['Ava Chen', 'Narin S.', 'Ploy K.', 'Thanawat R.'], dueDate: 'Jun 10, 2026', category: 'IoT',
  technologies: ['React Native', 'Python', 'TensorFlow', 'Arduino'],
}];
export const getDashboardSummary = (items: Project[]) => ({
  total: items.length,
  completed: items.filter((project) => project.status === 'Completed').length,
  inProgress: items.filter((project) => project.status === 'In Progress').length,
  averageProgress: items.length ? Math.round(items.reduce((total, project) => total + project.progress, 0) / items.length) : 0,
});
export const filterProjects = (items: Project[], query: string, status: 'All' | ProjectStatus, category: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((project) => {
    const searchable = [project.name, project.description, project.category, ...project.members].join(' ').toLowerCase();
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && (status === 'All' || project.status === status) && (category === 'All Categories' || project.category === category);
  });
};
```

Set the `View Group Projects` action to `{ label: 'View Group Projects', href: '/dashboard', variant: 'primary', isPublished: true }`. Create a minimal `src/components/Dashboard.tsx` that accepts `{ projects }: { projects: Project[] }` and renders `<h1>Project Dashboard</h1>`. Change `App` to render `<Dashboard projects={projects} />` when `window.location.pathname === '/dashboard'`. Task 2 replaces this minimal component with the full dashboard.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm.cmd run test -- --run src/content/siteContent.test.ts src/App.test.tsx`

Expected: PASS; summary/filter helpers and enabled hero link behave as specified.

- [ ] **Step 5: Commit data and routing**

```bash
git add src/content/siteContent.ts src/content/siteContent.test.ts src/App.tsx src/App.test.tsx
git commit -m "feat: add editable dashboard project data"
```

### Task 2: Build the Figma-style dashboard and working mock-project panel

**Files:**
- Modify: `src/components/Dashboard.tsx`
- Create: `src/components/Dashboard.test.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectDetail.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `Project`, `ProjectStatus`, `projects`, `getDashboardSummary`, and `filterProjects` from `src/content/siteContent.ts`.
- Produces: `Dashboard({ projects }: { projects: Project[] })`, `ProjectCard`, and `ProjectDetail`.

- [ ] **Step 1: Write failing dashboard interaction tests**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { projects } from '../content/siteContent';

test('filters the example project to an empty state', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);
  await user.type(screen.getByRole('searchbox', { name: /search projects/i }), 'robotics');
  expect(screen.getByText(/no mock projects match/i)).toBeInTheDocument();
});

test('opens and closes the example project panel', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);
  await user.click(screen.getByRole('button', { name: /view demo for smart campus navigator/i }));
  expect(screen.getByRole('dialog', { name: /smart campus navigator/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm.cmd run test -- --run src/components/Dashboard.test.tsx`

Expected: FAIL because `Dashboard.tsx` does not exist.

- [ ] **Step 3: Implement dashboard components and styles**

`Dashboard` uses `useState` for `query`, `status`, `category`, and `selectedProject`; it derives visible cards through `filterProjects`. Render a `#d71920` header containing the DDI mark, “DDI Sandbox / Project Dashboard”, “Academic Year 2025–2026”, and a Home link. Render summary cards from `getDashboardSummary`, a labelled search field, All/Completed/In Progress/Review/Planning filter buttons, a category select, and responsive project grid.

`ProjectCard` renders the group badge, name, status, description, CSS progress bar, member count, date, category, technologies, and a `<button aria-label={`View demo for ${project.name}`}>View Demo</button>`. `ProjectDetail` renders `<section role="dialog" aria-modal="true" aria-label={project.name}>`, labels the record “Example project”, and provides `Close project details`. The detail action does not use an external link.

Add CSS for the Figma reference: red header, `#f7f7f8` workspace, rounded white summary and project cards, red progress/action treatment, status pills, a `repeat(auto-fit, minmax(260px, 1fr))` card grid, and single-column toolbar/card layout below `640px`.

- [ ] **Step 4: Replace temporary route and pass interaction tests**

Change `App` so `/dashboard` renders the real `<Dashboard projects={projects} />`.

Run: `npm.cmd run test -- --run src/components/Dashboard.test.tsx src/App.test.tsx`

Expected: PASS; dashboard search, panel open/close, and hero navigation work.

- [ ] **Step 5: Run full verification**

Run: `npm.cmd run test -- --run; npm.cmd run build`

Expected: all tests pass and the TypeScript/Vite production build completes.

- [ ] **Step 6: Commit dashboard implementation**

```bash
git add src/components/Dashboard.tsx src/components/Dashboard.test.tsx src/components/ProjectCard.tsx src/components/ProjectDetail.tsx src/App.tsx src/styles.css
git commit -m "feat: build mock project dashboard"
```
