import { useState, type ComponentProps } from "react";
import { move } from "@dnd-kit/helpers";

import type { DragDropProvider } from "@dnd-kit/react";
import type { Sections } from "../types";

type DragDropProviderProps = ComponentProps<typeof DragDropProvider>;
type DragEvents = Pick<
  DragDropProviderProps,
  "onDragOver" | "onDragStart" | "onDragEnd"
>;

type DragOverCallback = DragEvents["onDragOver"];

export default function useSortableList(initialData: Sections) {
  const [state, setState] = useState({
    sections: initialData,
    order: Object.keys(initialData),
  });

  const onDragOver: DragOverCallback = (event) => {
    const { source } = event.operation;

    // We can rely on optimistic sorting for columns
    if (source?.type === "section") {
      setState((previous) => ({
        ...previous,
        order: move(previous.order, event),
      }));

      return;
    }

    setState((previous) => ({
      ...previous,
      sections: move(previous.sections, event),
    }));
  };

  return {
    state,
    handlers: {
      onDragOver,
    },
  };
}
