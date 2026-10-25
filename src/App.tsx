import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { PaletteProvider } from "./lib/palette";

export default function App() {
  return (
    <PaletteProvider>
      <div className="min-h-screen bg-graphite-950 font-body text-graphite-50">
        <Nav />
        <main>
          <Hero />
          <Stats />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
      <CommandPalette />
    </PaletteProvider>
  );
}
