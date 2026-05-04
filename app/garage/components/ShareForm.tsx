"use client";

import { createShareVehicle } from "@/actions/vehicles";
import { InputField } from "@/components/ui/InputField";
import { useState } from "react";

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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
          Compartilhamento de Veículo
        </h2>
      </div>

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
          <div className="flex gap-5">
            <div className="w-full">
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="save"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Compartilhar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
