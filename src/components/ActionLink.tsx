import type { SiteAction } from '../content/siteContent';

export function ActionLink({ action }: { action: SiteAction }) {
  const className = `action action--${action.variant}`;

  if (!action.isPublished) {
    return (
      <button className={className} type="button" disabled>
        {action.label}
        <span className="sr-only"> — Coming soon</span>
      </button>
    );
  }

  return (
    <a className={className} href={action.href}>
      {action.label}
    </a>
  );
}
