import { disableRelation, getRelations } from "@/actions/vehicles";
import { SharingList } from "./SharingList";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";

export function Sharings({ id }: { id: string }) {
  const [relations, setRelations] = useState<RecordModel[]>([]);

  useEffect(() => {
    getRelations(id).then((r) => setRelations(r));
  }, [id]);

  const handleDelete = async (id: string) => {
    const { success } = await disableRelation(id);

    if (success) {
      setRelations(relations.filter((r) => r.id !== id));
    }
  };

  return <SharingList items={relations} onDelete={handleDelete} />;
}
