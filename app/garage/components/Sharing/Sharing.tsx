import { TrashIcon } from "lucide-react";

interface SharingProps {
  id: string;
  fullName: string;
  email: string;
  onClick: (id: string) => void;
}

export function Sharing(props: SharingProps) {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-700 pt-2 pb-2 text-[0.9rem]">
      <div>
        {props.fullName} ({props.email})
      </div>
      <div className="p-2 bg-red-600 rounded-lg">
        <TrashIcon size={15} onClick={() => props.onClick(props.id)} />
      </div>
    </div>
  );
}
