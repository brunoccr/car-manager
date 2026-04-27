"use client";

import FilterProvider from "@/app/contexts/FilterProvider";
import AppDrawer from "../components/AppDrawer";
import { ReactNode } from "react";

export default function DashboardMain({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <FilterProvider>
      <div>
        <AppDrawer />
        {children}
      </div>
    </FilterProvider>
  );
}
