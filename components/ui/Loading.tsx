import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export function Loading({ label }: { label: string }) {
  const { pending } = useFormStatus();

  if (!pending) {
    return null;
  }

  return (
    <div className="fixed z-100 inset-0 w-full h-screen flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative flex flex-col items-center justify-center z-10 rounded-lg bg-[#111318] p-10">
        <Loader className="animate-spin w-5 h-8" />
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}
