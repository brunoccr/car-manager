import { Suspense } from "react";
import GarageMain from "./main";
import { Vehicles } from "./components/Vehicle/Vehicles";

export default function Garage() {
  return (
    <GarageMain>
      <div className="mt-15 w-full flex justify-center">
        <Suspense fallback={<></>}>
          <Vehicles />
        </Suspense>
      </div>
    </GarageMain>
  );
}
