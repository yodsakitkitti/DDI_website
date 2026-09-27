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
  return (
    <article className="project-card">
      {project.logoSrc ? (
        <img className="project-card__logo" src={project.logoSrc} alt={`${project.name} logo`} loading="lazy" />
      ) : null}

      <div className="project-card__heading">
        <div>
          <span className="project-card__example">{profileLabel}</span>
          <h3>{project.name}</h3>
        </div>
        <span className="project-card__category">{project.category}</span>
      </div>

      <p className="project-card__description">{project.description}</p>

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
