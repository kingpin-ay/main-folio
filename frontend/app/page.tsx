import Blogs from "@/components/blogs";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
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
    </div>
  );
}
