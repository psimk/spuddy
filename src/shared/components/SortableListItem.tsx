import { type ComponentProps } from "react";
import { Grip } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { FeedbackType } from "@dnd-kit/dom";

import SwipeListItem from "@shared/components/SwipeListItem";

type Props = Omit<ComponentProps<typeof SwipeListItem>, "suffix"> & {
  index: number;
  group?: string;
  type?: string;
  accept?: string;
  feedback?: FeedbackType;
};

export default function SortableListItem({
  id,
  index,
  group,
  type,
  accept,
  feedback,
  ...props
}: Props) {
  const { ref, isDragging, handleRef } = useSortable({
    id,
    index,
    group,
    type,
    accept,
    feedback,
  });

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
            className="flex h-auto cursor-grab items-center justify-center pr-3"
          >
            <Grip />
          </div>
        )
      }
    />
  );
}
