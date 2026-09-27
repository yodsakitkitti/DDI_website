import { useRef, useState } from 'react';
import type { DashboardContent, Project } from '../content/siteContent';
import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';

interface DashboardProps {
  content: DashboardContent;
  projects: Project[];
}

export function Dashboard({ content, projects }: DashboardProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lastProfileTrigger = useRef<HTMLButtonElement | null>(null);

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-inner">
          <a className="dashboard__brand" href="/#/" aria-label={content.brandHomeLabel}>
            <span className="dashboard__mark" aria-hidden="true">
              DDI
            </span>
            <span>
              <strong>{content.brandName}</strong>
              <small>{content.brandSection}</small>
            </span>
          </a>
          <div className="dashboard__header-meta">
            <span>{content.academicYear}</span>
            <a href="/#/">{content.homeLabel}</a>
          </div>
        </div>
      </header>

      <div className="dashboard__workspace">
        <section className="dashboard__intro" aria-labelledby="dashboard-title">
          <div>
            <p className="dashboard__eyebrow">{content.eyebrow}</p>
            <h1 id="dashboard-title">{content.title}</h1>
            <p>{content.subtitle}</p>
          </div>
        </section>

        <section className="dashboard__projects" aria-labelledby="projects-title">
          <div className="dashboard__section-heading">
            <div>
              <p className="dashboard__eyebrow">{content.projectsEyebrow}</p>
              <h2 id="projects-title">{content.projectsTitle}</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                content={content.card}
                profileLabel={content.profileLabel}
                onView={(event) => {
                  lastProfileTrigger.current = event.currentTarget;
                  setSelectedProject(project);
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedProject ? (
        <ProjectDetail
          project={selectedProject}
          content={content.detail}
          profileLabel={content.profileLabel}
          returnFocusTo={lastProfileTrigger.current}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </main>
  );
}
