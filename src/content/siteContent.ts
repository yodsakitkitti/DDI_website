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

import { type ProfileStatusFilter, type Project } from './ventureProfiles';

export { projects } from './ventureProfiles';
export type { ProfileStatusFilter, Project } from './ventureProfiles';

export interface DashboardStatusOption {
  value: ProfileStatusFilter;
  label: string;
}

export interface DashboardSummaryLabels {
  activeTeams: string;
  alumniVentures: string;
  publishedProfiles: string;
  readyForReview: string;
  awaitingInformation: string;
}

export interface DashboardProjectCount {
  singular: string;
  plural: string;
}

export interface DashboardCardContent {
  ventureTypeLabel: string;
  teamLabel: string;
  memberSingular: string;
  memberPlural: string;
  memberUnknownLabel: string;
  technologiesLabel: string;
  viewProfileLabel: string;
}

export interface DashboardDetailContent {
  closeLabel: string;
  profileStatusLabel: string;
  ventureTypeLabel: string;
  categoryLabel: string;
  semesterLabel: string;
  teamHeading: string;
  contactHeading: string;
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
  dataStatusLabel: string;
  profileLabel: string;
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
  academicYear: 'Current semester',
  eyebrow: 'DDI Sandbox showcase',
  title: 'Project Dashboard',
  subtitle: 'Explore current DDI Sandbox teams and past achievements as verified profiles are collected and published.',
  dataStatusLabel: 'Phase 2 · Content publication',
  profileLabel: 'Venture profile',
  summaryAriaLabel: 'Content publication summary',
  summaryLabels: {
    activeTeams: 'Active Teams',
    alumniVentures: 'Alumni Ventures',
    publishedProfiles: 'Published Profiles',
    readyForReview: 'Ready for Review',
    awaitingInformation: 'Awaiting Content',
  },
  projectsEyebrow: 'Current semester and alumni',
  projectsTitle: 'Venture Profiles',
  projectCount: {
    singular: 'venture profile',
    plural: 'venture profiles',
  },
  searchLabel: 'Search venture profiles',
  searchPlaceholder: 'Search teams and ventures',
  statusFilterLabel: 'Filter profiles by publication status',
  statusOptions: [
    { value: 'All', label: 'All' },
    { value: 'Awaiting information', label: 'Awaiting information' },
    { value: 'Ready for review', label: 'Ready for review' },
    { value: 'Published', label: 'Published' },
  ],
  categoryLabel: 'Category',
  allCategoriesLabel: 'All Categories',
  noResultsTitle: 'No venture profiles match your filters.',
  noResultsHint: 'Try a different search, publication status, or category.',
  card: {
    ventureTypeLabel: 'Venture type',
    teamLabel: 'Team',
    memberSingular: 'member',
    memberPlural: 'members',
    memberUnknownLabel: 'To be confirmed',
    technologiesLabel: 'Technologies',
    viewProfileLabel: 'View Profile',
  },
  detail: {
    closeLabel: 'Close project details',
    profileStatusLabel: 'Profile status',
    ventureTypeLabel: 'Venture type',
    categoryLabel: 'Category',
    semesterLabel: 'Semester',
    teamHeading: 'Project team',
    contactHeading: 'Contact person',
    technologyHeading: 'Technology stack',
    notice: 'This profile will be updated after the team information is verified.',
  },
};

export const getDashboardSummary = (items: Project[]) => ({
  activeTeams: items.filter((project) => project.ventureType === 'Active team').length,
  alumniVentures: items.filter((project) => project.ventureType === 'Alumni venture').length,
  publishedProfiles: items.filter((project) => project.profileStatus === 'Published').length,
  readyForReview: items.filter((project) => project.profileStatus === 'Ready for review').length,
  awaitingInformation: items.filter(
    (project) => project.profileStatus === 'Awaiting information',
  ).length,
});

export const filterProjects = (
  items: Project[],
  query: string,
  status: ProfileStatusFilter,
  category: string,
) => {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((project) => {
    const searchable = [
      project.name,
      project.description,
      project.category,
      project.groupLabel,
      project.ventureType,
      project.profileStatus,
      project.contactPerson,
      ...project.members,
    ]
      .join(' ')
      .toLowerCase();

    return (
      (!normalizedQuery || searchable.includes(normalizedQuery)) &&
      (status === 'All' || project.profileStatus === status) &&
      (category === 'All Categories' || project.category === category)
    );
  });
};
