"use client";

import type React from "react";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileTab from "./tabs/profile-tab";
import AboutTab from "./tabs/about-tab";
import ContactsTab from "./tabs/contacts-tab";
import PreferencesTab from "./tabs/preferences-tab";
import ProjectsTab from "./tabs/projects-tab";
import BlogsTab from "./tabs/blogs-tab";
import { Button } from "@/components/ui/button";

type Tab =
  | "profile"
  | "about"
  | "contacts"
  | "preferences"
  | "projects"
  | "blogs";

interface UserSettingsProps {
  logout: () => Promise<void>;
}

export default function UserSettings({ logout }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

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
            <NavItem
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </NavItem>
            <NavItem
              active={activeTab === "about"}
              onClick={() => setActiveTab("about")}
            >
              About
            </NavItem>
            <NavItem
              active={activeTab === "contacts"}
              onClick={() => setActiveTab("contacts")}
            >
              Contacts
            </NavItem>
            <NavItem
              active={activeTab === "preferences"}
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </NavItem>
            <NavItem
              active={activeTab === "projects"}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </NavItem>
            <NavItem
              active={activeTab === "blogs"}
              onClick={() => setActiveTab("blogs")}
            >
              Blogs
            </NavItem>
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
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "about" && <AboutTab />}
          {activeTab === "contacts" && <ContactsTab />}
          {activeTab === "preferences" && <PreferencesTab />}
          {activeTab === "projects" && <ProjectsTab />}
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
