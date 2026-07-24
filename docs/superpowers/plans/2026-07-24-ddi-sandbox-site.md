# DDI Sandbox Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive DDI Sandbox landing page that follows the approved Figma Make hero and can be updated through one typed content file.

**Architecture:** A Vite React TypeScript application renders its page from a typed `siteContent` object. The content module owns all public copy, image paths, and action destinations; presentational components only render published data. CSS supplies the dark, photo-led, red-accent visual system and responsive layout.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, CSS.

## Global Constraints

- Use `src/content/siteContent.ts` as the single editable source for public information.
- Do not render unpublished optional data; `isPublished: false` hides it. Unpublished calls to action remain visible as disabled “Coming soon” controls.
- Do not invent real group-project information, external destinations, or unpublished dashboard data.
- Preserve the Figma Make design direction: dark photo-led hero, two logos, white and red headline treatment, and one red primary action.
- Do not add a CMS, backend, authentication, or persistence.
- All implementation behaviour is written test-first and each task is committed after its tests pass.

---

## File structure

- `package.json`: scripts and project dependencies.
- `index.html`: Vite entry document and page title.
- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: assembles the hero from editable site content.
- `src/content/siteContent.ts`: public content schema, defaults, and visibility helper.
- `src/components/ActionLink.tsx`: accessible primary and secondary actions.
- `src/components/Hero.tsx`: logo, content, and action layout.
- `src/styles.css`: desktop and mobile visual implementation.
- `src/test/setup.ts`: Testing Library matchers and cleanup setup.
- `src/content/siteContent.test.ts`: content-visibility tests.
- `src/components/ActionLink.test.tsx`: action rendering tests.
- `src/App.test.tsx`: published hero composition test.

### Task 1: Create the tested React/Vite foundation

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/styles.css`
- Create: `src/test/setup.ts`

**Interfaces:**
- Consumes: no project code; the repository is empty.
- Produces: `npm run dev`, `npm run build`, and `npm run test` scripts for all later tasks.

- [ ] **Step 1: Write the failing bootstrap test**

Create `src/App.test.tsx` with this first assertion before creating `src/App.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the DDI Sandbox page heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /where ideas become innovation/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- --run src/App.test.tsx`

Expected: FAIL because the Vite project dependencies and `./App` module do not exist.

- [ ] **Step 3: Create the minimal Vite test foundation**

Create `package.json` with these scripts and dependencies:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest"
  },
  "dependencies": { "@vitejs/plugin-react": "latest", "vite": "latest", "react": "latest", "react-dom": "latest" },
  "devDependencies": { "@testing-library/jest-dom": "latest", "@testing-library/react": "latest", "@types/react": "latest", "@types/react-dom": "latest", "jsdom": "latest", "typescript": "latest", "vitest": "latest" }
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] },
});
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Create `index.html` with `<div id="root"></div>` and a module script for `/src/main.tsx`; create `src/main.tsx` that renders `App` into `#root`; create a temporary `src/App.tsx` that renders the tested heading; and import `./styles.css` from `src/main.tsx`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm install; npm run test -- --run src/App.test.tsx`

Expected: PASS with one passing test.

- [ ] **Step 5: Verify the production bundle**

Run: `npm run build`

Expected: Vite writes a `dist` directory without TypeScript errors.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html src
git commit -m "chore: scaffold vite react site"
```

### Task 2: Define the editable public-content contract

**Files:**
- Create: `src/content/siteContent.ts`
- Create: `src/content/siteContent.test.ts`

**Interfaces:**
- Consumes: the Vite/Vitest foundation from Task 1.
- Produces: `SiteContent`, `SiteAction`, `siteContent`, and `visibleActions(actions)` for components to import.

- [ ] **Step 1: Write the failing visibility test**

```ts
import { visibleActions, type SiteAction } from './siteContent';

