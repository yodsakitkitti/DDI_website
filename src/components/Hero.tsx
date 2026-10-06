import { useState } from "react";
import { projects, type SiteContent } from "../content/siteContent";
import { Arrow, Spark } from "./Icons";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export function Hero({ content }: { content: SiteContent }) {
  const spotlight = projects.filter((project) => project.isNew);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = spotlight[activeIndex] ?? projects[0];

  return (
    <div className="home-page">
      <SiteHeader />
      <main>
        <div
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(7, 9, 17, 0.98) 0%, rgba(7, 9, 17, 0.94) 38%, rgba(7, 9, 17, 0.86) 100%), url(${content.heroImageSrc})`,
          }}
        >
          <section className="hero wrap" aria-labelledby="hero-heading">
            <div className="hero__content">
              <p className="eyebrow">
                <span className="live-dot" /> A playground for what's next
              </p>
              <h1 id="hero-heading">
                Where ideas <br />
                become <br />
                <span>
                  innovation
                  <svg
                    viewBox="0 0 500 25"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M3 16Q240-5 497 10M40 24Q260 5 460 19" />
                  </svg>
                </span>
                <span className="hero__period">.</span>
              </h1>
              <p className="hero__description">
                A little curiosity. A bold idea. A real possibility.
                <br />
                Meet the student ventures turning everyday challenges into
                something extraordinary.
              </p>
              <div className="hero__actions">
                <a className="button button--red" href="/#/dashboard">
                  View Group Projects <Arrow diagonal />
                </a>
                <a className="text-link" href="#about">
                  Inside the Sandbox <span>↓</span>
                </a>
              </div>
              <div className="hero__social-proof">
                <span className="mini-marks" aria-hidden="true">
                  <span><Spark /></span>
                  <span><Arrow diagonal /></span>
                  <span><Spark /></span>
                </span>
                <p>
                  <strong>{projects.length} teams. Endless possibilities.</strong>
                  <br />
                  Made by the next generation of innovators.
                </p>
              </div>
            </div>
            <div className="spotlight" aria-label="New venture spotlight">
              <svg className="cyber-sigil" viewBox="0 0 600 600" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sigil-color" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#45dede" /><stop offset="0.55" stopColor="#9f51e8" /><stop offset="1" stopColor="#e94fc9" />
                  </linearGradient>
                </defs>
                <g stroke="url(#sigil-color)" strokeWidth="2">
                  <circle cx="300" cy="300" r="254" strokeDasharray="2 12" />
                  <path d="M300 24 542 164 542 436 300 576 58 436 58 164Z" />
                  <path d="M300 68C260 150 134 108 110 238C90 334 168 426 300 530C432 426 510 334 490 238C466 108 340 150 300 68Z" />
                  <path d="M300 96C280 176 178 152 150 232L218 214 190 278 248 262 300 368 352 262 410 278 382 214 450 232C422 152 320 176 300 96Z" />
                  <path d="M80 300 150 324 120 360 200 386 184 426 260 458 300 514 340 458 416 426 400 386 480 360 450 324 520 300M300 24V96M58 164 110 196M542 164 490 196M58 436 126 404M542 436 474 404" />
                  <path d="M190 152 164 100 234 134M410 152 436 100 366 134M220 440 242 394 300 426 358 394 380 440" />
                  <circle cx="300" cy="68" r="6" /><circle cx="80" cy="300" r="6" /><circle cx="520" cy="300" r="6" />
                </g>
              </svg>
              <div className="spotlight__orbit spotlight__orbit--one" />
              <div className="spotlight__orbit spotlight__orbit--two" />
              <span className="spotlight__note">
                Signal / 001
                <br />
                <span>Independent minds. Shared momentum.</span>
                <svg viewBox="0 0 80 60" aria-hidden="true">
                  <path d="M5 6q65-8 60 39m-13-9 13 11 12-12" />
                </svg>
              </span>
              <span className="idea-sticker">
                <Spark /> Fresh
                <br />
                perspectives
              </span>
              <div
                className={`spotlight-card theme-${active.id}`}
                key={active.id}
              >
                <div className="spotlight-card__top">
                  <span>
                    <span className="live-dot" /> In the spotlight
                  </span>
                  <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
                </div>
                <div className="spotlight-card__art">
                  <img src={active.logoSrc} alt={`${active.name} logo`} />
                </div>
                <div className="spotlight-card__info">
                  <div>
                    <span className="eyebrow">{active.category}</span>
                    <h2>{active.name}</h2>
                  </div>
                  <a
                    className="circle-button"
                    href={`/#/dashboard/${active.id}`}
                    aria-label={`Explore ${active.name}`}
                  >
                    <Arrow diagonal />
                  </a>
                </div>
                <p>{active.summary}</p>
              </div>
              <span className="spotlight__floating-arrow" aria-hidden="true">
                ↗
              </span>
              <div className="spotlight-controls">
                <span>Take a little look around</span>
                <div role="group" aria-label="Choose a spotlight venture">
                  {spotlight.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Spotlight ${project.name}`}
                      aria-pressed={index === activeIndex}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
                <button
                  className="circle-button"
                  type="button"
                  aria-label="Next spotlight venture"
                  onClick={() =>
                    setActiveIndex((index) => (index + 1) % spotlight.length)
                  }
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </section>
        </div>
        <div className="idea-strip" aria-hidden="true">
          <span>Ideas worth exploring</span>
          <Spark />
          <span>People making things happen</span>
          <Spark />
          <span>A little different. A lot of potential.</span>
          <Spark />
        </div>
        <section className="new-ventures wrap" aria-labelledby="new-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">New around here</p>
              <h2 id="new-title">
                Fresh faces. <br />
                <span>Forward thinking.</span>
              </h2>
            </div>
            <p>
              Four new teams. Four different perspectives.
              <br />
              Get to know the newest ideas in the Sandbox.
            </p>
            <a className="text-link" href="/#/dashboard">
              Meet all {projects.length} ventures <Arrow diagonal />
            </a>
          </div>
          <div className="new-venture-grid">
            {spotlight.map((project, index) => (
              <a
                href={`/#/dashboard/${project.id}`}
                className={`new-venture theme-${project.id}`}
                key={project.id}
              >
                <div className="new-venture__art">
                  <span className="new-venture__number">0{index + 1}</span>
                  <img
                    src={project.logoSrc}
                    alt={`${project.name} logo`}
                    loading="lazy"
                  />
                  <span className="new-venture__arrow">
                    <Arrow diagonal />
                  </span>
                </div>
                <div className="new-venture__heading">
                  <h3>{project.name}</h3>
                  <span>{project.category}</span>
                </div>
                <p>{project.summary}</p>
              </a>
            ))}
          </div>
        </section>
        <section
          className="about wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about__graphic" aria-hidden="true">
            <span>
              WHAT
              <br />
              IF<span className="about__question">?</span>
            </span>
            <Spark />
            <small>That's where it all starts.</small>
          </div>
          <div className="about__content">
            <p className="eyebrow">This is DDI Sandbox</p>
            <h2 id="about-title">
              Room to experiment. <br />
              <span>Space to make a difference.</span>
            </h2>
            <p>{content.description}</p>
            <div className="about__affiliation">
              <img
                src={content.universityLogoSrc}
                alt="Assumption University of Thailand"
              />
              <img src={content.ddiLogoSrc} alt={content.ddiLogoAlt} />
              <div>
                <strong>Design &amp; Digital Innovation</strong>
                <small>Assumption University of Thailand</small>
              </div>
            </div>
            <div className="about__steps">
              <div>
                <span>01</span>
                <strong>Question the everyday</strong>
                <p>Find a real challenge worth solving.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Build the possibility</strong>
                <p>Bring a fresh perspective to life.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Make your mark</strong>
                <p>Turn learning into real-world impact.</p>
              </div>
            </div>
            <a className="text-link" href="/#/dashboard">
              See what we're building <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
