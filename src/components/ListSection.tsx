import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import type { PropsWithChildren } from "react";

import type { Section } from "../types";

type Props = {
  id: Section["id"];
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

  return (
    <ul className="list bg-base-100 rounded-box shadow-md" ref={ref}>
      <li className={`p-4 pb-2 text-xs tracking-wide opacity-60`}>
        {id.toUpperCase()}
      </li>

      {children}
    </ul>
  );
}
