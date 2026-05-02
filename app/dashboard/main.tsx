"use client";

import FilterProvider from "@/app/contexts/FilterProvider";
import AppDrawer from "../components/AppDrawer";
import { ReactNode } from "react";
import { Values } from "@/consts/ActivitiesFilter";

export default function DashboardMain({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <FilterProvider>
      <div>
        <AppDrawer title="Início" subtitle={Values["this_month"]} />
        {children}
      </div>
    </FilterProvider>
  );
}
