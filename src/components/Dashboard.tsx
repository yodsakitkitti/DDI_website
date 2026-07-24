import { useMemo, useState } from 'react';
import {
  filterProjects,
  getDashboardSummary,
  type Project,
  type ProjectStatus,
} from '../content/siteContent';
import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';

const statuses: Array<'All' | ProjectStatus> = [
  'All',
  'Completed',
  'In Progress',
  'Review',
  'Planning',
];

export function Dashboard({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All' | ProjectStatus>('All');
  const [category, setCategory] = useState('All Categories');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const summary = getDashboardSummary(projects);
  const categories = useMemo(
    () => ['All Categories', ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const visibleProjects = filterProjects(projects, query, status, category);
  const summaryCards = [
    { label: 'Total Projects', value: summary.total },
    { label: 'Completed', value: summary.completed },
    { label: 'In Progress', value: summary.inProgress },
    { label: 'Average Progress', value: `${summary.averageProgress}%` },
  ];

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-inner">
          <a className="dashboard__brand" href="/" aria-label="DDI Sandbox home">
            <span className="dashboard__mark" aria-hidden="true">
              DDI
            </span>
            <span>
              <strong>DDI Sandbox</strong>
              <small>Project Dashboard</small>
            </span>
          </a>
          <div className="dashboard__header-meta">
            <span>Academic Year 2025–2026</span>
            <a href="/">Home</a>
          </div>
        </div>
      </header>

      <div className="dashboard__workspace">
        <section className="dashboard__intro" aria-labelledby="dashboard-title">
          <div>
            <p className="dashboard__eyebrow">DDI Sandbox showcase</p>
            <h1 id="dashboard-title">Project Dashboard</h1>
            <p>
              Explore an example student project created to demonstrate this dashboard experience.
            </p>
          </div>
          <span className="dashboard__example-label">Mock data</span>
        </section>

        <section className="summary-grid" aria-label="Project summary">
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
              <p className="dashboard__eyebrow">Example records</p>
              <h2 id="projects-title">Group Projects</h2>
            </div>
            <p>{visibleProjects.length} mock project</p>
          </div>

          <div className="project-toolbar">
            <label className="project-search">
              <span>Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects"
              />
            </label>

            <div className="project-filters" aria-label="Filter projects by status">
              {statuses.map((option) => (
                <button
                  type="button"
                  className={status === option ? 'is-active' : undefined}
                  aria-pressed={status === option}
                  onClick={() => setStatus(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>

            <label className="project-category">
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
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
                  onView={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="project-empty">
              <strong>No mock projects match your filters.</strong>
              <span>Try a different search, status, or category.</span>
            </div>
          )}
        </section>
      </div>

      {selectedProject ? (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </main>
  );
}
