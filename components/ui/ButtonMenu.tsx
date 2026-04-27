"use client";

import { createContext, useContext, ReactNode, useState } from "react";

const MenuContext = createContext({ close: () => {} });

export function ButtonMenuItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick();
    close();
  }

  return (
    <li
      onClick={handleClick}
      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer"
    >
      {label}
    </li>
  );
}

export function ButtonMenu({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ close }}>
      <div className="flex">
        <button onClick={() => setIsOpen(!isOpen)}>{content}</button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="absolute right-0 mt-10 w-48 bg-white dark:bg-slate-800 border rounded-md shadow-xl z-20">
              <ul className="py-2 text-gray-800 dark:text-white">{children}</ul>
            </div>
          </>
        )}
      </div>
    </MenuContext.Provider>
  );
}
