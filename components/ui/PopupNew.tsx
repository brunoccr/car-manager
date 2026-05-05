"use client";

import { ArrowLeftIcon } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface Props {
  title: string;
  onBack?: () => void;
  children: ReactNode | ReactNode[];
}

export function Popup(props: Props) {
  useEffect(() => {
    window.history.pushState({ menuOpen: true }, "");

    const handlePopState = () => {
      if (props.onBack) {
        props.onBack();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <div className="flex flex-col fixed top-0 right-0 left-0 bottom-0 z-50 dark:bg-[#111318]">
      <nav className="flex bg-white text-black dark:bg-[#111318] h-14 dark:text-white p-2 pr-5 pl-5 border-b border-b-gray-800 fixed w-full z-50 ">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4 w-full">
            {/******** Menu Hamburguer *******/}
            <div>
              <ArrowLeftIcon onClick={props.onBack} />
            </div>
            {/******** Título e Subtítulo *******/}
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-xl">{props.title}</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="">{props.children}</div>
    </div>
  );
}
