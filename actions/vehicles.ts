"use server";

import { createServerClient } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

export async function acceptInvice(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const pb = await createServerClient();

  try {
    await pb.collection("relations").update(id, {
      active: true,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Erro ao aceitar compartilhamento!" };
  }
}

export async function getVehicles(): Promise<RecordModel[]> {
  const pb = await createServerClient();

  try {
    const relations = await pb.collection("relations").getFullList({
      expand: "car,user",
      sort: "-type",
    });

    return relations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createOrUpdateVehicle(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  const pb = await createServerClient();

  const intent = formData.get("intent") as string;
  const isExclude = intent === "exclude";

  const id = formData.get("id") as string;
  const alias = formData.get("alias") as string;
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const year = formData.get("year") as string;
  const plate = formData.get("plate") as string;

  try {
    const body = {
      id,
      alias,
      brand,
      model,
      year,
      plate,
    };

    if (id) {
      if (!isExclude) {
        await pb.collection("cars").update(id, body);
      } else {
        await pb.collection("cars").update(id, { active: false });
      }
    } else {
      const newCar = await pb.collection("cars").create(body);
      await pb.collection("relations").create({
        car: newCar.id,
        user: pb.authStore.record?.id,
        type: "owner",
        active: true,
      });
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Erro ao tentar criar/atualizar o veículo!",
    };
  }
}

export async function getVehicle(id: string): Promise<RecordModel | null> {
  const pb = await createServerClient();

  try {
    const relation = await pb
      .collection("relations")
      .getOne(id, { expand: "car,user" });

    return relation;
  } catch (err) {
    console.log(err);
  }

  return null;
}

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
