"use client";

import { Loader } from "lucide-react";
import { useState, useTransition } from "react";

type UseLoadingReturn = [
  React.ReactNode | null,
  (label: string, fn: () => void) => void,
];

export function useLoading(): UseLoadingReturn {
  const [label, setLabel] = useState("");
  const [isPending, startTransition] = useTransition();

  const showLoading = async (label: string, fn: () => void) => {
    setLabel(label);
    startTransition(fn);
  };

  const component = isPending ? (
    <div
      key="loading"
      className="fixed z-100 inset-0 w-full h-screen flex justify-center items-center"
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative flex flex-col items-center justify-center z-10 rounded-lg bg-[#111318] p-10">
        <Loader className="animate-spin w-5 h-8" />
        <div className="text-sm">{label}</div>
      </div>
    </div>
  ) : null;

  return [component, showLoading];
}
