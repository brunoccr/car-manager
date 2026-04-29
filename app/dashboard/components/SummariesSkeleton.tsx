"use client";

export function SummariesSkeleton() {
  return (
    <div className="flex flex-col p-5 w-full gap-5 max-w-3xl">
      <div className="flex flex-row w-full gap-5">
        <div
          role="status"
          className="flex flex-1 items-center p-5 h-20 bg-[#1e2024] rounded-base rounded-2xl gap-3 animate-pulse"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="flex flex-1 items-center p-5 h-20 bg-[#1e2024] rounded-base rounded-2xl gap-3 animate-pulse"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div
        role="status"
        className="flex items-center justify-center h-30 bg-[#1e2024] rounded-base animate-pulse rounded-2xl"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="flex items-center justify-center h-80 bg-[#1e2024] rounded-base animate-pulse rounded-2xl"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
