import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import type { Section } from "../types";

import ListItem from "./ListItem";

export default function ListSection({
  id,
  items,
  index,
}: {
  index: number;
  id: string;
  items: Section;
}) {
  const { ref } = useSortable({
    accept: ["section", "item"],
    collisionPriority: CollisionPriority.Low,
    id,
    index,
    type: "section",
  });

  return (
    <ul className="list bg-base-100 rounded-box shadow-md" ref={ref}>
      <li
        className={`p-4 ${items.length > 0 ? "pb-2" : ""} text-xs tracking-wide opacity-60`}
      >
        {id.toUpperCase()}
      </li>

      {items.map((item, index) => (
        <ListItem {...item} key={item.id} index={index} sectionId={id} />
      ))}
    </ul>
  );
}
