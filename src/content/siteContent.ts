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

export { projects } from './ventureProfiles';
export type { Project } from './ventureProfiles';

export interface DashboardCardContent {
  viewProfileLabel: string;
}

export interface DashboardDetailContent {
  closeLabel: string;
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
  profileLabel: string;
  projectsEyebrow: string;
  projectsTitle: string;
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
  subtitle: 'Meet the six active teams turning ideas into products, platforms, and real-world impact.',
  profileLabel: 'Venture profile',
  projectsEyebrow: 'Our active teams',
  projectsTitle: 'Explore the ventures',
  card: { viewProfileLabel: 'View Profile' },
  detail: { closeLabel: 'Close project details' },
};
