"use client";

import { useAuth } from "@/hooks/useAuth";
// ... existing imports ...
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth(); // This will handle the redirection if user is not logged in

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* Your dashboard layout components */}
        {children}
      </QueryClientProvider>
    </div>
  );
}
