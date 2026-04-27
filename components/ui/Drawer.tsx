"use client";

import Image from "next/image";
import {
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ButtonMenu, ButtonMenuItem } from "@components/ui/ButtonMenu";
import { Values } from "@consts/ActivitiesFilter";
import { FilterContext } from "@/app/contexts/FilterProvider";
import { useRouter } from "next/navigation";

export interface DrawerProps {
  title: string;
  subtitle: string;
  username: string;
  children: ReactNode | ReactNode[];
}

export interface DrawerItemProps {
  title: string;
  route?: string;
  variant?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export const DrawerItem = ({
  title,
  route = "#",
  variant = "link",
  onClick,
}: DrawerItemProps) => {
  if (variant === "link") {
    return (
      <>
        <a
          href={route}
          className="hover:text-blue-400 transition-colors hidden md:block"
        >
          {title}
        </a>
        <a
          href={route}
          className="w-full border-b border-slate-700 pb-2 hover:text-blue-400 md:hidden "
        >
          {title}
        </a>
      </>
    );
  } else if (variant === "button") {
    return (
      <>
        <a
          href="#"
          onClick={onClick}
          className="w-full bg-blue-600 text-center py-2 rounded-lg hover:bg-blue-700 transition-colors md:hidden"
        >
          {title}
        </a>
        <a
          href="#"
          onClick={onClick}
          className="hover:text-blue-400 transition-colors hidden md:block"
        >
          {title}
        </a>
      </>
    );
  }
};

export const Drawer = ({
  title,
  subtitle,
  username = "[USERNAME]",
  children,
}: DrawerProps) => {
  const { setSubtitle } = useContext(FilterContext);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

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

  const handleFilter = (filterKey: string) => {
    setSubtitle(Values[filterKey]);

    router.push(`?filter=${filterKey}`);
    router.refresh();
  };

  return (
    <nav className="bg-white text-black dark:bg-gray-900 dark:text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="md:hidden">
            <button
              onClick={isOpen ? closeMenu : toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-xl font-bold">{title}</span>
            <span className="text-xs text-gray-400">{subtitle}</span>
          </div>
          <div className="md:hidden">
            <ButtonMenu
              content={
                <div className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none relative">
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
        </div>
        <div className="hidden md:flex space-x-8">{children}</div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
      {/********* Menu ********/}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-slate-800 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-40 shadow-2xl md:hidden`}
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
      </div>
    </nav>
  );
};
