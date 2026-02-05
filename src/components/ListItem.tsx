import { useSortable } from "@dnd-kit/react/sortable";

import PlayIcon from "@components/PlayIcon";

import type { Item } from "../types";

type Props = {
  id: Item["id"];
  index: number;
  sectionId: string;
};

export default function ListItem({ id, index, sectionId }: Props) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group: sectionId,
    type: "item",
    accept: ["item"],
    data: { sectionId },
    feedback: "clone",
  });

  return (
    <li
      className="list-row"
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>
        <img
          className="rounded-box size-10"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />
      </div>
      <div>
        <div>{id}</div>
        <div className="text-xs font-semibold uppercase opacity-60">
          Remaining Reason
        </div>
      </div>
      <button className="btn btn-square btn-ghost">
        <PlayIcon />
      </button>
    </li>
  );
}
