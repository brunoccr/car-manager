"use client";

import { createOrUpdateActivity, getActivity } from "@/actions/activities";
import { getUserVehicles } from "@actions/vehicles";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { InputField } from "@/components/ui/InputField";
import { SaveIcon, TrashIcon } from "lucide-react";
import { useLoading } from "@/components/hooks/useLoading";
import { useConfirmation } from "@/components/hooks/useConfirmation";

const newDate = ((now: Date) =>
  `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} 12:00:00`)(
  new Date(),
);

export default function ActivityForm({
  id,
  onFinishAction,
}: {
  id?: string;
  onFinishAction: () => void;
}) {
  const [error, setError] = useState("");
  const [loading, showLoading] = useLoading();
  const [confirm, showConfirmation] = useConfirmation();
  const [location, setLocation] = useState<{ lat?: number; lng?: number }>({
    lat: undefined,
    lng: undefined,
  });
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
      } else {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          });
        }
      }
    })();
  }, [id]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const submitter = event.nativeEvent.submitter as HTMLButtonElement | null;

    const intent = submitter?.value;
    const isExclude = intent === "exclude";

    let resultConfirm;

    if (isExclude) {
      resultConfirm = await showConfirmation(
        "Confirma a exclusão da Atividade?",
      );
    }

    if (!isExclude || (isExclude && resultConfirm)) {
      formData.append("intent", intent);

      showLoading("Processando", async () => {
        const result = await createOrUpdateActivity(formData);

        if (result.success) {
          onFinishAction();
        } else {
          setError(result.error as string);
        }
      });
    }
  };

  const canRender =
    id === undefined || (record != undefined && vehicles.length > 0);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#111318] rounded-lg">
      {loading}
      {confirm}
      <div className="mt-10 mx-auto w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" id="id" name="id" value={id ?? ""} />
          <input type="hidden" id="lat" name="lat" value={location.lat ?? ""} />
          <input type="hidden" id="lng" name="lng" value={location.lng ?? ""} />
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
          <div className="flex flex-row gap-5">
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
            {!hideFuelFields && (
              <InputField
                loading={!canRender}
                label="Encheu o Tanque?"
                name="fill"
                variant="combo"
                value={record?.fill}
                tabIndex={7}
                required
                options={[
                  { label: "Sim", value: "true" },
                  { label: "Não", value: "false" },
                ]}
              />
            )}
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
