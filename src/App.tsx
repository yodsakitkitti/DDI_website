import { Dashboard } from './components/Dashboard';
import { Hero } from './components/Hero';
import { projects, siteContent } from './content/siteContent';

export default function App() {
  if (window.location.pathname === '/dashboard') {
    return <Dashboard projects={projects} />;
  }

  return <Hero content={siteContent} />;
}
