import { visibleActions, type SiteAction } from './siteContent';

test('keeps unpublished actions available for disabled rendering', () => {
  const actions: SiteAction[] = [
    { label: 'Published', href: '#published', variant: 'primary', isPublished: true },
    { label: 'Draft', href: '#draft', variant: 'secondary', isPublished: false },
  ];

  expect(visibleActions(actions)).toEqual(actions);
});
