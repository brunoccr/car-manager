"use client";

import { createOrUpdateVehicle, getVehicle } from "@/actions/vehicles";
import { RecordModel } from "pocketbase";
import { InputField } from "@/components/ui/InputField";
import { useEffect, useState } from "react";

export default function VehicleForm({
  id,
  onFinish,
}: {
  id?: string;
  onFinish: () => void;
}) {
  const [error, setError] = useState("");
  const [record, setRecord] = useState<RecordModel | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const vehicle = await getVehicle(id);
        console.log(vehicle);
        setRecord(vehicle);
      }
    })();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    const result = await createOrUpdateVehicle(formData);

    if (result.success) {
      onFinish();
    } else {
      setError(result.error as string);
    }
  };

  const canRender = id === undefined || record != undefined;

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
          {!id ? "Novo" : "Alteração de"} Veículo
        </h2>
      </div>

      <div className="mt-10 mx-auto w-full max-w-sm">
        <form action={handleSubmit} className="space-y-6">
          <input
            type="hidden"
            id="id"
            name="id"
            value={record?.expand?.car.id ?? ""}
          />
          <div>
            <InputField
              loading={!canRender}
              label="Apelido"
              name="alias"
              tabIndex={2}
              required
              value={record?.expand?.car?.alias}
              placeholder="Toyota Rav4"
            />
          </div>
          <div className="flex flex-row gap-5">
            <InputField
              loading={!canRender}
              label="Marca"
              name="brand"
              tabIndex={2}
              required
              value={record?.expand?.car?.brand}
              placeholder="Toyota"
            />
            <InputField
              loading={!canRender}
              label="Modelo"
              name="model"
              tabIndex={2}
              required
              value={record?.expand?.car?.model}
              placeholder="Rav4"
            />
          </div>
          <div className="flex flex-row gap-5">
            <InputField
              loading={!canRender}
              label="Ano"
              name="year"
              variant="number"
              tabIndex={4}
              placeholder="0000"
              value={record?.expand?.car?.year}
              required
              min="1"
              step="1"
            />
            <InputField
              loading={!canRender}
              label="Placa"
              name="plate"
              tabIndex={2}
              required
              value={record?.expand?.car?.plate}
              placeholder="AAA-0A00"
            />
          </div>
          {error && (
            <div className="mt-5 flex items-center flex-col text-red-700">
              {error}
            </div>
          )}
          <div>
            {canRender && (
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="save"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {!id ? "Salvar" : "Alterar"}
              </button>
            )}
          </div>
          {canRender && id && (
            <div>
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="exclude"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Excluir
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
