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
  await user.click(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  );
  expect(screen.getByRole('dialog', { name: /smart campus navigator/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
