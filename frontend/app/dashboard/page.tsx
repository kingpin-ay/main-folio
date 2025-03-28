"use client";

import { Button } from "@/components/ui/button";
import { appClient } from "@/lib/client.ts/appClient";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  const logout = async () => {
    await appClient.logout();
    router.push("/dashboard/login");
  };

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
