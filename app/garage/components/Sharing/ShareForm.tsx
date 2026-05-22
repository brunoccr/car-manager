"use client";

import { createShareVehicle } from "@/actions/vehicles";
import { InputField } from "@/components/ui/InputField";
import { Share2Icon } from "lucide-react";
import { useState } from "react";
import { Sharings } from "./Sharings";
import { useLoading } from "@/components/hooks/useLoading";

export function ShareForm({
  id,
  onFinishAction,
}: {
  id: string;
  onFinishAction?: () => void;
}) {
  const [error, setError] = useState("");
  const [loading, showLoading] = useLoading();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    showLoading("Processando", async () => {
      const result = await createShareVehicle(formData);

      if (result.success && onFinishAction) {
        onFinishAction();
      } else {
        setError(result.error as string);
      }
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg items-center">
      <div className="mt-10 mx-auto w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {loading}
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
