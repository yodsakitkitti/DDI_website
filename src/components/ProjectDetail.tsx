import type { Project } from '../content/siteContent';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <div className="project-detail-backdrop">
      <section
        className="project-detail"
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
      >
        <div className="project-detail__header">
          <div>
            <span className="project-detail__example">Example project</span>
            <h2>{project.name}</h2>
          </div>
          <button
            className="project-detail__close"
            type="button"
            aria-label="Close project details"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <span className="project-detail__group">{project.groupLabel}</span>
        <p>{project.description}</p>

        <dl className="project-detail__facts">
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Progress</dt>
            <dd>{project.progress}%</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Due date</dt>
            <dd>{project.dueDate}</dd>
          </div>
        </dl>

        <div className="project-detail__section">
          <h3>Project team</h3>
          <p>{project.members.join(', ')}</p>
        </div>
        <div className="project-detail__section">
          <h3>Technology stack</h3>
          <div className="technology-list">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>

        <p className="project-detail__notice">
          This local preview uses mock content and does not connect to an external demo.
        </p>
      </section>
    </div>
  );
}
