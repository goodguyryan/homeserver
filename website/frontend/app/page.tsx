import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import LatestBlog from "./components/LatestBlog";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <LatestBlog />
        <Contact />
      </main>
    </>
  );
}
