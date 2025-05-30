"use client";

import { appClient } from "@/lib/client.ts/appClient";
import { UserDashboard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { StateHandler } from "@/components/ui/state-handler";

function useDasboard() {
  return useQuery({
    queryKey: ["/get/user/dashboard"],
    queryFn: async () => {
      const response = await appClient.getUserDashboard();
      if (response.status === 200) {
        return response.data;
      }
      return null;
    },
  });
}

export const DashboardDataContainer = ({
  render,
}: {
  render: (data: UserDashboard) => React.ReactNode;
}) => {
  const { status, data, isLoading, error, isFetching } = useDasboard();

  return (
    <StateHandler isLoading={isLoading} error={error} data={data}>
      {data && render(data)}
    </StateHandler>
  );
};
