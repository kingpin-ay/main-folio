"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserAbout } from "@/lib/types";
import { appClient } from "@/lib/client.ts/appClient";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function submitFormData(about: UserAbout) {
  return appClient.updateUserAbout(about);
}

export default function AboutTab({ userAbout }: { userAbout: UserAbout }) {
  const queryClient = useQueryClient();
  const [about, setAbout] = useState<UserAbout>({
    shortDescription: userAbout?.shortDescription ?? "",
    description: userAbout?.description ?? "",
    imageLink: userAbout?.imageLink ?? "",
    email: userAbout?.email ?? "",
    phoneNumber: userAbout?.phoneNumber ?? "",
    location: userAbout?.location ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(about);
  };

  const mutation = useMutation({
    mutationFn: async (about: UserAbout) => {
      await submitFormData(about);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/get/user/dashboard"] });
      toast({
        title: "Update: successful",
        description: new Date().toLocaleString(),
      });
    },
  });
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
            name="shortDescription"
            value={about.shortDescription}
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
            name="imageLink"
            value={about.imageLink}
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
            name="phoneNumber"
            value={about.phoneNumber}
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
