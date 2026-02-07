import type { AutomergeUrl } from "@automerge/automerge-repo";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import { type PropsWithChildren } from "react";

import { cn } from "@utils/cn";

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

  const noChildren = Array.isArray(children) && children.length === 0;

  return (
    <ul className="list rounded-box drop-shadow-xl" ref={ref}>
      <li
        className={cn(
          noChildren ? "rounded-box" : "rounded-t-box",
          "bg-base-100 p-4 text-xs tracking-wide text-base-content/60",
        )}
      >
        {name}
      </li>

      {children}
    </ul>
  );
}
