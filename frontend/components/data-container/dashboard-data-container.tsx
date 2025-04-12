"use client";

import { appClient } from "@/lib/client.ts/appClient";
import { useQuery } from "@tanstack/react-query";

export const DashboardDataContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/get/user/dashboard"],
    queryFn: () => {
      return appClient.getUserDashboard();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {JSON.stringify(data)}
      {children}
    </div>
  );
};
