import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { dashboardContent, projects } from '../content/siteContent';

const renderDashboard = () => render(<Dashboard content={dashboardContent} projects={projects} />);

test('opens and closes a venture profile panel', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view profile for collectra/i }),
  );
  expect(screen.getByRole('dialog', { name: /collectra/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('moves focus into the project panel and keeps tab focus inside it', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view profile for collectra/i }),
  );

  const closeButton = screen.getByRole('button', { name: /close project details/i });
  expect(closeButton).toHaveFocus();

  await user.tab();
  expect(closeButton).toHaveFocus();
});

test('closes the project panel with Escape', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view profile for collectra/i }),
  );

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('returns focus to the View Profile trigger after the panel closes', async () => {
  const user = userEvent.setup();
  renderDashboard();
  const viewProfile = screen.getByRole('button', {
    name: /view profile for collectra/i,
  });
  await user.click(viewProfile);

  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(viewProfile).toHaveFocus();
});
