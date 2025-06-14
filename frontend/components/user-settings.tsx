"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileTab from "./tabs/profile-tab";
import AboutTab from "./tabs/about-tab";
import ContactsTab from "./tabs/contacts-tab";
import PreferencesTab from "./tabs/preferences-tab";
import ProjectsTab from "./tabs/projects-tab";
import BlogsTab from "./tabs/blogs-tab";
import { Button } from "@/components/ui/button";
import { UserDashboard } from "@/lib/types";

type Tab =
  | "profile"
  | "about"
  | "contacts"
  | "preferences"
  | "projects"
  | "blogs";

interface UserSettingsProps {
  logout: () => Promise<void>;
  data: UserDashboard;
}

const navItems: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "about", label: "About" },
  { id: "contacts", label: "Contacts" },
  { id: "preferences", label: "Preferences" },
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blogs" },
];

export default function UserSettings({ logout, data }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { user, userAbout, contactDetails, stackGroups, projects } = data;
  useEffect(() => {
    console.log("UserSettings - Received user data:", data);
  }, [data]);

  // Validate user data
  if (!user || typeof user !== "object") {
    console.error("UserSettings - Invalid user data:", user);
    return <div>Error: Invalid user data</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex flex-col">
          <div className="space-y-1 flex-1">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </NavItem>
            ))}
          </div>
          <Button
            variant="ghost"
            className="justify-start mt-auto text-red-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 border border-gray-800 rounded-lg p-6">
          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "about" && <AboutTab userAbout={userAbout} />}
          {activeTab === "contacts" && (
            <ContactsTab userContacts={contactDetails} />
          )}
          {activeTab === "preferences" && (
            <PreferencesTab stackGroupsMain={stackGroups} />
          )}
          {activeTab === "projects" && <ProjectsTab projects_main={projects} />}
          {activeTab === "blogs" && <BlogsTab />}
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ children, active, onClick }: NavItemProps) {
  return (
    <button
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md w-full text-left",
        active
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
