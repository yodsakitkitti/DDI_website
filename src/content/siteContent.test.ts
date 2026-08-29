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

test('prepares one profile slot for every active and alumni venture', () => {
  expect(projects).toHaveLength(16);
  expect(projects.filter((project) => project.ventureType === 'Active team')).toHaveLength(14);
  expect(projects.filter((project) => project.ventureType === 'Alumni venture')).toHaveLength(2);
  expect(projects.filter((project) => project.profileStatus === 'Awaiting information')).toHaveLength(16);
});

test('derives content-publication totals from the venture profiles', () => {
  expect(getDashboardSummary(projects)).toEqual({
    activeTeams: 14,
    alumniVentures: 2,
    publishedProfiles: 0,
    readyForReview: 0,
    awaitingInformation: 16,
  });
});

test('summarizes every publication state in a mixed profile collection', () => {
  const mixedProfiles = [
    projects[0],
    { ...projects[1], profileStatus: 'Ready for review' as const },
    { ...projects[14], profileStatus: 'Published' as const },
  ];

  expect(getDashboardSummary(mixedProfiles)).toEqual({
    activeTeams: 2,
    alumniVentures: 1,
    publishedProfiles: 1,
    readyForReview: 1,
    awaitingInformation: 1,
  });
});

test('filters venture profiles by case-insensitive search', () => {
  expect(filterProjects(projects, 'active team 01', 'All', 'All Categories')).toHaveLength(1);
  expect(filterProjects(projects, 'missing', 'All', 'All Categories')).toEqual([]);
});

test.each([
  ['zeri', 'venture name'],
  ['awaiting verified team information', 'description'],
  ['active team', 'venture type'],
])('filters venture profiles by case-insensitive %s search', (query) => {
  expect(filterProjects(projects, query, 'All', 'All Categories').length).toBeGreaterThan(0);
});
