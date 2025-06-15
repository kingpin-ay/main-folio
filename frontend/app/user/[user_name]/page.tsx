import { appClient } from "@/lib/client.ts/appClient";
import React from "react";

type Params = {
  user_name: string;
};

async function getProfileData(username: string) {
  const response = await appClient.getUserData(username);
  console.log("response", response);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export default async function page({ params }: { params: Promise<Params> }) {
  const { user_name } = await params;
  const profileData = await getProfileData(user_name);

  if (!profileData) return <div>User not found</div>;
  return <div>{profileData.firstName}</div>;
}
