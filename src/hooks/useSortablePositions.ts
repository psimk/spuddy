import { move } from "@dnd-kit/helpers";
import type { DragDropProvider } from "@dnd-kit/react";
import { type ComponentProps, useEffect, useState } from "react";

import usePositionsDocument from "@hooks/usePositionsDocument";

import type { ExtendedArray } from "../types";

type DragDropProviderProps = ComponentProps<typeof DragDropProvider>;
type DragEvents = Pick<
  DragDropProviderProps,
  "onDragOver" | "onDragStart" | "onDragEnd"
>;

type DragOverCallback = DragEvents["onDragOver"];
type DragEndCallback = DragEvents["onDragEnd"];

type PositionState = {
  order: Array<string>;
  itemPositions: Record<string, Array<string>>;
};

// Calculate differences and apply fine-grained updates to arrays
function syncArrayChanges(
  target: ExtendedArray<string>,
  source: Array<string>,
) {
  // Find differences and apply minimal changes
  if (target.length === 0 && source.length > 0) {
    // Initialize empty array
    for (const item of source) {
      target.push(item);
    }
    return;
  }

  // Simple approach: if arrays differ, update efficiently
  // For move operations, this typically changes just a few positions
  let i = 0;
  while (i < Math.max(target.length, source.length)) {
    if (i >= source.length) {
      // Remove extra items from target
      target.deleteAt(target.length - 1);
    } else if (i >= target.length) {
      // Add new items to target
      target.push(source[i]);
      i++;
    } else if (target[i] !== source[i]) {
      // Replace differing item
      target[i] = source[i];
      i++;
    } else {
      i++;
    }
  }
}

function clonePositions(
  positionsDoc: ReturnType<typeof usePositionsDocument>[0],
) {
  return {
    order: [...positionsDoc.sectionOrder],
    itemPositions: Object.fromEntries(
      Object.entries(positionsDoc.itemPositions).map(([key, value]) => [
        key,
        [...value],
      ]),
    ),
  };
}

export default function useSortablePositions() {
  const [positionsDoc, changePositions] = usePositionsDocument();

  const [state, setState] = useState<PositionState>(() =>
    clonePositions(positionsDoc),
  );

  // Deep copy to avoid direct mutations on Automerge arrays
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setState(clonePositions(positionsDoc)), [positionsDoc]);

  const onDragOver: DragOverCallback = (event) => {
    const { source } = event.operation;

    if (source?.type === "section") {
      setState((previous) => ({
        ...previous,
        order: move(previous.order, event),
      }));
      return;
    }

    setState((previous) => ({
      ...previous,
      itemPositions: move(previous.itemPositions, event),
    }));
  };

  const onDragEnd: DragEndCallback = (event) => {
    const { canceled } = event.operation;

    if (canceled) return;

    // Only update positions document
    changePositions((doc) => {
      // Sync section order array
      syncArrayChanges(doc.sectionOrder, state.order);

      // Sync item positions for each section
      for (const [sectionId, itemIds] of Object.entries(state.itemPositions)) {
        if (!doc.itemPositions[sectionId]) {
          doc.itemPositions[sectionId] = [] as unknown as ExtendedArray<string>;
        }

        syncArrayChanges(doc.itemPositions[sectionId], itemIds);
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
