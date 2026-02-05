import { useSortable } from "@dnd-kit/react/sortable";
import type { Item } from "../types";
import PlayIcon from "./PlayIcon";

export default function ListItem({
  id,
  index,
  sectionId,
}: Item & { index: number; sectionId: string }) {
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
