"use client";

import { useState } from "react";
import AppDrawer from "../components/AppDrawer";
import FilterContext, { FilterContextDefault } from "@contexts/FilterContext";

export default function Dashboard() {
  const [subtitle, setSubtitle] = useState(FilterContextDefault.subtitle);
  const [filterKey, setFilter] = useState(FilterContextDefault.filterKey);

  return (
    <FilterContext
      value={{
        title: FilterContextDefault.title,
        subtitle,
        filterKey,
        setFilter,
        setSubtitle,
      }}
    >
      <div>
        <AppDrawer />
        <h1>Dashboard</h1>
      </div>
    </FilterContext>
  );
}
