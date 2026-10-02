import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import type { DashboardDetailContent, Project } from "../content/siteContent";
import { Arrow } from "./Icons";

interface ProjectDetailProps {
  content: DashboardDetailContent;
  profileLabel: string;
  project: Project;
  returnFocusTo: HTMLElement | null;
  fallbackFocusRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export function ProjectDetail({
  content,
  profileLabel,
  project,
  returnFocusTo,
  fallbackFocusRef,
  onClose,
}: ProjectDetailProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keepFocusInside = (event: FocusEvent) => {
      if (
        dialogRef.current &&
        event.target instanceof Node &&
        !dialogRef.current.contains(event.target)
      ) {
        closeButtonRef.current?.focus();
      }
    };

    closeButtonRef.current?.focus();
    document.addEventListener("focusin", keepFocusInside);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("focusin", keepFocusInside);
      const focusTarget = returnFocusTo?.isConnected
        ? returnFocusTo
        : fallbackFocusRef.current;
      focusTarget?.focus();
    };
  }, [returnFocusTo, fallbackFocusRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div
      className="project-detail-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className={`project-detail theme-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        onKeyDown={handleKeyDown}
      >
        <div className="project-detail__header">
          <div>
            <span className="project-detail__example">{profileLabel}</span>
            <h2>{project.name}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className="project-detail__close"
            type="button"
            aria-label={content.closeLabel}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {project.logoSrc ? (
          <div className="project-detail__art">
            <img
              className="project-detail__logo"
              src={project.logoSrc}
              alt={`${project.name} logo`}
            />
          </div>
        ) : null}

        <span className="project-detail__group">{project.category}</span>
        <h3 className="project-detail__tagline">{project.summary}</h3>
        <p className="project-detail__description">{project.description}</p>
        {project.descriptionTh ? (
          <div className="project-detail__section" lang="th">
            <h3>ภาษาไทย</h3>
            <p className="project-detail__description">
              {project.descriptionTh}
            </p>
          </div>
        ) : null}

        {project.teamImageSrc && (
          <figure className="project-detail__team">
            <img
              src={project.teamImageSrc}
              alt="The MEGURI team in matching pink jackets"
              loading="lazy"
            />
            <figcaption>The people behind MEGURI</figcaption>
          </figure>
        )}
        <div className="project-detail__footer">
          <span>Part of the DDI Sandbox collective</span>
          <button type="button" className="text-link" onClick={onClose}>
            Back to ventures <Arrow />
          </button>
        </div>
      </section>
    </div>
  );
}
