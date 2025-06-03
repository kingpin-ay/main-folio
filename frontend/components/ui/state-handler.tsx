import { Loader2 } from "lucide-react";

type StateHandlerProps<T = unknown> = {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  children: React.ReactNode;
};

export function StateHandler<T = unknown>({ isLoading, error, data, children }: StateHandlerProps<T>) {
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