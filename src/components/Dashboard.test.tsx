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

test('moves focus into the project panel and keeps tab focus inside it', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);
  await user.click(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  );

  const closeButton = screen.getByRole('button', { name: /close project details/i });
  expect(closeButton).toHaveFocus();

  await user.tab();
  expect(closeButton).toHaveFocus();
});

test('closes the project panel with Escape', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);
  await user.click(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  );

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('returns focus to the View Demo trigger after the panel closes', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);
  const viewDemo = screen.getByRole('button', {
    name: /view demo for smart campus navigator/i,
  });
  await user.click(viewDemo);

  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(viewDemo).toHaveFocus();
});

test('filters by status and restores the All status selection', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);

  await user.click(screen.getByRole('button', { name: 'In Progress' }));
  expect(screen.getByText(/no mock projects match/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'All' }));
  expect(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  ).toBeInTheDocument();
});

test('filters by category and restores the All Categories selection', async () => {
  const user = userEvent.setup();
  render(<Dashboard projects={projects} />);
  const category = screen.getByRole('combobox', { name: /category/i });

  await user.selectOptions(category, 'Other');
  expect(screen.getByText(/no mock projects match/i)).toBeInTheDocument();

  await user.selectOptions(category, 'All Categories');
  expect(category).toHaveValue('All Categories');
  expect(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  ).toBeInTheDocument();
});
