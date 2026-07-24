import {
  visibleActions,
  type SiteContent,
} from '../content/siteContent';
import { ActionLink } from './ActionLink';

export function Hero({ content }: { content: SiteContent }) {
  return (
    <main
      className="hero"
      style={{ backgroundImage: `url(${content.heroImageSrc})` }}
    >
      <header className="hero__brand">
        <img
          className="hero__university-logo"
          src={content.universityLogoSrc}
          alt={content.universityLogoAlt}
        />
        <img
          className="hero__ddi-logo"
          src={content.ddiLogoSrc}
          alt={content.ddiLogoAlt}
        />
      </header>

      <section className="hero__content" aria-labelledby="hero-heading">
        <p className="hero__eyebrow">{content.eyebrow}</p>
        <h1 id="hero-heading">
          {content.headingStart}{' '}
          <span>{content.headingAccent}</span>
        </h1>
        <p className="hero__description">{content.description}</p>
        <nav className="hero__actions" aria-label="Sandbox actions">
          {visibleActions(content.actions).map((action) => (
            <ActionLink key={action.label} action={action} />
          ))}
        </nav>
      </section>
    </main>
  );
}
