"use client";

import Image from "next/image";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { ButtonMenu, ButtonMenuItem } from "@components/ui/ButtonMenu";
import { Values } from "@consts/ActivitiesFilter";
import { useRouter } from "next/navigation";
import { CarFrontIcon } from "lucide-react";
import { useCookie } from "../hooks/useCookie";

export interface Vehicle {
  id: string;
  name: string;
}

export interface DrawerProps {
  title: string;
  subtitle?: string;
  username: string;
  showFilter?: boolean;
  showFilterCar?: boolean;
  vehicles?: Vehicle[];
  onFilterChange?: (filter: string) => void;
  onVehicleChange?: (carId: string) => void;
  children: ReactNode | ReactNode[];
}

export interface DrawerItemProps {
  title: string;
  route?: string;
  variant?: string;
  icon?: ReactNode | undefined;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export const DrawerItem = ({
  title,
  route = "#",
  variant = "link",
  icon,
  onClick,
}: DrawerItemProps) => {
  if (variant === "link") {
    return (
      <a
        href={route}
        className="w-full border-b text-base border-b-gray-800 pb-2 hover:text-indigo-500"
      >
        <div className="flex gap-4 items-center">
          {icon}
          {title}
        </div>
      </a>
    );
  } else if (variant === "button") {
    return (
      <a
        href="#"
        onClick={onClick}
        className="w-full bg-indigo-500 text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {title}
      </a>
    );
  }
};

export const Drawer = ({
  title,
  subtitle,
  username = "[USERNAME]",
  children,
  showFilter = true,
  showFilterCar = true,
  vehicles = [],
  onFilterChange = () => {},
  onVehicleChange = () => {},
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carFilter, setCarFilter] = useCookie("car_filter", "all");

  const router = useRouter();

  const selectedFilter = vehicles.find((v) => v.id === carFilter)?.name;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ menuOpen: true }, "");
    }

    const handlePopState = () => {
      setIsOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  const closeMenu = () => {
    if (isOpen) {
      window.history.back();
    }
  };

  const handleFilter = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }

    router.refresh();
  };

  const handleCarChange = (carId: string) => {
    setCarFilter(carId);

    router.refresh();
  };

  return (
    <nav className="flex bg-white text-black dark:bg-[#111318] h-14 dark:text-white p-2 pr-5 pl-5 border-b border-b-gray-800 fixed w-full z-50 ">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4 w-full">
          {/******** Menu Hamburguer *******/}
          <div>
            <button
              onClick={isOpen ? closeMenu : toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none z-50 relative"
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </button>
          </div>
          {/******** Título e Subtítulo *******/}
          <div className="flex-1 flex flex-col">
            <span className={`font-bold ${subtitle ? "text-base" : "text-xl"}`}>
              {title}
            </span>
            <span
              className={`text-xs text-gray-400 ${!subtitle ? "hidden" : ""} `}
            >
              {subtitle}
            </span>
          </div>
          {/******** Filtro de Veículo *******/}
          {showFilterCar && vehicles.length > 1 && (
            <div className="flex items-center gap-5">
              {carFilter !== "all" && <div>{selectedFilter}</div>}
              <ButtonMenu
                content={
                  <div className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none relative">
                    <CarFrontIcon />
                  </div>
                }
              >
                <ButtonMenuItem
                  key="all"
                  label="Todos"
                  onClick={() => handleCarChange("all")}
                />
                {vehicles.map((v) => (
                  <ButtonMenuItem
                    key={v.id}
                    label={v.name}
                    onClick={() => handleCarChange(v.id)}
                  />
                ))}
              </ButtonMenu>
            </div>
          )}
          {/******** Filtro *******/}
          {showFilter && (
            <div>
              <ButtonMenu
                content={
                  <div className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none relative">
                    <span className="block w-5 h-0.5 bg-white"></span>
                    <span className="block w-3 h-0.5 bg-white"></span>
                    <span className="block w-1 h-0.5 bg-white"></span>
                  </div>
                }
              >
                {Object.keys(Values).map((k) => (
                  <ButtonMenuItem
                    key={k}
                    label={Values[k]}
                    onClick={() => handleFilter(k)}
                  />
                ))}
              </ButtonMenu>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 "
          onClick={toggleMenu}
        ></div>
      )}
      {/********* Menu ********/}
      <div
        className={`flex flex-col fixed top-0 left-0 h-full w-96 max-w-[90%] bg-[#111318] transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-40 shadow-2xl`}
      >
        <div className="flex flex-col items-start p-8 space-y-6 mt-16 text-lg font-medium">
          <div className="flex flex-col items-center w-full">
            <Image
              src="/icon-192x192.png"
              alt="logo"
              width={100}
              height={100}
            ></Image>
            <div className="text-base">
              Bem vindo <b>{username}</b>!
            </div>
          </div>
          {children}
        </div>
        <div className="flex flex-row flex-1 justify-center items-end pb-10 w-full text-sm/6">
          {process.env.NEXT_PUBLIC_APP_VERSION}
        </div>
      </div>
    </nav>
  );
};
