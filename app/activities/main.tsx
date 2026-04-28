"use client";

import FilterProvider from "@/app/contexts/FilterProvider";
import AppDrawer from "../components/AppDrawer";
import ActivityForm from "./components/ActivityForm";
import { ReactNode, useState } from "react";
import { FloatButton } from "@/components/ui/FloatButton";
import { Popup } from "@/components/ui/Popup";
import { useRouter } from "next/navigation";

export default function ActivitiesMain({
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
    <FilterProvider>
      <div>
        <AppDrawer />
        <div className="flex flex-col items-center">{children}</div>
        <FloatButton onClick={() => setModeNew(true)} />
        {modeNew && (
          <Popup onClose={() => setModeNew(false)}>
            <ActivityForm onFinish={() => handleFinish()} />
          </Popup>
        )}
      </div>
    </FilterProvider>
  );
}
