import { Arrow, Spark } from "./Icons";
import { siteContent } from "../content/siteContent";

export function SiteHeader({
  active = "home",
}: {
  active?: "home" | "projects";
}) {
  return (
    <header className="site-header">
      <div className="site-header__inner wrap">
        <a className="site-brand" href="/#/" aria-label="DDI Sandbox home">
          <img
            className="site-brand__university"
            src={siteContent.universityLogoSrc}
            alt="Assumption University of Thailand"
            width="64"
            height="64"
          />
          <span className="site-brand__divider" aria-hidden="true" />
          <img
            className="site-brand__ddi"
            src={siteContent.ddiLogoSrc}
            alt={siteContent.ddiLogoAlt}
            width="48"
            height="48"
          />
          <span className="site-brand__name">
            sandbox<span>Ideas in motion.</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="/#/" aria-current={active === "home" ? "page" : undefined}>
            The Sandbox
          </a>
          <a
            href="/#/dashboard"
            aria-current={active === "projects" ? "page" : undefined}
          >
            Our ventures <span className="nav-dot" />
          </a>
        </nav>
        <a
          className="header-cta"
          href={active === "home" ? "/#/dashboard" : "/#about"}
        >
          {active === "home" ? "Meet the makers" : "About the Sandbox"}
          <Arrow diagonal />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <p className="eyebrow">Built on curiosity. Driven by possibility.</p>
          <a href="/#/" className="footer-wordmark">
            Keep thinking<span>forward.</span>
            <Arrow diagonal />
          </a>
        </div>
        <Spark className="footer-spark" />
      </div>
      <div className="wrap footer-bottom">
        <span>DDI Sandbox · Design & Digital Innovation</span>
        <a href="/#/dashboard">
          Explore the ventures <Arrow />
        </a>
        <span>Student ideas. Real-world impact.</span>
      </div>
    </footer>
  );
}
