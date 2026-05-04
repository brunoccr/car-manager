"use client";

import { RecordModel } from "pocketbase";
import { Vehicle } from "./Vehicle";
import { Popup } from "@/components/ui/Popup";

import VehicleForm from "./VehicleForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShareForm } from "./ShareForm";

export function VehiclesList({ items }: { items: RecordModel[] }) {
  const [recordId, setRecordId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [shareMode, setShareMode] = useState(false);

  const router = useRouter();

  const handleEdit = (id: string) => {
    setRecordId(id);
    setEditMode(true);
  };

  const handleEditFinish = () => {
    setEditMode(false);
    router.refresh();
  };

  const handleShare = (id: string) => {
    console.log(id);
    setRecordId(id);
    setEditMode(false);
    setShareMode(true);
  };

  const handleShareFinish = () => {
    setShareMode(false);
    router.refresh();
  };

  return (
    <>
      {editMode && (
        <Popup onClose={() => setEditMode(false)}>
          <VehicleForm
            id={recordId}
            onShare={handleShare}
            onFinish={() => handleEditFinish()}
          />
        </Popup>
      )}
      {shareMode && (
        <Popup onClose={() => setShareMode(false)}>
          <ShareForm id={recordId} onFinish={() => handleShareFinish()} />
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
