import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import type { PropsWithChildren } from "react";

import useListData from "@hooks/useListData";

type Props = {
  id: string;
  index: number;
};

export default function ListSection({
  id,
  index,
  children,
}: PropsWithChildren<Props>) {
  const { ref } = useSortable({
    accept: ["section", "item"],
    collisionPriority: CollisionPriority.Low,
    id,
    index,
    type: "section",
  });

  const { sections } = useListData();
  const { name } = sections[id];

  return (
    <ul className="list bg-base-100 rounded-box shadow-md" ref={ref}>
      <li className={`p-4 pb-2 text-xs tracking-wide opacity-60`}>{name}</li>

      {children}
    </ul>
  );
}
