import type { Project } from '../content/siteContent';

interface ProjectCardProps {
  project: Project;
  onView: () => void;
}

export function ProjectCard({ project, onView }: ProjectCardProps) {
  const statusClass = project.status.toLowerCase().replace(/ /g, '-');

  return (
    <article className="project-card">
      <div className="project-card__topline">
        <span className="project-card__group">{project.groupLabel}</span>
        <span className={`status-pill status-pill--${statusClass}`}>{project.status}</span>
      </div>

      <div className="project-card__heading">
        <div>
          <span className="project-card__example">Example project</span>
          <h3>{project.name}</h3>
        </div>
        <span className="project-card__category">{project.category}</span>
      </div>

      <p className="project-card__description">{project.description}</p>

      <div className="project-progress">
        <div className="project-progress__label">
          <span>Progress</span>
          <strong>{project.progress}%</strong>
        </div>
        <div
          className="project-progress__track"
          role="progressbar"
          aria-label={`${project.name} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={project.progress}
        >
          <span style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <dl className="project-card__facts">
        <div>
          <dt>Team</dt>
          <dd>{project.members.length} members</dd>
        </div>
        <div>
          <dt>Due date</dt>
          <dd>{project.dueDate}</dd>
        </div>
      </dl>

      <div className="technology-list" aria-label="Technologies">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      <button
        className="project-card__action"
        type="button"
        aria-label={`View demo for ${project.name}`}
        onClick={onView}
      >
        View Demo
      </button>
    </article>
  );
}
