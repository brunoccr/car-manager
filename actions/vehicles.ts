"use server";

import { createServerClient } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

export async function disableRelation(relationId: string) {
  const pb = await createServerClient();

  try {
    await pb.collection("relations").delete(relationId);
    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Erro ao tentar remover compartilhamento!",
    };
  }
}

export async function getRelations(carId: string, onlyActives: boolean = true) {
  const pb = await createServerClient();

  try {
    const relations = await pb.collection("relations").getFullList({
      expand: "user,car",
      filter: pb.filter(
        "car = {:carId} && type = 'invited' && active = {:active}",
        {
          carId,
          active: onlyActives,
        },
      ),
    });

    return relations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createShareVehicle(formData: FormData) {
  const pb = await createServerClient();

  const id = formData.get("id") as string;
  const email = formData.get("email") as string;

  try {
    const users = await pb.collection("users").getList(1, 1, {
      filter: pb.filter("email = {:email}", { email }),
    });

    if (users.totalItems == 0) {
      return { success: false, error: "Usuário não encontrado!" };
    }

    const userId = users.items[0].id;

    const relations = await pb.collection("relations").getList(1, 1, {
      filter: pb.filter("car = {:car} && user = {:user}", {
        car: id,
        user: userId,
      }),
    });

    if (relations.totalItems > 0) {
      return { success: false, error: "Usuário já tem acesso ao Veículo!" };
    }

    const body = {
      active: false,
      type: "invited",
      user: userId,
      car: id,
    };

    await pb.collection("relations").create(body);

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Erro ao compartilhar!" };
  }
}

export async function acceptInvite(
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
      filter: pb.filter("user = {:userId}", {
        userId: pb.authStore.record?.id,
      }),
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
  const maintenance = formData.get("maintenance") as string;

  try {
    const body = {
      id,
      alias,
      brand,
      model,
      year,
      plate,
      maintenance,
    };

    if (id) {
      if (!isExclude) {
        await pb.collection("cars").update(id, body);
      } else {
        await pb.collection("cars").update(id, { active: false });
      }
    } else {
      const newCar = await pb
        .collection("cars")
        .create({ ...body, active: true });
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
    const relations = await pb.collection("relations").getFullList({
      expand: "car",
      filter: pb.filter("user = {:userId} && active = true", {
        userId: pb.authStore.record?.id,
      }),
    });

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
