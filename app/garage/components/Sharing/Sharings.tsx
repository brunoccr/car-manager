import { disableRelation, getRelations } from "@/actions/vehicles";
import { SharingList } from "./SharingList";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/components/hooks/useConfirmation";
import { useLoading } from "@/components/hooks/useLoading";

export function Sharings({ id }: { id: string }) {
  const [relations, setRelations] = useState<RecordModel[]>([]);
  const [confirm, showConfirmation] = useConfirmation();
  const [loading, showLoading] = useLoading();

  useEffect(() => {
    getRelations(id, false).then((r) => setRelations(r));
  }, [id]);

  const handleDelete = async (id: string) => {
    const result = await showConfirmation(
      "Confirma a exclusão do compartilhamento?",
    );

    if (result) {
      showLoading("Processando", async () => {
        const { success } = await disableRelation(id);

        if (success) {
          setRelations(relations.filter((r) => r.id !== id));
        }
      });
    }
  };

  return relations.length > 0 ? (
    <>
      {confirm}
      {loading}
      <SharingList items={relations} onDelete={handleDelete} />
    </>
  ) : null;
}
