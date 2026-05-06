"use server";

import { getVehicles } from "@/actions/vehicles";
import { VehiclesList } from "./VehiclesList";

export async function Vehicles() {
  const vehicles = await getVehicles();

  return <VehiclesList items={vehicles} />;
}
