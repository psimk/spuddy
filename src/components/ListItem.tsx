import { useSortable } from "@dnd-kit/react/sortable";

import useListData from "@hooks/useListData";

import AutoHeightTextArea from "./AutoHeightTextArea";
import DotsGridIcon from "./DotsGridIcon";

type Props = {
  id: string;
  index: number;
  sectionId: string;
};

export default function ListItem({ id, index, sectionId }: Props) {
  const { ref, isDragging, handleRef } = useSortable({
    id,
    index,
    group: sectionId,
    type: "item",
    accept: ["item"],
    data: { sectionId },
    feedback: "clone",
  });

  const { items, updateItemText } = useListData();
  const { text } = items[id];

  return (
    <li
      className="list-row p-4 flex"
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span
        ref={handleRef}
        className="h-full absolute right-0 top-0 p-4 flex items-center justify-center cursor-move"
      >
        <DotsGridIcon />
      </span>
      <AutoHeightTextArea
        id={id}
        className="textarea rounded-xl overflow-y-hidden list-col-grow textarea-ghost min-h-3.5 w-full touch-pan-y resize-none leading-normal whitespace-pre disabled:opacity-50 outline-none py-0 px-2 m-0 border-0"
        onChange={(text) => updateItemText(id, text)}
        value={text}
      />
    </li>
  );
}
