import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { dashboardContent, projects, type DashboardContent } from '../content/siteContent';

const renderDashboard = (
  content: DashboardContent = dashboardContent,
  projectItems = projects,
) => render(<Dashboard content={content} projects={projectItems} />);

test('filters the example project to an empty state', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.type(screen.getByRole('searchbox', { name: /search projects/i }), 'robotics');
  expect(screen.getByText(/no mock projects match/i)).toBeInTheDocument();
});

test('opens and closes the example project panel', async () => {
  const user = userEvent.setup();
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  );
  expect(screen.getByRole('dialog', { name: /smart campus navigator/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('moves focus into the project panel and keeps tab focus inside it', async () => {
  const user = userEvent.setup();
  renderDashboard();
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
  renderDashboard();
  await user.click(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  );

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('returns focus to the View Demo trigger after the panel closes', async () => {
  const user = userEvent.setup();
  renderDashboard();
  const viewDemo = screen.getByRole('button', {
    name: /view demo for smart campus navigator/i,
  });
  await user.click(viewDemo);

  await user.click(screen.getByRole('button', { name: /close project details/i }));
  expect(viewDemo).toHaveFocus();
});

test('filters by status and restores the All status selection', async () => {
  const user = userEvent.setup();
  renderDashboard();

  await user.click(screen.getByRole('button', { name: 'In Progress' }));
  expect(screen.getByText(/no mock projects match/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'All' }));
  expect(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
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
    'IoT',
    'Education',
  ]);

  await user.type(screen.getByRole('searchbox', { name: /search projects/i }), 'smart');
  await user.selectOptions(category, 'Education');
  expect(screen.getByText(/no mock projects match/i)).toBeInTheDocument();

  await user.selectOptions(category, 'All Categories');
  expect(category).toHaveDisplayValue('All Categories');
  expect(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  ).toBeInTheDocument();
});

test('announces filter result counts and groups status choices', async () => {
  const user = userEvent.setup();
  renderDashboard();

  expect(
    screen.getByRole('group', { name: dashboardContent.statusFilterLabel }),
  ).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 mock project');

  await user.click(screen.getByRole('button', { name: 'In Progress' }));
  expect(screen.getByRole('status')).toHaveTextContent('0 mock projects');
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
      total: 'Editable total label',
    },
    searchLabel: 'Find editable projects',
    searchPlaceholder: 'Type an editable search',
    statusFilterLabel: 'Editable status filters',
    statusOptions: dashboardContent.statusOptions.map((option) =>
      option.value === 'In Progress' ? { ...option, label: 'Editable active work' } : option,
    ),
    categoryLabel: 'Editable category filter',
    projectCount: {
      singular: 'editable record',
      plural: 'editable records',
    },
    noResultsTitle: 'No editable records found',
    noResultsHint: 'Change the editable filters.',
    mockDataLabel: 'Editable mock label',
    exampleProjectLabel: 'Editable example label',
    detail: {
      ...dashboardContent.detail,
      notice: 'Editable local detail notice.',
    },
  };

  renderDashboard(editableContent);

  expect(screen.getByRole('heading', { name: 'Editable dashboard title' })).toBeInTheDocument();
  expect(screen.getByText('Editable dashboard subtitle')).toBeInTheDocument();
  expect(screen.getByText('Academic Year 2030–2031')).toBeInTheDocument();
  expect(screen.getByText('Editable total label')).toBeInTheDocument();
  expect(screen.getByText('Editable mock label')).toBeInTheDocument();
  expect(screen.getByText('Editable example label')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 editable record');
  expect(
    screen.getByRole('group', { name: 'Editable status filters' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Editable active work' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Editable category filter' })).toBeInTheDocument();

  await user.type(
    screen.getByRole('searchbox', { name: 'Find editable projects' }),
    'missing',
  );
  expect(screen.getByText('No editable records found')).toBeInTheDocument();
  expect(screen.getByText('Change the editable filters.')).toBeInTheDocument();

  await user.clear(screen.getByRole('searchbox', { name: 'Find editable projects' }));
  await user.click(
    screen.getByRole('button', { name: /view demo for smart campus navigator/i }),
  );
  expect(screen.getByText('Editable local detail notice.')).toBeInTheDocument();
});
