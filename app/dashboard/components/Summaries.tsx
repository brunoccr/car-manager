"use server";

import { getSummaries } from "@/actions/summaries";
import { formatNumber } from "@components/utils/formats";
import { BellIcon, FuelIcon, GaugeIcon, WrenchIcon } from "lucide-react";

export async function Summaries({ filter }: { filter: string }) {
  const result = await getSummaries(filter);

  return (
    <div className="flex flex-col p-5 gap-5 w-full max-w-3xl">
      <div className="flex flex-row w-full gap-5">
        <div className="flex flex-1 items-center p-5 h-20 bg-[#1e2024] rounded-base rounded-2xl gap-3">
          <div className="bg-[#022f5c] p-2 rounded-lg">
            <GaugeIcon color="#a7cafd" />
          </div>
          <div>
            <div className="text-[0.7rem] text-gray-400">Consumo</div>
            <div className="text-xs font-bold">
              {formatNumber(result.summary?.consume, 1)} Km/L
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center p-5 h-20 bg-[#1e2024] rounded-base rounded-2xl gap-3">
          <div className="bg-[#022f5c] p-2 rounded-lg">
            <BellIcon fill="#a7cafd" color="#a7cafd" />
          </div>
          <div>
            <div className="text-[0.7rem] text-gray-400">Lembretes</div>
            <div className="text-xs font-bold">Nenhum</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-30 bg-[#1e2024] rounded-base rounded-2xl">
        <div className="text-3xl font-bold">
          R$ {formatNumber(result.summary?.totalPaid, 2)}
        </div>
        <div className="text-xs text-gray-400">Total em gastos</div>
      </div>
      <div className="flex flex-col h-80 bg-[#1e2024] rounded-base rounded-2xl w-full p-5">
        <div className="flex w-full justify-center text-xs text-gray-400 mb-5">
          Distribuição de Gastos
        </div>
        <div className="h-full flex flex-col gap-3">
          {/* Reabastecimento */}
          <div className="flex justify-between text-[0.9rem] gap-3">
            <div className="bg-[#1f382f] p-2 rounded-lg">
              <FuelIcon color="#23af64" />
            </div>
            <div className="flex flex-col justify-start w-full">
              <div>Reabastecimento</div>
              <div className="text-xs text-gray-400">
                {(result.summary?.expenses.fuel.quantity || 0) > 0
                  ? `${result.summary?.expenses.fuel.quantity} registro(s)`
                  : "Nenhum registro"}
              </div>
            </div>
            <div className="flex text-nowrap">
              R$ {formatNumber(result.summary?.expenses.fuel.value, 2)}
            </div>
          </div>
          {/* Manutenções */}
          <div className="flex justify-between text-[0.9rem] gap-3">
            <div className="bg-[#21272c] p-2 rounded-lg">
              <WrenchIcon color="#34475c" />
            </div>
            <div className="flex flex-col justify-start w-full">
              <div>Manutenções</div>
              <div className="text-xs text-gray-400">
                {(result.summary?.expenses.maintenances.quantity || 0) > 0
                  ? `${result.summary?.expenses.maintenances.quantity} registro(s)`
                  : "Nenhum registro"}
              </div>
            </div>
            <div className="flex text-nowrap">
              R$ {formatNumber(result.summary?.expenses.maintenances.value, 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
