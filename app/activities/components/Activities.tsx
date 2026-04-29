"use server";

import { getActivities } from "@/actions/activities";
import { ActivityList } from "./ActivityList";

export async function Activities({ filter }: { filter: string }) {
  const activities = await getActivities(filter);

  return <ActivityList items={activities} />;
}
