"use client";

import { appClient } from "@/lib/client.ts/appClient";
import { UserDashboard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const DashboardDataContainer = ({
  render,
}: {
  render: (data: UserDashboard) => React.ReactNode;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/get/user/dashboard"],
    queryFn: async () => {
      const response = await appClient.getUserDashboard();
      if (response.status === 200) {
        return response.data;
      }
      return null;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return render(data);
};
