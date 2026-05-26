"use client";

import AppDrawer from "../components/AppDrawer";
import { ReactNode } from "react";
import { Values } from "@/consts/ActivitiesFilter";
import { useCookie } from "@/components/hooks/useCookie";

export default function DashboardMain({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [dateFilter, setDateFilter] = useCookie("date_filter", "this_month");

  return (
    <div>
      <AppDrawer
        title="Início"
        subtitle={Values[dateFilter]}
        onFilterChangeAction={(filter) => setDateFilter(filter)}
      />
      {children}
    </div>
  );
}
