"use client";

import { RecordModel } from "pocketbase";
import { Vehicle } from "./Vehicle";
import { Popup } from "@/components/ui/Popup";

import VehicleForm from "./VehicleForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function VehiclesList({ items }: { items: RecordModel[] }) {
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
          <VehicleForm id={recordId} onFinish={() => handleFinish()} />
        </Popup>
      )}
      <ul
        role="list"
        className="text-sm p-5 flex flex-col w-full max-w-3xl overflow-y-auto"
      >
        {items &&
          items?.map((i) => (
            <Vehicle
              key={i.id}
              recordId={i.id}
              brand={i.expand?.car?.brand}
              model={i.expand?.car?.model}
              plate={i.expand?.car?.plate}
              type={i.type}
              active={i.active}
              alias={i.expand?.car?.alias}
              year={i.expand?.car?.year}
              onClick={(id: string) => handleEdit(id)}
            />
          ))}
      </ul>
    </>
  );
}
