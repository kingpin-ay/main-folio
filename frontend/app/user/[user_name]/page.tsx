import { getUserData } from "@/app/data/user/get-user-data";
import About from "@/components/about";
import Blogs from "@/components/blogs";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import { notFound } from "next/navigation";
import React from "react";

type Params = {
  user_name: string;
};

export default async function page({ params }: { params: Promise<Params> }) {
  const { user_name } = await params;
  const profileData = await getUserData(user_name);

  if (!profileData) return notFound();
  return (
    <div className="min-h-screen bg-background">
      <Navbar firstName={profileData.user.firstName} />
      <section id="home" className="scroll-mt-20">
        <Landing
          bio={profileData.user.bio}
          fullName={`${profileData.user.firstName} ${profileData.user.lastName}`}
          socialLinks={profileData.contactDetails}
        />
      </section>
      <section id="projects" className="scroll-mt-20">
        <Projects projects={profileData.projects} />
      </section>
      <section id="blogs" className="scroll-mt-20">
        <Blogs blogs={profileData.blogs} />
      </section>
      <section id="about" className="scroll-mt-20">
        <About
          shortDescription={profileData.userAbout?.shortDescription ?? ""}
          description={profileData.userAbout?.description ?? ""}
          imageLink={profileData.userAbout?.imageLink ?? ""}
          fullName={`${profileData.user.firstName} ${profileData.user.lastName}`}
          stackGroups={profileData.stackGroups}
        />
      </section>
      <section id="contact" className="scroll-mt-20">
        <Contact
          email={profileData.userAbout?.email ?? ""}
          phone={profileData.userAbout?.phoneNumber ?? ""}
          location={profileData.userAbout?.location ?? ""}
        />
      </section>
      <Footer
        fullName={`${profileData.user.firstName} ${profileData.user.lastName}`}
        socialLinks={profileData.contactDetails}
      />
    </div>
  );
}
