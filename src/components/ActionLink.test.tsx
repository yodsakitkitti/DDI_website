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
