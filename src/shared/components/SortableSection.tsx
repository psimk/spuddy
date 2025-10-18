import { CollisionPriority } from "@dnd-kit/abstract";
import type { FeedbackType } from "@dnd-kit/dom";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ComponentProps, PropsWithChildren } from "react";

import Section from "@shared/components/Section";

type Props = ComponentProps<typeof Section> & {
  id: string;
  index: number;
  group?: string;
  type?: string;
  accept?: string | Array<string>;
  feedback?: FeedbackType;
};

export default function SortableSection({
  id,
  index,
  group,
  type,
  accept,
  feedback,
  ...props
}: PropsWithChildren<Props>) {
  const { ref, handleRef } = useSortable({
    id,
    index,
    group,
    type,
    accept,
    collisionPriority: CollisionPriority.Low,
    feedback,
  });

  return <Section {...props} ref={ref} handleRef={handleRef} />;
}
