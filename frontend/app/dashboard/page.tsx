"use client";

import { DashboardDataContainer } from "@/components/data-container/dashboard-data-container";
import UserSettings from "@/components/user-settings";
import { appClient } from "@/lib/client/appClient";
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
      <DashboardDataContainer
        render={(data) => <UserSettings logout={logout} data={data} />}
      />
    </main>
  );
}
