"use client";

import { RecordModel } from "pocketbase";
import { Activity } from "./Activity";
import { Popup } from "@/components/ui/Popup";

import ActivityForm from "./ActivityForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ActivityList({ items }: { items: RecordModel[] }) {
  const [recordId, setRecordId] = useState("");
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();

  const handleEdit = (id: string) => {
    setRecordId(id);
    setEditMode(true);
  };

  const handleFinish = () => {
    setEditMode(false);
    router.refresh();
  };

  return (
    <>
      {editMode && (
        <Popup onClose={() => setEditMode(false)}>
          <ActivityForm id={recordId} onFinish={() => handleFinish()} />
        </Popup>
      )}
      <ul
        role="list"
        className="text-sm p-5 flex flex-col w-full max-w-3xl overflow-y-auto"
      >
        {items &&
          items?.map((a, i, arr) => (
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
              valuePerLiters={
                (a.totalPaid as number) / (a.totalVolume as number)
              }
              onClick={(id) => handleEdit(id)}
              isLast={i + 1 == arr.length}
            />
          ))}
      </ul>
    </>
  );
}
