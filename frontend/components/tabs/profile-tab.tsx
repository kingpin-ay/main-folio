"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserDashboard } from "@/lib/types";
import { appClient } from "@/lib/client.ts/appClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  first_name: string;
  last_name: string;
  bio: string;
  designation: string;
  user_name: string;
  email: string;
}

const submitFormData = async (profile: UserProfile) => {
  console.log("Updating profile:", profile);
  await appClient.changeUserDashboardProfile(profile);
};

export default function ProfileTab({ user }: { user: UserDashboard }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    first_name: user.firstName,
    last_name: user.lastName,
    bio: user.bio,
    designation: user.designation ?? "",
    user_name: user.userName,
    email: user.email,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(profile);
  };

  const mutation = useMutation({
    mutationFn: async (profile: UserProfile) => {
      await submitFormData(profile);
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
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-gray-400">
          This is how others will see you on the site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user_name">Username</Label>
          <Input
            id="user_name"
            name="user_name"
            value={profile.user_name}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
            disabled
          />
          <p className="text-sm text-gray-400">
            This is your public display name. It can be your real name or a
            pseudonym.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
            disabled
          />
          <p className="text-sm text-gray-400">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            name="designation"
            value={profile.designation}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="min-h-[100px] bg-gray-900 border-gray-700"
          />
          <p className="text-sm text-gray-400">
            You can @mention other users and organizations to link to them.
          </p>
        </div>

        <Button type="submit" className="ml-auto">
          Update profile
        </Button>
      </form>
    </div>
  );
}
