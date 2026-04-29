"use server";

import { createServerClient } from "@/lib/pocketbase";

export async function getUserVehicles(): Promise<
  { label: string; value: string }[]
> {
  const pb = await createServerClient();

  try {
    const relations = await pb
      .collection("relations")
      .getFullList({ expand: "car" });

    const activities = await pb.collection("activities").getList(1, 1, {
      filter: `createdby = "${pb.authStore.record?.id}"`,
      expand: "car",
    });

    let vehicles = relations.map((v) => {
      return {
        label: v.expand?.car.alias,
        value: v.expand?.car.id,
      };
    });

    if (activities.items.length > 0) {
      const lastActivity = activities.items[0];

      const lastUsedVehicle = vehicles.find(
        (v) => v.value === lastActivity.car?.id,
      );

      if (lastUsedVehicle) {
        vehicles = vehicles.filter((v) => v.value !== lastActivity.car?.id);
        vehicles.push(lastUsedVehicle);
      }
    }

    return vehicles;
  } catch (err) {
    console.log(err);
  }

  return [];
}
