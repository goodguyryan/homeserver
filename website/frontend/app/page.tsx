import { getAllProjects } from "@/lib/content";
import { getAllBlogPosts } from "@/lib/content";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import LatestBlog from "./components/LatestBlog";
import Contact from "./components/Contact";

export default async function Home() {
  const projects = getAllProjects();
  const blogPosts = getAllBlogPosts();
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects projects={projects.slice(0, 3)} />
        <LatestBlog posts={blogPosts.filter(p => p.featured).slice(0, 3)} />
        <Contact />
      </main>
    </>
  );
}
