import type { AutomergeUrl } from "@automerge/automerge-repo";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import { type PropsWithChildren } from "react";

import useSectionDocument from "@hooks/useSectionDocument";

type Props = {
  id: AutomergeUrl;
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

  const [section] = useSectionDocument(id);
  const { name } = section;

  return (
    <ul className="list rounded-box drop-shadow-xl" ref={ref}>
      <li className="p-4 text-xs bg-base-100 tracking-wide text-base-content/60 rounded-t-box">
        {name}
      </li>

      {children}
    </ul>
  );
}
