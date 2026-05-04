"use client";

import AppDrawer from "../components/AppDrawer";
import { ReactNode, useState } from "react";
import { FloatButton } from "@/components/ui/FloatButton";
import { Popup } from "@/components/ui/Popup";
import { useRouter } from "next/navigation";
import VehicleForm from "./components/VehicleForm";

export default function GarageMain({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [modeNew, setModeNew] = useState(false);
  const router = useRouter();

  const handleFinish = () => {
    setModeNew(false);
    router.refresh();
  };

  return (
    <div>
      <AppDrawer title="Garagem" showFilter={false} />
      <div className="flex flex-col items-center">{children}</div>
      <FloatButton onClick={() => setModeNew(true)} />
      {modeNew && (
        <Popup onClose={() => setModeNew(false)}>
          <VehicleForm onFinish={() => handleFinish()} />
        </Popup>
      )}
    </div>
  );
}
