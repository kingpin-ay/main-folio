"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UserAbout {
  short_description: string;
  description: string;
  image_link: string;
  email: string;
  phone_number: string;
  location: string;
}

export default function AboutTab() {
  const [about, setAbout] = useState<UserAbout>({
    short_description: "Full-stack developer with 5+ years of experience",
    description:
      "I specialize in building modern web applications using React, Next.js, and Node.js. I'm passionate about creating intuitive user interfaces and scalable backend systems.",
    image_link: "https://example.com/profile.jpg",
    email: "contact@example.com",
    phone_number: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating about:", about);
    // Implement API call to update about information
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">About</h2>
        <p className="text-gray-400">
          Additional information about you that will be displayed on your
          profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="short_description">Short Description</Label>
          <Input
            id="short_description"
            name="short_description"
            value={about.short_description}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
          />
          <p className="text-sm text-gray-400">
            A brief tagline that appears under your name.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Full Description</Label>
          <Textarea
            id="description"
            name="description"
            value={about.description}
            onChange={handleChange}
            className="min-h-[150px] bg-gray-900 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_link">Profile Image URL</Label>
          <Input
            id="image_link"
            name="image_link"
            value={about.image_link}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={about.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
          />
          <p className="text-sm text-gray-400">
            This email will be displayed publicly on your profile.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            name="phone_number"
            value={about.phone_number}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={about.location}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
          />
        </div>

        <Button type="submit" className="ml-auto">
          Update about
        </Button>
      </form>
    </div>
  );
}
