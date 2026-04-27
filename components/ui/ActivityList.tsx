"use server";

import Image from "next/image";
import { getActivities } from "@/actions/activities";

export interface ActivityItemProps {
  recordId: string;
  activityType: string;
  name: string;
  email: string;
  userId: string;
}

async function ActivityItem(props: ActivityItemProps) {
  const avatarUrl = `/api/users/avatar/${props.userId}`;

  return (
    <li
      key={props.recordId}
      className="pl-5 pr-5 flex justify-between gap-x-6 py-5 border rounded-lg border-gray-800"
    >
      <div className="flex min-w-0 gap-x-4">
        <Image
          alt={props.name}
          className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
          width={100}
          height={100}
          loading="eager"
          src={avatarUrl}
          unoptimized
        ></Image>
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-white">{props.name}</p>
          <p className="mt-1 truncate text-xs/5 text-gray-400">{props.email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-white">{props.activityType}</p>
        <p className="mt-1 text-xs/5 text-gray-400">Last seen 3h ago</p>
      </div>
    </li>
  );
}

export async function ActivityList({ filter }: { filter: string }) {
  const activities = await getActivities(filter);

  return (
    <ul role="list" className="divide-y divide-white/5 p-5 dark:bg-black">
      {activities &&
        activities?.map((a) => (
          <ActivityItem
            key={a.id}
            recordId={a.id}
            activityType={a.type}
            name={a.expand?.createdby.name}
            email={a.expand?.createdby.email}
            userId={a.expand?.createdby.id}
          />
        ))}
    </ul>
  );
}
