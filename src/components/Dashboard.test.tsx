import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { dashboardContent, projects } from '../content/siteContent';

const renderDashboard = () => render(<Dashboard content={dashboardContent} projects={projects} />);

beforeEach(() => {
  localStorage.clear();
});

const visibleProfiles = () => screen.queryAllByRole('button', { name: /^view profile for /i });

test('searches venture names without case sensitivity', async () => {
  const user = userEvent.setup();
  renderDashboard();

  expect(visibleProfiles()).toHaveLength(projects.length);
  await user.type(screen.getByRole('searchbox', { name: 'Search ventures' }), 'cOLLeCtRA');

  expect(visibleProfiles()).toHaveLength(1);
  expect(screen.getByRole('button', { name: /view profile for collectra/i })).toBeInTheDocument();
});

test('combines category and search filters, and resets an empty result', async () => {
  const user = userEvent.setup();
  renderDashboard();
  const wellnessFilter = screen.getByRole('button', { name: 'Wellness' });
  const search = screen.getByRole('searchbox', { name: 'Search ventures' });

  await user.click(wellnessFilter);
  expect(wellnessFilter).toHaveAttribute('aria-pressed', 'true');
  expect(visibleProfiles()).toHaveLength(projects.filter((project) => project.category === 'Wellness').length);

  await user.type(search, 'Ochael');
  expect(visibleProfiles()).toHaveLength(1);
  expect(screen.getByRole('button', { name: /view profile for ochael/i })).toBeInTheDocument();

  await user.clear(search);
  await user.type(search, 'Collectra');
  expect(visibleProfiles()).toHaveLength(0);
  expect(screen.getByText('No ventures found')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(search).toHaveValue('');
  expect(screen.getByRole('button', { name: 'All ventures' })).toHaveAttribute('aria-pressed', 'true');
  expect(visibleProfiles()).toHaveLength(projects.length);
});

test('saves a venture across remounts and updates the saved filter when removed', async () => {
  const user = userEvent.setup();
  const firstRender = renderDashboard();

  await user.click(screen.getByRole('button', { name: 'Save Collectra' }));
  expect(screen.getByRole('button', { name: 'Unsave Collectra' })).toBeInTheDocument();
  expect(localStorage.getItem('ddi-saved-projects')).not.toBeNull();
  firstRender.unmount();
  renderDashboard();

  expect(screen.getByRole('button', { name: 'Unsave Collectra' })).toBeInTheDocument();
  const savedFilter = screen.getByRole('button', { name: 'Saved' });
  await user.click(savedFilter);
  expect(savedFilter).toHaveAttribute('aria-pressed', 'true');
  expect(visibleProfiles()).toHaveLength(1);
  expect(screen.getByRole('button', { name: /view profile for collectra/i })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Unsave Collectra' }));
  expect(visibleProfiles()).toHaveLength(0);
  expect(screen.getByText('No ventures found')).toBeInTheDocument();
  await user.click(savedFilter);
  expect(visibleProfiles()).toHaveLength(projects.length);
  expect(screen.getByRole('button', { name: 'Save Collectra' })).toBeInTheDocument();
});

test('changes between grid and list without losing the selected filter', async () => {
  const user = userEvent.setup();
  renderDashboard();
  const gridView = screen.getByRole('button', { name: 'Grid view' });
  const listView = screen.getByRole('button', { name: 'List view' });
  await user.type(screen.getByRole('searchbox', { name: 'Search ventures' }), 'Collectra');

  expect(gridView).toHaveAttribute('aria-pressed', 'true');
  await user.click(listView);
  expect(listView).toHaveAttribute('aria-pressed', 'true');
  expect(gridView).toHaveAttribute('aria-pressed', 'false');
  expect(visibleProfiles()).toHaveLength(1);

  await user.click(gridView);
  expect(gridView).toHaveAttribute('aria-pressed', 'true');
  expect(listView).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('button', { name: /view profile for collectra/i })).toBeInTheDocument();
});

test('opens a real venture from Surprise me and returns focus when closed', async () => {
  const user = userEvent.setup();
  renderDashboard();
  const surpriseButton = screen.getByRole('button', { name: 'Surprise me' });
  await user.click(surpriseButton);

  const dialog = screen.getByRole('dialog');
  const projectNames = projects.map((project) => project.name);
  expect(projectNames).toContain(within(dialog).getByRole('heading', { level: 2 }).textContent);
  await user.click(within(dialog).getByRole('button', { name: 'Back to ventures' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(surpriseButton).toHaveFocus();
});

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
  const backButton = screen.getByRole('button', { name: 'Back to ventures' });
  expect(closeButton).toHaveFocus();

  await user.tab();
  expect(backButton).toHaveFocus();
  await user.tab();
  expect(closeButton).toHaveFocus();
  await user.tab({ shift: true });
  expect(backButton).toHaveFocus();
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
