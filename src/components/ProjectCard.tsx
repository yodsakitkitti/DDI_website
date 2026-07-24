import type { MouseEvent } from 'react';
import type { DashboardCardContent, Project } from '../content/siteContent';

interface ProjectCardProps {
  content: DashboardCardContent;
  exampleProjectLabel: string;
  project: Project;
  onView: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ProjectCard({
  content,
  exampleProjectLabel,
  project,
  onView,
}: ProjectCardProps) {
  const statusClass = project.status.toLowerCase().replace(/ /g, '-');
  const memberLabel =
    project.members.length === 1 ? content.memberSingular : content.memberPlural;

  return (
    <article className="project-card">
      <div className="project-card__topline">
        <span className="project-card__group">{project.groupLabel}</span>
        <span className={`status-pill status-pill--${statusClass}`}>{project.status}</span>
      </div>

      <div className="project-card__heading">
        <div>
          <span className="project-card__example">{exampleProjectLabel}</span>
          <h3>{project.name}</h3>
        </div>
        <span className="project-card__category">{project.category}</span>
      </div>

      <p className="project-card__description">{project.description}</p>

      <div className="project-progress">
        <div className="project-progress__label">
          <span>{content.progressLabel}</span>
          <strong>{project.progress}%</strong>
        </div>
        <div
          className="project-progress__track"
          role="progressbar"
          aria-label={`${project.name} ${content.progressLabel.toLowerCase()}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={project.progress}
        >
          <span style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <dl className="project-card__facts">
        <div>
          <dt>{content.teamLabel}</dt>
          <dd>
            {project.members.length} {memberLabel}
          </dd>
        </div>
        <div>
          <dt>{content.dueDateLabel}</dt>
          <dd>{project.dueDate}</dd>
        </div>
      </dl>

      <div className="technology-list" aria-label={content.technologiesLabel}>
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      <button
        className="project-card__action"
        type="button"
        aria-label={`${content.viewDemoLabel} for ${project.name}`}
        onClick={onView}
      >
        {content.viewDemoLabel}
      </button>
    </article>
  );
}
