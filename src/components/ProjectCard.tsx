import type { MouseEvent } from "react";
import type { DashboardCardContent, Project } from "../content/siteContent";
import { Arrow, Bookmark } from "./Icons";

interface ProjectCardProps {
  content: DashboardCardContent;
  profileLabel: string;
  project: Project;
  index: number;
  saved: boolean;
  onSave: () => void;
  onView: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ProjectCard({
  content,
  project,
  index,
  saved,
  onSave,
  onView,
}: ProjectCardProps) {
  return (
    <article className={`project-card theme-${project.id}`}>
      <div className="project-card__visual">
        <div className="project-card__topline">
          <span className="project-card__number">
            {String(index).padStart(2, "0")}
          </span>
          {project.isNew && (
            <span className="new-badge">
              New to the Sandbox <span>↗</span>
            </span>
          )}
          <button
            className="save-button"
            type="button"
            aria-label={`${saved ? "Unsave" : "Save"} ${project.name}`}
            aria-pressed={saved}
            onClick={onSave}
          >
            <Bookmark filled={saved} />
          </button>
        </div>
        <img
          className="project-card__logo"
          src={project.logoSrc}
          alt={`${project.name} logo`}
          loading="lazy"
        />
      </div>
      <div className="project-card__body">
        <span className="project-card__category">{project.category}</span>
        <h3>{project.name}</h3>
        <p className="project-card__description">
          {project.summary ?? project.description}
        </p>
        <button
          className="project-card__action"
          type="button"
          aria-label={`${content.viewProfileLabel} for ${project.name}`}
          onClick={onView}
        >
          <span>{content.viewProfileLabel}</span>
          <Arrow diagonal />
        </button>
      </div>
    </article>
  );
}
