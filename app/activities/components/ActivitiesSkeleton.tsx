"use client";

import { LoaderIcon } from "lucide-react";

function Placeholder({ size }: { size: string }) {
  return (
    <div
      role="status"
      className={`flex items-center justify-center ${size} h-5 bg-slate-800 rounded-base animate-pulse rounded-2xl`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function Activity({ isLast }: { isLast: boolean }) {
  return (
    <li className="flex flex-row">
      <div className="flex flex-col mr-5">
        <div className="flex justify-center">
          <LoaderIcon color="#6BAED5" />
        </div>
        <div className="flex flex-col items-center h-full mt-5 mb-5">
          <div className={`${!isLast ? "border-r" : ""} h-full`}></div>
        </div>
      </div>
      <div className="mb-10 w-full">
        <div className="flex items-center mb-2 h-6 justify-between font-bold">
          <Placeholder size="w-30" />
          <Placeholder size="w-30" />
        </div>
        <div>
          <div className="flex flex-col w-full gap-1 text-gray-500">
            <div className="flex flex-row justify-between w-full">
              <div>
                <Placeholder size="w-20" />
              </div>
              <div className="text-white">
                <Placeholder size="w-20" />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <Placeholder size="w-20" />
              </div>
              <div>
                <Placeholder size="w-20" />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <Placeholder size="w-20" />
              </div>
              <div>
                <Placeholder size="w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ActivitiesSkeleton() {
  return (
    <ul
      role="list"
      className="text-sm p-5 flex flex-col w-full max-w-3xl overflow-y-auto"
    >
      <Activity isLast={false} />
      <Activity isLast={false} />
      <Activity isLast={false} />
      <Activity isLast={false} />
      <Activity isLast={true} />
    </ul>
  );
}
