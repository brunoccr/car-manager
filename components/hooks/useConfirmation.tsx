"use client";

import { useState, useCallback } from "react";

interface ConfirmationState {
  message: string;
  resolve: (value: boolean) => void;
}

export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState | null>(null);

  const showConfirmation = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        message,
        resolve,
      });
    });
  }, []);

  const handleClose = (value: boolean) => {
    if (state) {
      state.resolve(value);
      setTimeout(() => {
        setState(null);
      }, 50);
    }
  };

  const confirmComponent = state ? (
    <div className="fixed z-100 inset-0 w-full h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => handleClose(false)}
      ></div>
      <div className="relative z-10 rounded-lg mr-5 ml-5 min-w-[90%] md:min-w-96">
        <div className="absolute right-0 top-0 z-10 ">
          <button
            onClick={() => handleClose(false)}
            className="flex flex-col justify-center -mt-8 -mr-2 items-center w-8 h-8 space-y-3.5 focus:outline-none z-50 relative"
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300 rotate-45 translate-y-2"></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-300 -rotate-45 -translate-y-2"></span>
          </button>
        </div>
        <div className="flex flex-col items-center p-5 justify-center bg-[#1e2024] rounded-base rounded-2xl">
          <p className="py-5 text-lg text-center">{state.message}</p>
          <div className="flex space-around mt-5 gap-5">
            <button
              className="flex w-full justify-center rounded-md bg-red-800 px-6 py-3 text-sm/6 font-semibold text-white"
              onClick={() => handleClose(false)}
            >
              Cancelar
            </button>
            <button
              className="flex w-full justify-center rounded-md bg-green-800 px-6 py-3 text-sm/6 font-semibold text-white"
              onClick={() => handleClose(true)}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return [confirmComponent, showConfirmation] as const;
}
