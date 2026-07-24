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
    { label: 'View Group Projects', href: '#projects', variant: 'primary', isPublished: false },
    { label: 'Learn more about the Sandbox', href: '#about', variant: 'secondary', isPublished: false },
  ],
};