test('keeps unpublished actions available for disabled rendering', () => {
  const actions: SiteAction[] = [
    { label: 'Published', href: '#published', variant: 'primary', isPublished: true },
    { label: 'Draft', href: '#draft', variant: 'secondary', isPublished: false },
  ];

  expect(visibleActions(actions)).toEqual(actions);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- --run src/content/siteContent.test.ts`

Expected: FAIL because `siteContent.ts` does not exist.

- [ ] **Step 3: Implement the minimum content contract**

```ts
export type ActionVariant = 'primary' | 'secondary';

export interface SiteAction {
  label: string;
  href: string;
  variant: ActionVariant;
  isPublished: boolean;
}

export interface SiteContent {
  eyebrow: string;
  headingStart: string;
  headingAccent: string;
  description: string;
  universityLogoSrc: string;
  universityLogoAlt: string;
  ddiLogoSrc: string;
  ddiLogoAlt: string;
  heroImageSrc: string;
  actions: SiteAction[];
}

export const visibleActions = (actions: SiteAction[]) => actions;

export const siteContent: SiteContent = {
  eyebrow: 'DDI SANDBOX',
  headingStart: 'Where Ideas Become',
  headingAccent: 'Innovation',
  description: 'An innovative learning ecosystem empowering students to turn ideas into action, creativity into innovation, and challenges into opportunities — bridging academic knowledge with real-world impact.',
  universityLogoSrc: '/images/university-logo.png',
  universityLogoAlt: 'University logo',
  ddiLogoSrc: '/images/ddi-logo.png',
  ddiLogoAlt: 'DDI logo',
  heroImageSrc: '/images/ddi-sandbox-hero.jpg',
  actions: [
    { label: 'View Group Projects', href: '#projects', variant: 'primary', isPublished: false },
    { label: 'Learn more about the Sandbox', href: '#about', variant: 'secondary', isPublished: false }
  ]
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- --run src/content/siteContent.test.ts`

Expected: PASS with both action records retained for the UI.

- [ ] **Step 5: Commit the content contract**

```bash
git add src/content/siteContent.ts src/content/siteContent.test.ts
git commit -m "feat: add editable sandbox content"
```

### Task 3: Render content-driven actions and the Figma-style hero

**Files:**
- Create: `src/components/ActionLink.tsx`
- Create: `src/components/ActionLink.test.tsx`
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `SiteAction`, `SiteContent`, `siteContent`, and `visibleActions` from `src/content/siteContent.ts`.
- Produces: `ActionLink({ action }: { action: SiteAction })` and `Hero({ content }: { content: SiteContent })`.

- [ ] **Step 1: Write the failing action-link test**

```tsx
import { render, screen } from '@testing-library/react';
import { ActionLink } from './ActionLink';

test('renders a primary action as an accessible link', () => {
  render(<ActionLink action={{ label: 'View projects', href: '#projects', variant: 'primary', isPublished: true }} />);
  expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- --run src/components/ActionLink.test.tsx`

Expected: FAIL because `ActionLink.tsx` does not exist.

- [ ] **Step 3: Implement the components and composition**

```tsx
// src/components/ActionLink.tsx
import type { SiteAction } from '../content/siteContent';

export function ActionLink({ action }: { action: SiteAction }) {
  if (!action.isPublished) {
    return <button className={`action action--${action.variant}`} type="button" disabled>{action.label}<span className="sr-only"> — Coming soon</span></button>;
  }
  return <a className={`action action--${action.variant}`} href={action.href}>{action.label}</a>;
}
```

```tsx
// src/components/Hero.tsx
import { visibleActions, type SiteContent } from '../content/siteContent';
import { ActionLink } from './ActionLink';

export function Hero({ content }: { content: SiteContent }) {
  return <main className="hero" style={{ backgroundImage: `url(${content.heroImageSrc})` }}>
    <header className="hero__brand"><img src={content.universityLogoSrc} alt={content.universityLogoAlt} /><img src={content.ddiLogoSrc} alt={content.ddiLogoAlt} /></header>
    <section className="hero__content" aria-labelledby="hero-heading">
      <p className="hero__eyebrow">{content.eyebrow}</p>
      <h1 id="hero-heading">{content.headingStart}<span>{content.headingAccent}</span></h1>
      <p className="hero__description">{content.description}</p>
      <nav className="hero__actions" aria-label="Sandbox actions">{visibleActions(content.actions).map((action) => <ActionLink key={action.label} action={action} />)}</nav>
    </section>
  </main>;
}
```

```tsx
// src/App.tsx
import { Hero } from './components/Hero';
import { siteContent } from './content/siteContent';

export default function App() { return <Hero content={siteContent} />; }
```

Add responsive CSS to make `.hero` fill the viewport with a dark overlay, position `.hero__brand` in opposing corners, cap `.hero__content` at 760px, set the heading to `clamp(3rem, 7vw, 6rem)`, use DDI red for the heading span and `.action--primary`, and stack actions below 640px.

- [ ] **Step 4: Update the page test for unpublished actions**

```tsx
test('shows unpublished actions as disabled coming soon controls', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /view group projects/i })).toBeDisabled();
});
```

- [ ] **Step 5: Run the component and page tests**

Run: `npm run test -- --run src/components/ActionLink.test.tsx src/App.test.tsx`

Expected: PASS; the title renders and unpublished actions are disabled.

- [ ] **Step 6: Commit the hero implementation**

```bash
git add src/components src/App.tsx src/App.test.tsx src/styles.css
git commit -m "feat: build ddi sandbox hero"
```

### Task 4: Add supplied visual assets and verify the site

**Files:**
- Create: `public/images/university-logo.png`
- Create: `public/images/ddi-logo.png`
- Create: `public/images/ddi-sandbox-hero.jpg`
- Create: `src/assets.test.ts`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: the image paths defined in `siteContent`.
- Produces: correctly sized, non-placeholder visual assets visible in the hero.

- [ ] **Step 1: Write the failing asset-existence test**

```ts
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('includes all hero image assets', () => {
  for (const assetPath of [
    'public/images/university-logo.png',
    'public/images/ddi-logo.png',
    'public/images/ddi-sandbox-hero.jpg',
  ]) {
    expect(existsSync(resolve(process.cwd(), assetPath))).toBe(true);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- --run src/assets.test.ts`

Expected: FAIL because the three required image files have not been added.

- [ ] **Step 3: Add the exact design assets and explicit image sizing**

Export/download the logo and background assets from the approved design when available, then store their original bytes at the exact paths above. Ensure the CSS fixes the university logo and DDI mark dimensions, and uses `background-size: cover` with a dark pseudo-element overlay so the headline remains readable.

- [ ] **Step 4: Run the full automated verification**

Run: `npm run test -- --run; npm run build`

Expected: all tests pass and the production bundle completes successfully.

- [ ] **Step 5: Perform browser design verification**

Run: `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`

Open the local page in the browser, compare it against the Figma reference at desktop and mobile widths, verify the visible headline, disabled “Coming soon” actions, and keyboard focus. Record any material differences in `design-qa.md` and resolve P0–P2 visual issues before handoff.

- [ ] **Step 6: Commit visual completion**

```bash
git add public/images src/styles.css design-qa.md
git commit -m "feat: add ddi sandbox visual assets"
```
