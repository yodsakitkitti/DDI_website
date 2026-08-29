import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { dashboardContent, projects, type DashboardContent } from '../content/siteContent';

const renderDashboard = (
  content: DashboardContent = dashboardContent,
  projectItems = projects,
) => render(<Dashboard content={content} projects={projectItems} />);

test('filters the venture profiles to an empty state', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.type(screen.getByRole('searchbox', { name: /search venture profiles/i }), 'robotics');
  expect(screen.getByText(/no venture profiles match/i)).toBeInTheDocument();
});

test('shows the Phase 2 content publication summary', () => {
  renderDashboard();

  expect(screen.getByText('14', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getByText('Active Teams')).toBeInTheDocument();
  expect(screen.getByText('2', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getByText('Alumni Ventures')).toBeInTheDocument();
  expect(screen.getByText('16', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getByText('Awaiting Content')).toBeInTheDocument();
  expect(screen.getByText('Ready for Review')).toBeInTheDocument();
});

test('opens an awaiting-information team profile', async () => {
  const user = userEvent.setup();
  renderDashboard();

  await user.click(screen.getByRole('button', { name: /view profile for active team 01/i }));
  expect(screen.getByRole('dialog', { name: /active team 01/i })).toBeInTheDocument();
  expect(screen.getByText(/profile will be updated after the team information is verified/i)).toBeInTheDocument();
});

test('does not claim an unknown team has zero members', () => {
  renderDashboard();

  expect(screen.queryByText('0 members')).not.toBeInTheDocument();
  expect(screen.getAllByText('To be confirmed').length).toBeGreaterThan(0);
});

test('omits the awaiting-verification notice from a published profile', async () => {
  const user = userEvent.setup();
  const publishedProfile = {
    ...projects[0],
    name: 'Published Venture',
    profileStatus: 'Published' as const,
    members: ['Verified Member'],
  };
  renderDashboard(dashboardContent, [publishedProfile]);

  await user.click(screen.getByRole('button', { name: /view profile for published venture/i }));
  expect(screen.queryByText(/profile will be updated after the team information is verified/i)).not.toBeInTheDocument();
  expect(screen.getByText('Verified Member')).toBeInTheDocument();
});

test('opens and closes a venture profile panel', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view profile for active team 01/i }),
  );
  expect(screen.getByRole('dialog', { name: /active team 01/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('moves focus into the project panel and keeps tab focus inside it', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view profile for active team 01/i }),
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
    screen.getByRole('button', { name: /view profile for active team 01/i }),
  );

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('returns focus to the View Demo trigger after the panel closes', async () => {
  const user = userEvent.setup();
  renderDashboard();
  const viewProfile = screen.getByRole('button', {
    name: /view profile for active team 01/i,
  });
  await user.click(viewProfile);

  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(viewProfile).toHaveFocus();
});

test('filters by status and restores the All status selection', async () => {
  const user = userEvent.setup();
  renderDashboard();

  await user.click(screen.getByRole('button', { name: 'Published' }));
  expect(screen.getByText(/no venture profiles match/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'All' }));
  expect(
    screen.getByRole('button', { name: /view profile for active team 01/i }),
  ).toBeInTheDocument();
});

test('derives category filters from project data and restores All Categories', async () => {
  const user = userEvent.setup();
  const educationProject = {
    ...projects[0],
    id: 'learning-lab',
    name: 'Learning Lab',
    category: 'Education',
  };
  renderDashboard(dashboardContent, [...projects, educationProject]);
  const category = screen.getByRole('combobox', { name: /category/i });

  expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
    'All Categories',
    'To be confirmed',
    'Education',
  ]);

  await user.type(screen.getByRole('searchbox', { name: /search venture profiles/i }), 'zeri');
  await user.selectOptions(category, 'Education');
  expect(screen.getByText(/no venture profiles match/i)).toBeInTheDocument();

  await user.selectOptions(category, 'All Categories');
  expect(category).toHaveDisplayValue('All Categories');
  expect(
    screen.getByRole('button', { name: /view profile for zeri/i }),
  ).toBeInTheDocument();
});

test('announces filter result counts and groups status choices', async () => {
  const user = userEvent.setup();
  renderDashboard();

  expect(
    screen.getByRole('group', { name: dashboardContent.statusFilterLabel }),
  ).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('16 venture profiles');

  await user.click(screen.getByRole('button', { name: 'Published' }));
  expect(screen.getByRole('status')).toHaveTextContent('0 venture profiles');
});

test('renders editable dashboard labels from the typed content contract', async () => {
  const user = userEvent.setup();
  const editableContent: DashboardContent = {
    ...dashboardContent,
    academicYear: 'Academic Year 2030–2031',
    title: 'Editable dashboard title',
    subtitle: 'Editable dashboard subtitle',
    summaryLabels: {
      ...dashboardContent.summaryLabels,
      activeTeams: 'Editable active teams label',
    },
    searchLabel: 'Find editable projects',
    searchPlaceholder: 'Type an editable search',
    statusFilterLabel: 'Editable status filters',
    statusOptions: dashboardContent.statusOptions.map((option) =>
      option.value === 'Published' ? { ...option, label: 'Editable published profiles' } : option,
    ),
    categoryLabel: 'Editable category filter',
    projectCount: {
      singular: 'editable record',
      plural: 'editable records',
    },
    noResultsTitle: 'No editable records found',
    noResultsHint: 'Change the editable filters.',
    dataStatusLabel: 'Editable data status',
    profileLabel: 'Editable profile label',
    detail: {
      ...dashboardContent.detail,
      notice: 'Editable local detail notice.',
    },
  };

  renderDashboard(editableContent);

  expect(screen.getByRole('heading', { name: 'Editable dashboard title' })).toBeInTheDocument();
  expect(screen.getByText('Editable dashboard subtitle')).toBeInTheDocument();
  expect(screen.getByText('Academic Year 2030–2031')).toBeInTheDocument();
  expect(screen.getByText('Editable active teams label')).toBeInTheDocument();
  expect(screen.getByText('Editable data status')).toBeInTheDocument();
  expect(screen.getAllByText('Editable profile label').length).toBeGreaterThan(0);
  expect(screen.getByRole('status')).toHaveTextContent('16 editable records');
  expect(
    screen.getByRole('group', { name: 'Editable status filters' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Editable published profiles' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Editable category filter' })).toBeInTheDocument();

  await user.type(
    screen.getByRole('searchbox', { name: 'Find editable projects' }),
    'missing',
  );
  expect(screen.getByText('No editable records found')).toBeInTheDocument();
  expect(screen.getByText('Change the editable filters.')).toBeInTheDocument();

  await user.clear(screen.getByRole('searchbox', { name: 'Find editable projects' }));
  await user.click(
    screen.getByRole('button', { name: /view profile for active team 01/i }),
  );
  expect(screen.getByText('Editable local detail notice.')).toBeInTheDocument();
});
