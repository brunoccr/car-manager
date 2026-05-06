"use client";

import { createOrUpdateVehicle, getVehicle } from "@/actions/vehicles";
import { RecordModel } from "pocketbase";
import { InputField } from "@/components/ui/InputField";
import { useEffect, useState } from "react";
import { SaveIcon, Share2Icon, TrashIcon } from "lucide-react";

export default function VehicleForm({
  id,
  onFinish,
  onShare,
}: {
  id?: string;
  onFinish: () => void;
  onShare?: (id: string) => void;
}) {
  const [error, setError] = useState("");
  const [record, setRecord] = useState<RecordModel | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const vehicle = await getVehicle(id);
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
  const isOwner = record != undefined && record.type === "owner";

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg">
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

          {/****** Float Buttons *******/}
          <div className="flex flex-col gap-5 fixed bottom-6 right-6 rounded-2xl shadow-lg z-40">
            {canRender && (
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="save"
                className="flex justify-center rounded-2xl shadow-lg p-4 bg-indigo-500"
              >
                <SaveIcon />
              </button>
            )}

            {isOwner && canRender && (
              <button
                tabIndex={99}
                onClick={() => onShare && onShare(record?.expand?.car.id || "")}
                className="flex justify-center rounded-2xl shadow-lg p-4 bg-green-500"
              >
                <Share2Icon />
              </button>
            )}

            {canRender && id && (
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="exclude"
                className="flex justify-center rounded-2xl shadow-lg p-4 bg-red-600"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
