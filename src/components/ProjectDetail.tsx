import { useEffect, useRef, type KeyboardEvent } from 'react';
import type { DashboardDetailContent, Project } from '../content/siteContent';

interface ProjectDetailProps {
  content: DashboardDetailContent;
  profileLabel: string;
  project: Project;
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
}

export function ProjectDetail({
  content,
  profileLabel,
  project,
  returnFocusTo,
  onClose,
}: ProjectDetailProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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
    document.addEventListener('focusin', keepFocusInside);

    return () => {
      document.removeEventListener('focusin', keepFocusInside);
      returnFocusTo?.focus();
    };
  }, [returnFocusTo]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
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
    <div className="project-detail-backdrop">
      <section
        ref={dialogRef}
        className="project-detail"
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
          <img className="project-detail__logo" src={project.logoSrc} alt={`${project.name} logo`} />
        ) : null}

        <span className="project-detail__group">{project.category}</span>
        <p className="project-detail__description">{project.description}</p>
        {project.descriptionTh ? (
          <div className="project-detail__section" lang="th">
            <h3>ภาษาไทย</h3>
            <p className="project-detail__description">{project.descriptionTh}</p>
          </div>
        ) : null}

      </section>
    </div>
  );
}
