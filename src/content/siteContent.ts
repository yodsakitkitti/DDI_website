export type ActionVariant = 'primary' | 'secondary';

export interface SiteAction {
  label: string;
  href: string;
  variant: ActionVariant;
  isPublished: boolean;
}

export interface SiteContent {
  eyebrow: string;
  headingStart: string;
  headingAccent: string;
  description: string;
  universityLogoSrc: string;
  universityLogoAlt: string;
  ddiLogoSrc: string;
  ddiLogoAlt: string;
  heroImageSrc: string;
  actions: SiteAction[];
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Review' | 'Planning';
export type ProjectStatusFilter = 'All' | ProjectStatus;

export interface Project {
  id: string;
  groupLabel: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  description: string;
  members: string[];
  dueDate: string;
  category: string;
  technologies: string[];
}

export interface DashboardStatusOption {
  value: ProjectStatusFilter;
  label: string;
}

export interface DashboardSummaryLabels {
  total: string;
  completed: string;
  inProgress: string;
  averageProgress: string;
}

export interface DashboardProjectCount {
  singular: string;
  plural: string;
}

export interface DashboardCardContent {
  progressLabel: string;
  teamLabel: string;
  dueDateLabel: string;
  memberSingular: string;
  memberPlural: string;
  technologiesLabel: string;
  viewDemoLabel: string;
}

export interface DashboardDetailContent {
  closeLabel: string;
  statusLabel: string;
  progressLabel: string;
  categoryLabel: string;
  dueDateLabel: string;
  teamHeading: string;
  technologyHeading: string;
  notice: string;
}

export interface DashboardContent {
  brandName: string;
  brandSection: string;
  brandHomeLabel: string;
  homeLabel: string;
  academicYear: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  mockDataLabel: string;
  exampleProjectLabel: string;
  summaryAriaLabel: string;
  summaryLabels: DashboardSummaryLabels;
  projectsEyebrow: string;
  projectsTitle: string;
  projectCount: DashboardProjectCount;
  searchLabel: string;
  searchPlaceholder: string;
  statusFilterLabel: string;
  statusOptions: DashboardStatusOption[];
  categoryLabel: string;
  allCategoriesLabel: string;
  noResultsTitle: string;
  noResultsHint: string;
  card: DashboardCardContent;
  detail: DashboardDetailContent;
}

export const visibleActions = (actions: SiteAction[]) => actions;

export const siteContent: SiteContent = {
  eyebrow: 'DDI SANDBOX',
  headingStart: 'Where Ideas Become',
  headingAccent: 'Innovation',
  description:
    'An innovative learning ecosystem empowering students to turn ideas into action, creativity into innovation, and challenges into opportunities — bridging academic knowledge with real-world impact.',
  universityLogoSrc: '/images/university-logo.png',
  universityLogoAlt: 'University logo',
  ddiLogoSrc: '/images/ddi-logo.png',
  ddiLogoAlt: 'DDI logo',
  heroImageSrc: '/images/ddi-sandbox-hero.png',
  actions: [
    { label: 'View Group Projects', href: '/#/dashboard', variant: 'primary', isPublished: true },
    { label: 'Learn more about the Sandbox', href: '#about', variant: 'secondary', isPublished: false },
  ],
};

export const dashboardContent: DashboardContent = {
  brandName: 'DDI Sandbox',
  brandSection: 'Project Dashboard',
  brandHomeLabel: 'DDI Sandbox home',
  homeLabel: 'Home',
  academicYear: 'Academic Year 2025–2026',
  eyebrow: 'DDI Sandbox showcase',
  title: 'Project Dashboard',
  subtitle: 'Explore an example student project created to demonstrate this dashboard experience.',
  mockDataLabel: 'Mock data',
  exampleProjectLabel: 'Example project',
  summaryAriaLabel: 'Project summary',
  summaryLabels: {
    total: 'Total Projects',
    completed: 'Completed',
    inProgress: 'In Progress',
    averageProgress: 'Average Progress',
  },
  projectsEyebrow: 'Example records',
  projectsTitle: 'Group Projects',
  projectCount: {
    singular: 'mock project',
    plural: 'mock projects',
  },
  searchLabel: 'Search projects',
  searchPlaceholder: 'Search projects',
  statusFilterLabel: 'Filter projects by status',
  statusOptions: [
    { value: 'All', label: 'All' },
    { value: 'Completed', label: 'Completed' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Review', label: 'Review' },
    { value: 'Planning', label: 'Planning' },
  ],
  categoryLabel: 'Category',
  allCategoriesLabel: 'All Categories',
  noResultsTitle: 'No mock projects match your filters.',
  noResultsHint: 'Try a different search, status, or category.',
  card: {
    progressLabel: 'Progress',
    teamLabel: 'Team',
    dueDateLabel: 'Due date',
    memberSingular: 'member',
    memberPlural: 'members',
    technologiesLabel: 'Technologies',
    viewDemoLabel: 'View Demo',
  },
  detail: {
    closeLabel: 'Close project details',
    statusLabel: 'Status',
    progressLabel: 'Progress',
    categoryLabel: 'Category',
    dueDateLabel: 'Due date',
    teamHeading: 'Project team',
    technologyHeading: 'Technology stack',
    notice: 'This local preview uses mock content and does not connect to an external demo.',
  },
};

export const projects: Project[] = [
  {
    id: 'smart-campus-navigator',
    groupLabel: 'Group 1',
    name: 'Smart Campus Navigator',
    status: 'Completed',
    progress: 100,
    description:
      'An AI-powered indoor navigation concept for university campuses using BLE beacons and mobile wayfinding.',
    members: ['Ava Chen', 'Narin S.', 'Ploy K.', 'Thanawat R.'],
    dueDate: 'Jun 10, 2026',
    category: 'IoT',
    technologies: ['React Native', 'Python', 'TensorFlow', 'Arduino'],
  },
];

export const getDashboardSummary = (items: Project[]) => ({
  total: items.length,
  completed: items.filter((project) => project.status === 'Completed').length,
  inProgress: items.filter((project) => project.status === 'In Progress').length,
  averageProgress: items.length
    ? Math.round(items.reduce((total, project) => total + project.progress, 0) / items.length)
    : 0,
});

export const filterProjects = (
  items: Project[],
  query: string,
  status: ProjectStatusFilter,
  category: string,
) => {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((project) => {
    const searchable = [
      project.name,
      project.description,
      project.category,
      ...project.members,
    ]
      .join(' ')
      .toLowerCase();

    return (
      (!normalizedQuery || searchable.includes(normalizedQuery)) &&
      (status === 'All' || project.status === status) &&
      (category === 'All Categories' || project.category === category)
    );
  });
};
