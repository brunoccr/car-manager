"use client";

import { formatDate, formatNumber } from "@components/utils/formats";
import { FuelIcon, WrenchIcon } from "lucide-react";

interface ActivityItemProps {
  recordId: string;
  activityType: string;
  createdDate: string;
  carName: string;
  value: number;
  totalKM?: number;
  KMPerLitres?: number;
  liters?: number;
  valuePerLiters?: number;
  fill: boolean;
  onClick?: (id: string) => void;
  isLast: boolean;
}

export function Activity(props: ActivityItemProps) {
  const {
    recordId,
    activityType,
    createdDate,
    carName,
    value,
    totalKM,
    KMPerLitres,
    liters,
    valuePerLiters,
    fill,
    onClick = () => {},
    isLast,
  } = props;

  return (
    <li
      key={recordId}
      className="flex flex-row"
      onClick={() => onClick(recordId)}
    >
      <div className="flex flex-col mr-5">
        <div className="flex justify-center">
          {activityType == "Reabastecimento" ? (
            <FuelIcon color="#6BAED5" />
          ) : (
            <WrenchIcon color="#6BAED5" />
          )}
        </div>
        <div className="flex flex-col items-center h-full mt-5 mb-5">
          <div className={`${!isLast ? "border-r" : ""} h-full`}></div>
        </div>
      </div>
      <div className="mb-10 w-full">
        <div className="flex items-center mb-2 h-6 justify-between font-bold">
          <div>
            {activityType}
            {activityType == "Reabastecimento"
              ? fill
                ? " (Total)"
                : " (Parcial)"
              : ""}
          </div>
          <div className="bg-indigo-500 pr-2 pl-2 rounded-sm">{carName}</div>
        </div>
        <div>
          <div className="flex flex-col w-full gap-1 text-gray-500">
            <div className="flex flex-row justify-between w-full">
              <div>{formatDate(createdDate)}</div>
              <div className="text-white">R$ {formatNumber(value, 2)}</div>
            </div>
            {activityType == "Reabastecimento" && (
              <>
                <div className="flex flex-row justify-between w-full">
                  <div>{totalKM} Km</div>
                  <div>{formatNumber(KMPerLitres, 1)} Km/L</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>{formatNumber(liters, 1)} L</div>
                  <div>R$ {formatNumber(valuePerLiters, 2)} / L</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
