"use server";

import { getActivities } from "@/actions/activities";
import { ActivityList } from "./ActivityList";

export async function Activities({
  filter,
  carFilter,
}: {
  filter: string;
  carFilter: string;
}) {
  const activities = await getActivities(filter, carFilter);

  return <ActivityList items={activities} />;
}
