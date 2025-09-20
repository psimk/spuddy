import { type ComponentProps } from "react";
import { Grip } from "lucide-react";

import { useSortable } from "@dnd-kit/react/sortable";

import SwipeListItem from "./SwipeListItem";

type Props = Omit<ComponentProps<typeof SwipeListItem>, "suffix"> & {
  index: number;
};

export default function SortableListItem({ id, index, ...props }: Props) {
  const { ref, isDragging, handleRef } = useSortable({ id, index });

  return (
    <SwipeListItem
      {...props}
      id={id}
      ref={ref}
      disabled={isDragging}
      suffix={
        !isDragging && (
          <div
            ref={handleRef}
            className="flex h-auto cursor-grab items-center justify-center"
          >
            <Grip />
          </div>
        )
      }
    />
  );
}
