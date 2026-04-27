"use client";

export function SummariesSkeleton() {
  return (
    <div className="flex flex-col p-5 w-full gap-5">
      <div
        role="status"
        className="flex items-center justify-center h-25 bg-slate-800 rounded-base animate-pulse rounded-2xl"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="flex items-center justify-center h-45 bg-slate-800 rounded-base animate-pulse rounded-2xl"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="flex items-center justify-center h-80 bg-slate-800 rounded-base animate-pulse rounded-2xl"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
