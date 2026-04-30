"use client";

import { CarIcon } from "lucide-react";
import { acceptInvice } from "@/actions/vehicles";
import { useRouter } from "next/navigation";

interface VehicleItemProps {
  recordId: string;
  brand: string;
  model: string;
  plate: string;
  type: string;
  alias: string;
  year: string;
  active: boolean;
  onClick?: (id: string) => void;
}

export function Vehicle(props: VehicleItemProps) {
  const router = useRouter();

  const {
    recordId,
    brand,
    model,
    plate,
    type,
    alias,
    year,
    active,
    onClick = () => {},
  } = props;

  const handleAcceptInvite = async (id: string) => {
    await acceptInvice(id);
    router.refresh();
  };

  return (
    <li key={recordId} className="flex flex-col">
      <div className="flex" onClick={() => onClick(recordId)}>
        <div className="flex flex-col mr-5">
          <div className="flex justify-center">
            <CarIcon color="#6BAED5" />
          </div>
        </div>
        <div className="mb-5 w-full text-white">
          <div className="flex items-center mb-2 h-6 justify-between font-bold">
            <div>{alias}</div>
            <div className="bg-indigo-500 pr-2 pl-2 rounded-sm">
              {type === "owner" ? "Proprietário" : "Compartilhado"}
            </div>
          </div>
          <div>
            <div className="flex flex-col w-full gap-1 text-white">
              <div className="flex flex-row justify-between w-full">
                <div className="text-white">
                  Marca:<span className="text-gray-500 ml-1">{brand}</span>
                </div>
                <div className="text-white">
                  Ano: <span className="text-gray-500 ml-1">{year}</span>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div>
                  Modelo: <span className="text-gray-500 ml-1">{model}</span>
                </div>
                <div>
                  Placa: <span className="text-gray-500 ml-1">{plate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10">
        {type === "invited" && !active && (
          <button
            tabIndex={99}
            name="intent"
            value="save"
            onClick={() => handleAcceptInvite(recordId)}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Aceitar Compartilhamento
          </button>
        )}
      </div>
    </li>
  );
}
