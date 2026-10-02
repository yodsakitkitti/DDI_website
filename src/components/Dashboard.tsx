import { useEffect, useRef, useState } from "react";
import type { DashboardContent, Project } from "../content/siteContent";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";
import { Arrow, Bookmark, SearchIcon, Spark, ViewIcon } from "./Icons";
import { SiteFooter, SiteHeader } from "./SiteChrome";

interface DashboardProps {
  content: DashboardContent;
  projects: Project[];
  initialProjectId?: string;
}
const savedKey = "ddi-saved-projects";

export function Dashboard({
  content,
  projects,
  initialProjectId,
}: DashboardProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    () => projects.find((project) => project.id === initialProjectId) ?? null,
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All ventures");
  const [savedOnly, setSavedOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(savedKey) ?? "[]");
      return Array.isArray(value)
        ? value.filter(
            (id): id is string =>
              typeof id === "string" &&
              projects.some((project) => project.id === id),
          )
        : [];
    } catch {
      return [];
    }
  });
  const [storageNote, setStorageNote] = useState("");
  const lastProfileTrigger = useRef<HTMLButtonElement | null>(null);
  const dashboardTitleRef = useRef<HTMLHeadingElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const categories = [
    "All ventures",
    ...new Set(projects.map((project) => project.category)),
  ];
  const visibleProjects = projects.filter((project) => {
    const searchable =
      `${project.name} ${project.category} ${project.description} ${project.descriptionTh ?? ""}`.toLocaleLowerCase();
    return (
      (category === "All ventures" || project.category === category) &&
      (!savedOnly || saved.includes(project.id)) &&
      searchable.includes(query.trim().toLocaleLowerCase())
    );
  });

  useEffect(() => {
    lastProfileTrigger.current = null;
    setSelectedProject(
      projects.find((project) => project.id === initialProjectId) ?? null,
    );
  }, [initialProjectId, projects]);

  const toggleSave = (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((value) => value !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem(savedKey, JSON.stringify(next));
    } catch {
      setStorageNote(
        "Your saved ventures are available for this visit. This browser could not store them for next time.",
      );
    }
  };
  const clearSearch = () => {
    setQuery("");
    searchRef.current?.focus();
  };
  const resetFilters = () => {
    clearSearch();
    setCategory("All ventures");
    setSavedOnly(false);
  };
  const closeProject = () => {
    setSelectedProject(null);
    if (initialProjectId) {
      window.history.replaceState(null, "", "#/dashboard");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  return (
    <div className="dashboard">
      <div inert={selectedProject !== null}>
        <SiteHeader active="projects" />
        <main className="wrap dashboard__workspace">
          <section
            className="dashboard__intro"
            aria-labelledby="dashboard-title"
          >
            <div>
              <p className="eyebrow">
                <span className="live-dot" /> The DDI venture collective
              </p>
              <h1 ref={dashboardTitleRef} tabIndex={-1} id="dashboard-title">
                Project{" "}
                <span>
                  Dashboard<span className="red-period">.</span>
                </span>
              </h1>
              <p>
                Big ideas come from curious minds.
                <br />
                Discover {projects.length} student teams reimagining the
                everyday.
              </p>
            </div>
            <div className="venture-count">
              <Spark />
              <strong>{String(projects.length).padStart(2, "0")}</strong>
              <span>
                different ideas.
                <br />
                one shared ambition.
              </span>
            </div>
          </section>
          <section
            className="dashboard__projects"
            aria-labelledby="projects-title"
          >
            <div className="explorer-heading">
              <div>
                <p className="eyebrow">Find your spark</p>
                <h2 id="projects-title">Explore the ventures</h2>
              </div>
              <button
                className="surprise-button"
                type="button"
                onClick={(event) => {
                  lastProfileTrigger.current = event.currentTarget;
                  setSelectedProject(
                    projects[Math.floor(Math.random() * projects.length)],
                  );
                }}
              >
                <Spark /> Surprise me <Arrow diagonal />
              </button>
            </div>
            <div className="project-toolbar">
              <div className="project-search">
                <SearchIcon />
                <input
                  ref={searchRef}
                  type="search"
                  aria-label="Search ventures"
                  placeholder="An idea, a name, a possibility…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
              <button
                className={`saved-filter ${savedOnly ? "is-active" : ""}`}
                type="button"
                aria-label="Saved"
                aria-pressed={savedOnly}
                onClick={() => setSavedOnly(!savedOnly)}
              >
                <Bookmark filled={savedOnly} /> Saved{" "}
                <span aria-hidden="true">{saved.length}</span>
              </button>
              <div
                className="view-switch"
                role="group"
                aria-label="Gallery layout"
              >
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  <ViewIcon />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <ViewIcon list />
                </button>
              </div>
            </div>
            <div
              className="project-filters"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-label={value}
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                >
                  {value}
                  {value === "All ventures" && (
                    <span aria-hidden="true">{projects.length}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="results-line">
              <p role="status">
                Showing <strong>{visibleProjects.length}</strong> of{" "}
                {projects.length} ventures
                {savedOnly ? " · Your saved collection" : ""}
              </p>
              <span>
                Curiosity looks good on you. <Spark />
              </span>
            </div>
            {storageNote && (
              <p className="storage-note" role="status">
                {storageNote}
              </p>
            )}
            {visibleProjects.length ? (
              <div
                className={`project-grid ${view === "list" ? "project-grid--list" : ""}`}
              >
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    content={content.card}
                    profileLabel={content.profileLabel}
                    index={projects.indexOf(project) + 1}
                    saved={saved.includes(project.id)}
                    onSave={() => toggleSave(project.id)}
                    onView={(event) => {
                      lastProfileTrigger.current = event.currentTarget;
                      setSelectedProject(project);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="project-empty">
                <Spark />
                <h3>No ventures found</h3>
                <p>Try another idea, or open up your search.</p>
                <button
                  type="button"
                  className="button button--dark"
                  onClick={resetFilters}
                >
                  Reset filters <Arrow />
                </button>
              </div>
            )}
            <div className="explorer-end">
              <span className="end-line" />
              <Spark />
              <p>
                {visibleProjects.length
                  ? "Every big thing starts with a little idea."
                  : "Your next great discovery is out there."}
              </p>
              <span className="end-line" />
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          content={content.detail}
          profileLabel={content.profileLabel}
          returnFocusTo={lastProfileTrigger.current}
          fallbackFocusRef={dashboardTitleRef}
          onClose={closeProject}
        />
      )}
    </div>
  );
}
