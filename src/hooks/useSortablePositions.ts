import { move } from "@dnd-kit/helpers";
import type { DragDropProvider } from "@dnd-kit/react";
import { type ComponentProps, useEffect, useState } from "react";

import syncArrayChanges from "@utils/sync-array-changes";

import usePositionsDocument from "@hooks/usePositionsDocument";

type DragDropProviderProps = ComponentProps<typeof DragDropProvider>;
type DragEvents = Pick<
  DragDropProviderProps,
  "onDragOver" | "onDragStart" | "onDragEnd"
>;

type DragOverCallback = DragEvents["onDragOver"];
type DragEndCallback = DragEvents["onDragEnd"];

type PositionsState = {
  sections: Array<string>;
  items: Record<string, Array<string>>;
};

function clonePositions({
  sections,
  items,
}: ReturnType<typeof usePositionsDocument>[0]): PositionsState {
  return {
    sections: Array.from(sections),
    items: Object.fromEntries(
      Object.entries(items).map(([key, value]) => [key, Array.from(value)]),
    ),
  };
}

export default function useSortablePositions() {
  const [positionsDoc, changePositions] = usePositionsDocument();

  const [state, setState] = useState(() => clonePositions(positionsDoc));

  useEffect(() => setState(clonePositions(positionsDoc)), [positionsDoc]);

  const onDragOver: DragOverCallback = (event) => {
    const { source } = event.operation;

    if (source?.type === "section") {
      setState((previous) => ({
        ...previous,
        sections: move(previous.sections, event),
      }));
      return;
    }

    setState((previous) => ({
      ...previous,
      items: move(previous.items, event),
    }));
  };

  const onDragEnd: DragEndCallback = (event) => {
    const { canceled } = event.operation;

    if (canceled) return;

    // Only update positions document
    changePositions((doc) => {
      syncArrayChanges(doc.sections, state.sections);

      for (const [sectionId, itemIds] of Object.entries(state.items)) {
        doc.items[sectionId] ??= [] as unknown as ExtendedArray<string>;

        syncArrayChanges(doc.items[sectionId], itemIds);
      }
    });
  };

  return {
    ...state,
    handlers: {
      onDragOver,
      onDragEnd,
    },
  };
}
