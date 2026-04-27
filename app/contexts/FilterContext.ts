import { Values } from "@/consts/ActivitiesFilter";
import { createContext } from "react";

export interface FilterContextProps {
  title: string;
  subtitle: string;
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterContextDefault: FilterContextProps = {
  title: "Início",
  subtitle: Values["seven_days"],
  filterKey: "seven_days",
  setFilter: () => {},
  setSubtitle: () => {},
};

export default createContext(FilterContextDefault);
