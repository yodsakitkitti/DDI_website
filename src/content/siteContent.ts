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
    { label: 'View Group Projects', href: '/dashboard', variant: 'primary', isPublished: true },
    { label: 'Learn more about the Sandbox', href: '#about', variant: 'secondary', isPublished: false },
  ],
};

export const dashboardContent = {
  title: 'Project Dashboard',
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
  status: 'All' | ProjectStatus,
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
