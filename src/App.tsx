import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Hero } from "./components/Hero";
import { dashboardContent, projects, siteContent } from "./content/siteContent";

const normalizeHashRoute = (hash: string) => {
  const route = hash.replace(/^#/, "") || "/";
  return route.length > 1 ? route.replace(/\/+$/, "") : route;
};

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (hash === "#about") {
      const reduceMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document
        .getElementById("about")
        ?.scrollIntoView?.({ behavior: reduceMotion ? "instant" : "smooth" });
    } else {
      document.documentElement.scrollTop = 0;
    }
  }, [hash]);

  const route = normalizeHashRoute(hash);
  if (route === "/dashboard" || route.startsWith("/dashboard/")) {
    return (
      <Dashboard
        content={dashboardContent}
        projects={projects}
        initialProjectId={route.split("/")[2]}
      />
    );
  }

  return <Hero content={siteContent} />;
}
