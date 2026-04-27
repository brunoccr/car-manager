"use client";

import { Values } from "@/consts/ActivitiesFilter";
import { createContext, ReactNode, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface FilterContextProps {
  title: string;
  subtitle: string;
  filterKey: string;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterContextDefault: FilterContextProps = {
  title: "Início",
  subtitle: Values["seven_days"],
  filterKey: "seven_days",
  setSubtitle: () => {},
};

export const FilterContext = createContext(FilterContextDefault);

export default function FilterProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const filterKey = useSearchParams().get("filter") ?? "seven_days";
  const [subtitle, setSubtitle] = useState(Values[filterKey]);

  const contextValue = useMemo(
    () => ({
      title: FilterContextDefault.title,
      subtitle,
      filterKey,
      setSubtitle,
    }),
    [subtitle, filterKey],
  );

  return <FilterContext value={contextValue}>{children}</FilterContext>;
}
