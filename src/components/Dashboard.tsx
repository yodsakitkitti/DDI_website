import { useMemo, useRef, useState } from 'react';
import {
  filterProjects,
  getDashboardSummary,
  type DashboardContent,
  type Project,
  type ProjectStatusFilter,
} from '../content/siteContent';
import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';

interface DashboardProps {
  content: DashboardContent;
  projects: Project[];
}

export function Dashboard({ content, projects }: DashboardProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ProjectStatusFilter>('All');
  const [category, setCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lastViewDemoTrigger = useRef<HTMLButtonElement | null>(null);

  const summary = getDashboardSummary(projects);
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const visibleProjects = filterProjects(
    projects,
    query,
    status,
    category ?? 'All Categories',
  );
  const projectCountLabel =
    visibleProjects.length === 1 ? content.projectCount.singular : content.projectCount.plural;
  const summaryCards = [
    { label: content.summaryLabels.total, value: summary.total },
    { label: content.summaryLabels.completed, value: summary.completed },
    { label: content.summaryLabels.inProgress, value: summary.inProgress },
    { label: content.summaryLabels.averageProgress, value: `${summary.averageProgress}%` },
  ];

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
          <span className="dashboard__example-label">{content.mockDataLabel}</span>
        </section>

        <section className="summary-grid" aria-label={content.summaryAriaLabel}>
          {summaryCards.map((card) => (
            <article className="summary-card" key={card.label}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
        </section>

        <section className="dashboard__projects" aria-labelledby="projects-title">
          <div className="dashboard__section-heading">
            <div>
              <p className="dashboard__eyebrow">{content.projectsEyebrow}</p>
              <h2 id="projects-title">{content.projectsTitle}</h2>
            </div>
            <p role="status" aria-live="polite" aria-atomic="true">
              {visibleProjects.length} {projectCountLabel}
            </p>
          </div>

          <div className="project-toolbar">
            <label className="project-search">
              <span>{content.searchLabel}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={content.searchPlaceholder}
              />
            </label>

            <div
              className="project-filters"
              role="group"
              aria-label={content.statusFilterLabel}
            >
              {content.statusOptions.map((option) => (
                <button
                  type="button"
                  className={status === option.value ? 'is-active' : undefined}
                  aria-pressed={status === option.value}
                  onClick={() => setStatus(option.value)}
                  key={option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <label className="project-category">
              <span>{content.categoryLabel}</span>
              <select
                value={category ?? ''}
                onChange={(event) => setCategory(event.target.value || null)}
              >
                <option value="">{content.allCategoriesLabel}</option>
                {categories.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          {visibleProjects.length ? (
            <div className="project-grid">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  content={content.card}
                  exampleProjectLabel={content.exampleProjectLabel}
                  onView={(event) => {
                    lastViewDemoTrigger.current = event.currentTarget;
                    setSelectedProject(project);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="project-empty">
              <strong>{content.noResultsTitle}</strong>
              <span>{content.noResultsHint}</span>
            </div>
          )}
        </section>
      </div>

      {selectedProject ? (
        <ProjectDetail
          project={selectedProject}
          content={content.detail}
          exampleProjectLabel={content.exampleProjectLabel}
          returnFocusTo={lastViewDemoTrigger.current}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </main>
  );
}
