import { Loader2 } from "lucide-react";

interface StateHandlerProps {
  isLoading: boolean;
  error: Error | null;
  data: any | null;
  children: React.ReactNode;
}

export function StateHandler({ isLoading, error, data, children }: StateHandlerProps) {
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 