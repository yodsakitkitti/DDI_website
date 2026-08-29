export type VentureType = 'Active team' | 'Alumni venture';
export type ProfileStatus = 'Awaiting information' | 'Ready for review' | 'Published';
export type ProfileStatusFilter = 'All' | ProfileStatus;

export interface Project {
  id: string;
  groupLabel: string;
  name: string;
  ventureType: VentureType;
  profileStatus: ProfileStatus;
  description: string;
  members: string[];
  contactPerson: string;
  semester: string;
  category: string;
  technologies: string[];
  websiteUrl?: string;
}

const awaitingProfile = (
  id: string,
  groupLabel: string,
  name: string,
  ventureType: VentureType,
): Project => ({
  id,
  groupLabel,
  name,
  ventureType,
  profileStatus: 'Awaiting information',
  description: 'Awaiting verified team information.',
  members: [],
  contactPerson: 'To be confirmed',
  semester: ventureType === 'Active team' ? 'Current semester' : 'Alumni',
  category: 'To be confirmed',
  technologies: [],
});

// Replace each placeholder with verified content after reviewing the private collection sheet.
export const projects: Project[] = [
  ...Array.from({ length: 14 }, (_, index) => {
    const teamNumber = String(index + 1).padStart(2, '0');
    return awaitingProfile(
      `active-team-${teamNumber}`,
      `Active team ${teamNumber}`,
      `Active Team ${teamNumber}`,
      'Active team',
    );
  }),
  awaitingProfile('zeri', 'Alumni venture', 'Zeri', 'Alumni venture'),
  awaitingProfile('zensation', 'Alumni venture', 'Zensation', 'Alumni venture'),
];
