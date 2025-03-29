"use client";

import UserSettings from "@/components/user-settings";
import { appClient } from "@/lib/client.ts/appClient";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const logout = async () => {
    await appClient.logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <UserSettings logout={logout} />
    </main>
  );
}
