"use client";

import AppDrawer from "../components/AppDrawer";
import ActivityForm from "./components/ActivityForm";
import { ReactNode, useState } from "react";
import { FloatButton } from "@/components/ui/FloatButton";
import { Popup } from "@/components/ui/PopupNew";
import { useRouter } from "next/navigation";
import { Values } from "@/consts/ActivitiesFilter";
import { useCookie } from "@/components/hooks/useCookie";

export default function ActivitiesMain({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [dateFilter, setDateFilter] = useCookie("date_filter", "this_month");
  const [modeNew, setModeNew] = useState(false);
  const router = useRouter();

  const handleFinish = () => {
    setModeNew(false);
    router.refresh();
  };

  return (
    <div>
      <AppDrawer
        title="Atividades"
        subtitle={Values[dateFilter]}
        onFilterChangeAction={(filter) => setDateFilter(filter)}
      />
      <div className="flex flex-col items-center">{children}</div>
      <FloatButton onClick={() => setModeNew(true)} />
      {modeNew && (
        <Popup title="Nova Atividade" onBack={() => setModeNew(false)}>
          <ActivityForm onFinishAction={() => handleFinish()} />
        </Popup>
      )}
    </div>
  );
}
