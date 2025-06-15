import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import { appClient } from "@/lib/client.ts/appClient";
import React from "react";

type Params = {
  user_name: string;
};

async function getProfileData(username: string) {
  const response = await appClient.getUserData(username);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export default async function page({ params }: { params: Promise<Params> }) {
  const { user_name } = await params;
  const profileData = await getProfileData(user_name);

  if (!profileData) return <div>User not found</div>;
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
        <Projects />
      </section>
      <Footer
        fullName={`${profileData.user.firstName} ${profileData.user.lastName}`}
        socialLinks={profileData.contactDetails}
      />
    </div>
  );
}
