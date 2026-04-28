"use server";

import { getActivities } from "@/actions/activities";
import { FuelIcon, WrenchIcon } from "lucide-react";

export interface ActivityItemProps {
  recordId: string;
  activityType: string;
  createdDate: string;
  carName: string;
  value: number;
  totalKM?: number;
  KMPerLitres?: number;
  liters?: number;
  valuePerLiters?: number;
  isLast: boolean;
}

async function Activity(props: ActivityItemProps) {
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
    isLast,
  } = props;

  const formatNumber = (value: number | undefined, precision: number = 0) => {
    if (value == undefined) {
      return "";
    }

    return value
      .toFixed(precision)
      .toString()
      .replaceAll(",", "@")
      .replaceAll(".", ",")
      .replaceAll("@", ".");
  };

  const formatDate = (value: string) => {
    const refDate = new Date(value);

    const strDay = refDate.getDate().toString().padStart(2, "0");
    const strMonth = (refDate.getMonth() + 1).toString().padStart(2, "0");
    const strYear = refDate.getFullYear();

    return `${strDay}/${strMonth}/${strYear}`;
  };

  return (
    <li key={recordId} className="flex flex-row">
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
        <div className="flex items-center  mb-2 h-6 justify-between font-bold">
          <div>{activityType}</div>
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
                  <div>{formatNumber(KMPerLitres, 0)} Km/L</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>{liters} L</div>
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

export async function Activities({ filter }: { filter: string }) {
  const activities = await getActivities(filter);

  return (
    <ul
      role="list"
      className="text-sm  p-5 dark:bg-black flex flex-col w-full max-w-3xl"
    >
      {activities &&
        activities?.map((a, i, arr) => (
          <Activity
            key={a.id}
            recordId={a.id}
            activityType={a.type}
            createdDate={a.startdate}
            carName={a.expand?.car.alias}
            value={a.totalPaid}
            totalKM={a.totalkm}
            KMPerLitres={a.KMPerLitres}
            liters={a.totalVolume}
            valuePerLiters={(a.totalPaid as number) / (a.totalVolume as number)}
            isLast={i + 1 == arr.length}
          />
        ))}
    </ul>
  );
}
