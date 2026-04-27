"use server";

import { createServerClient } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

export async function getActivities(filter: string): Promise<RecordModel[]> {
  const pb = await createServerClient();

  try {
    const activities = await pb
      .collection("activities")
      .getFullList({ expand: "createdby" });

    return activities;
  } catch (err) {
    console.error(err);
    return [];
  }
}
