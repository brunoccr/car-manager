"use client";

import { createShareVehicle } from "@/actions/vehicles";
import { InputField } from "@/components/ui/InputField";
import { Share2Icon } from "lucide-react";
import { useState } from "react";
import { Sharings } from "./Sharings";

export function ShareForm({
  id,
  onFinish,
}: {
  id: string;
  onFinish?: () => void;
}) {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const result = await createShareVehicle(formData);

    if (result.success && onFinish) {
      onFinish();
    } else {
      setError(result.error as string);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg items-center">
      <div className="mt-10 mx-auto w-full max-w-sm">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" id="id" name="id" value={id ?? ""} />
          <div>
            <InputField
              label="E-mail"
              variant="email"
              name="email"
              tabIndex={1}
              required
            />
          </div>
          {error && (
            <div className="mt-5 flex items-center flex-col text-red-700">
              {error}
            </div>
          )}
          {/****** Float Buttons *******/}
          <div className="flex flex-col gap-5 fixed bottom-6 right-6 rounded-2xl shadow-lg z-40">
            <button
              tabIndex={99}
              type="submit"
              name="intent"
              value="save"
              className="flex justify-center rounded-2xl shadow-lg p-4 bg-green-500"
            >
              <Share2Icon />
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-full max-w-3xl">
        <Sharings id={id} />
      </div>
    </div>
  );
}
