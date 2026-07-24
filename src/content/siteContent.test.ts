import {
  filterProjects,
  getDashboardSummary,
  projects,
  siteContent,
  visibleActions,
  type SiteAction,
} from './siteContent';

test('uses the supplied PNG hero asset', () => {
  expect(siteContent.heroImageSrc).toBe('/images/ddi-sandbox-hero.png');
});

test('keeps unpublished actions available for disabled rendering', () => {
  const actions: SiteAction[] = [
    { label: 'Published', href: '#published', variant: 'primary', isPublished: true },
    { label: 'Draft', href: '#draft', variant: 'secondary', isPublished: false },
  ];

  expect(visibleActions(actions)).toEqual(actions);
});

test('derives dashboard totals from the example project', () => {
  expect(getDashboardSummary(projects)).toEqual({
    total: 1,
    completed: 1,
    inProgress: 0,
    averageProgress: 100,
  });
});

test('filters projects by case-insensitive project search', () => {
  expect(filterProjects(projects, 'campus', 'All', 'All Categories')).toEqual(projects);
  expect(filterProjects(projects, 'missing', 'All', 'All Categories')).toEqual([]);
});

test.each([
  ['Ava Chen', 'member'],
  ['indoor navigation', 'description'],
  ['iot', 'category'],
])('filters projects by case-insensitive %s search', (query) => {
  expect(filterProjects(projects, query, 'All', 'All Categories')).toEqual(projects);
});
