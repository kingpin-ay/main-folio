import Navbar from "@/components/navbar";
import Landing from "@/components/landing";
import Projects from "@/components/projects";
import Blogs from "@/components/blogs";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section id="home" className="scroll-mt-20">
          <Landing />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="blogs" className="scroll-mt-20">
          <Blogs />
        </section>
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
