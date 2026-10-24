import { About } from "@/components/site/About";
import { Contact, Footer } from "@/components/site/Contact";
import { Experience } from "@/components/site/Experience";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { Projects } from "@/components/site/Projects";
import { Toolkit } from "@/components/site/Toolkit";
import { useRevealObserver } from "@/components/site/reveal";

export default function App() {
  useRevealObserver();
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
