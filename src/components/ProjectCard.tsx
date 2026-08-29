import type { MouseEvent } from 'react';
import type { DashboardCardContent, Project } from '../content/siteContent';

interface ProjectCardProps {
  content: DashboardCardContent;
  profileLabel: string;
  project: Project;
  onView: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ProjectCard({
  content,
  profileLabel,
  project,
  onView,
}: ProjectCardProps) {
  const statusClass = project.profileStatus.toLowerCase().replace(/ /g, '-');
  const memberLabel =
    project.members.length === 1 ? content.memberSingular : content.memberPlural;

  return (
    <article className="project-card">
      <div className="project-card__topline">
        <span className="project-card__group">{project.groupLabel}</span>
        <span className={`status-pill status-pill--${statusClass}`}>{project.profileStatus}</span>
      </div>

      <div className="project-card__heading">
        <div>
          <span className="project-card__example">{profileLabel}</span>
          <h3>{project.name}</h3>
        </div>
        <span className="project-card__category">{project.category}</span>
      </div>

      <p className="project-card__description">{project.description}</p>

      <dl className="project-card__facts">
        <div>
          <dt>{content.ventureTypeLabel}</dt>
          <dd>{project.ventureType}</dd>
        </div>
        <div>
          <dt>{content.teamLabel}</dt>
          <dd>
            {project.members.length
              ? `${project.members.length} ${memberLabel}`
              : content.memberUnknownLabel}
          </dd>
        </div>
      </dl>

      {project.technologies.length ? (
        <div className="technology-list" aria-label={content.technologiesLabel}>
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      ) : null}

      <button
        className="project-card__action"
        type="button"
        aria-label={`${content.viewProfileLabel} for ${project.name}`}
        onClick={onView}
      >
        {content.viewProfileLabel}
      </button>
    </article>
  );
}
