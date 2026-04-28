"use client";

import Image from "next/image";

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
          <Image src="/icon-192x192.png" width={25} height={25} alt="logo" />
        </div>
        <div className="flex flex-col items-center h-full mt-2 mb-2">
          <div className={`${!isLast ? "border-r" : ""} h-full`}></div>
        </div>
      </div>
      <div className="mb-5 w-full">
        <div className="flex items-center font-bold mb-2 h-6">
          <Placeholder size="w-sm" />
        </div>
        <div>
          <div className="flex flex-col w-full gap-1 text-gray-500">
            <div className="flex flex-row justify-between w-full">
              <div>
                <Placeholder size="w-32" />
              </div>
              <div className="text-white">
                <Placeholder size="w-32" />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <Placeholder size="w-32" />
              </div>
              <div>
                <Placeholder size="w-32" />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <Placeholder size="w-32" />
              </div>
              <div>
                <Placeholder size="w-32" />
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
      className="text-sm divide-y divide-white/5 p-5 dark:bg-black flex flex-col w-full max-w-3xl overflow-y-auto"
    >
      <Activity isLast={false} />
      <Activity isLast={false} />
      <Activity isLast={false} />
      <Activity isLast={false} />
      <Activity isLast={true} />
    </ul>
  );
}
