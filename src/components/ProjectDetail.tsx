import { useEffect, useRef, type KeyboardEvent } from 'react';
import type { Project } from '../content/siteContent';

interface ProjectDetailProps {
  project: Project;
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
}

export function ProjectDetail({ project, returnFocusTo, onClose }: ProjectDetailProps) {
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
            <span className="project-detail__example">Example project</span>
            <h2>{project.name}</h2>
          </div>
          <button
            ref={closeButtonRef}
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
