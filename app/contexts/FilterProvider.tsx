"use client";

import { createContext, ReactNode, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export interface FilterContextProps {
  filterKey: string;
}

export const FilterContextDefault: FilterContextProps = {
  filterKey: "this_month",
};

export const FilterContext = createContext(FilterContextDefault);

export default function FilterProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const filterKey = useSearchParams().get("filter") ?? "this_month";

  const contextValue = useMemo(
    () => ({
      filterKey,
    }),
    [filterKey],
  );

  return <FilterContext value={contextValue}>{children}</FilterContext>;
}
