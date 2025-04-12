'use client'

import { appClient } from "@/lib/client.ts/appClient";
import { useQuery } from "@tanstack/react-query";

export const DashboardDataContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => {
      return {};
    },
  });

  return <div>DashboardDataContainer</div>;
};
