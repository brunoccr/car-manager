"use client";

import { createOrUpdateActivity, getActivity } from "@/actions/activities";
import { getUserVehicles } from "@actions/vehicles";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { InputField } from "@/components/ui/InputField";

const newDate = ((now: Date) =>
  `${now.getFullYear()}-${now.getMonth().toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} 12:00:00`)(
  new Date(),
);

const Placeholder = () => {
  return (
    <div
      role="status"
      className="flex flex-1 items-center p-3 h-10 bg-[#1e2024] rounded-base rounded-lg gap-3 animate-pulse"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default function ActivityForm({
  id,
  onFinish,
}: {
  id?: string;
  onFinish: () => void;
}) {
  const [error, setError] = useState("");
  const [hideFuelFields, setHideFuelFields] = useState(false);
  const [vehicles, setVehicles] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [record, setRecord] = useState<RecordModel | null>(null);

  const handleChangeType = (type: string) => {
    setHideFuelFields(type !== "Reabastecimento");
  };

  useEffect(() => {
    (async () => {
      const vehicles = await getUserVehicles();
      setVehicles(vehicles);

      if (id) {
        const activity = await getActivity(id);
        setRecord(activity);
        handleChangeType(activity?.type);
      }
    })();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    const result = await createOrUpdateActivity(formData);

    if (result.success) {
      onFinish();
    } else {
      setError(result.error as string);
    }
  };

  const canRender =
    id === undefined || (record != undefined && vehicles.length > 0);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
          {!id ? "Nova" : "Alteração de"} Atividade
        </h2>
      </div>

      <div className="mt-10 mx-auto w-full max-w-sm">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" id="id" name="id" value={id ?? ""} />
          <div>
            <InputField
              loading={!canRender}
              label="Veículo"
              name="vehicle"
              variant="combo"
              tabIndex={1}
              required
              options={vehicles}
              value={record?.car?.id}
            />
          </div>
          <div>
            <InputField
              loading={!canRender}
              label="Tipo"
              name="type"
              variant="combo"
              tabIndex={2}
              required
              value={record?.type}
              onChange={handleChangeType}
              options={[
                { label: "Reabastecimento", value: "Reabastecimento" },
                { label: "Manutenção", value: "Manutenção" },
              ]}
            />
          </div>
          <div>
            <InputField
              loading={!canRender}
              label="Data"
              name="date"
              variant="date"
              tabIndex={3}
              required
              value={record?.startdate ?? newDate}
              placeholder="00/00/0000"
            />
          </div>
          <div className="flex flex-row gap-5">
            {!hideFuelFields && (
              <InputField
                loading={!canRender}
                label="Km total"
                name="totalKM"
                variant="number"
                tabIndex={4}
                placeholder="000000"
                value={record?.totalkm}
                required
                min="1"
                step="1"
              />
            )}
            <InputField
              loading={!canRender}
              label="Total pago"
              name="totalValue"
              variant="number"
              tabIndex={5}
              value={record?.totalPaid}
              required
              placeholder="R$ 0,00"
              min="1"
              step="0.01"
            />
          </div>
          <div>
            {!hideFuelFields && (
              <InputField
                loading={!canRender}
                label="Litros"
                name="volume"
                variant="number"
                value={record?.totalVolume}
                tabIndex={6}
                required
                placeholder="0,00"
                min="1"
                step="0.01"
              />
            )}
          </div>
          {error && (
            <div className="mt-5 flex items-center flex-col text-red-700">
              {error}
            </div>
          )}
          <div>
            {canRender ? (
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="save"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {!id ? "Salvar" : "Alterar"}
              </button>
            ) : (
              <Placeholder />
            )}
          </div>
          {canRender ? (
            id && (
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
            )
          ) : (
            <Placeholder />
          )}
        </form>
      </div>
    </div>
  );
}
