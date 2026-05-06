import { RecordModel } from "pocketbase";
import { Sharing } from "./Sharing";

export function SharingList({
  items,
  onDelete,
}: {
  items: RecordModel[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-[#1e2024] rounded-base rounded-2xl p-5">
      <div className="flex justify-center text-xs text-gray-400 mb-5">
        Compartilhamentos
      </div>
      {items &&
        items?.map((i) => {
          return (
            <Sharing
              key={i.id}
              id={i.id}
              fullName={i.expand?.user.name}
              email={i.expand?.user.email}
              onClick={onDelete}
            />
          );
        })}
    </div>
  );
}
