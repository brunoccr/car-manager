import { ReactNode, useEffect } from "react";

export const Popup = ({
  onClose,
  children,
}: {
  onClose: (result: boolean) => void;
  children: ReactNode | ReactNode[];
}) => {
  useEffect(() => {
    window.history.pushState({ menuOpen: true }, "");

    const handlePopState = () => {
      onClose(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <div className="fixed z-100 inset-0 w-full h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => onClose(false)}
      ></div>
      <div className="relative z-10 rounded-lg mr-5 ml-5 min-w-[90%] md:min-w-96">
        <div className="absolute right-0 top-0 z-10 ">
          <button
            onClick={() => onClose(false)}
            className="flex flex-col justify-center -mt-8 -mr-2 items-center w-8 h-8 space-y-3.5 focus:outline-none z-50 relative"
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300 rotate-45 translate-y-2"></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-300 -rotate-45 -translate-y-2"></span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
