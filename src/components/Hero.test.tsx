import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';
import { siteContent } from '../content/siteContent';

test('spotlight selection updates the venture link and next wraps back to the first venture', async () => {
  const user = userEvent.setup();
  render(<Hero content={siteContent} />);

  await user.click(screen.getByRole('button', { name: 'Spotlight MEGURI' }));
  expect(screen.getByRole('button', { name: 'Spotlight MEGURI' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('link', { name: 'Explore MEGURI' })).toHaveAttribute('href', '/#/dashboard/meguri');

  await user.click(screen.getByRole('button', { name: 'Next spotlight venture' }));
  expect(screen.getByRole('button', { name: 'Spotlight PACE' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('link', { name: 'Explore PACE' })).toHaveAttribute('href', '/#/dashboard/pace');
});
