"use server";

import { createServerClient } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import { convertFilterDateToQuery } from "@actions/utils";

export async function getActivity(id: string): Promise<RecordModel | null> {
  const pb = await createServerClient();

  try {
    const activity = await pb
      .collection("activities")
      .getOne(id, { expand: "car" });

    return activity;
  } catch (err) {
    console.log(err);
  }

  return null;
}

export async function getActivities(filter: string): Promise<RecordModel[]> {
  const pb = await createServerClient();

  try {
    const query = convertFilterDateToQuery(filter);

    const activities = await pb.collection("activities").getFullList({
      filter: `${query}`,
      expand: "car,createdby",
      sort: "-startdate",
    });

    const fuelFillType = "Reabastecimento";

    activities.forEach((a) => {
      if (a.type === fuelFillType) {
        const beforeActivity = activities.find(
          (f) =>
            f.id !== a.id &&
            new Date(f.startdate) < new Date(a.startdate) &&
            f.type === fuelFillType,
        );

        if (beforeActivity) {
          a["KMPerLitres"] =
            (a.totalkm - beforeActivity.totalkm) / a.totalVolume;
        } else {
          a["KMPerLitres"] = 0;
        }
      }
    });

    return activities;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createOrUpdateActivity(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  const pb = await createServerClient();

  const intent = formData.get("intent") as string;
  const isExclude = intent === "exclude";

  const id = formData.get("id") as string | undefined;
  const carId = formData.get("vehicle") as string;
  const type = formData.get("type") as string;
  const startDate = formData.get("date") as string;
  const totalKM = formData.get("totalKM") as string;
  const totalValue = formData.get("totalValue") as string;
  const volume = formData.get("volume") as string;

  try {
    const body = {
      car: carId,
      type: type,
      createdby: pb.authStore.record?.id,
      startdate: startDate.toString() + " 12:00:00Z",
      totalkm: totalKM,
      totalPaid: totalValue,
      totalVolume: volume,
    };

    if (id) {
      if (!isExclude) {
        await pb.collection("activities").update(id, body);
      } else {
        await pb.collection("activities").delete(id);
      }
    } else {
      await pb.collection("activities").create(body);
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Erro ao tentar criar/atualizar atividade!",
    };
  }
}
