export default function Loading({
  message = "Please wait while we prepare everything for you...",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Main loading spinner */}
        {/* <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 rounded-full animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-slate-600 dark:text-slate-300 animate-spin absolute inset-0" />
        </div> */}

        {/* Loading text with typing animation */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 animate-pulse">
            Loading
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {message}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Subtle progress bar */}
        <div className="w-64 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
