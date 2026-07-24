import { render, screen } from '@testing-library/react';
import { ActionLink } from './ActionLink';

test('renders a primary action as an accessible link', () => {
  render(
    <ActionLink
      action={{
        label: 'View projects',
        href: '#projects',
        variant: 'primary',
        isPublished: true,
      }}
    />,
  );

  expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute(
    'href',
    '#projects',
  );
});

test('renders an unpublished action as a disabled coming soon control', () => {
  render(
    <ActionLink
      action={{
        label: 'View group projects',
        href: '#projects',
        variant: 'primary',
        isPublished: false,
      }}
    />,
  );

  expect(
    screen.getByRole('button', {
      name: /view group projects.*coming soon/i,
    }),
  ).toBeDisabled();
});
