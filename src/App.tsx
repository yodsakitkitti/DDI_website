import { Hero } from './components/Hero';
import { siteContent } from './content/siteContent';

export default function App() {
  return <Hero content={siteContent} />;
}
