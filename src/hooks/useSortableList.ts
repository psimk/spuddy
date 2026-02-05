import { useState, useEffect, type ComponentProps } from "react";
import { useDocument } from "@automerge/react";
import { move } from "@dnd-kit/helpers";

import type { DragDropProvider } from "@dnd-kit/react";
import type { AutomergeDoc, ExtendedArray, Sections } from "../types";
import { useDocumentUrl } from "../lib/automerge";

type DragDropProviderProps = ComponentProps<typeof DragDropProvider>;
type DragEvents = Pick<
  DragDropProviderProps,
  "onDragOver" | "onDragStart" | "onDragEnd"
>;

type DragOverCallback = DragEvents["onDragOver"];
type DragEndCallback = DragEvents["onDragEnd"];

// Convert Automerge structure to dnd-kit format
function docToState(doc: AutomergeDoc) {
  const sections: Sections = {};

  for (const sectionId of doc.sectionOrder) {
    const itemIds = doc.itemPositions[sectionId] || [];
    sections[sectionId] = itemIds.map((itemId) => doc.items[itemId]);
  }

  return {
    sections,
    order: doc.sectionOrder,
  };
}

// Calculate differences and apply fine-grained updates to arrays
function syncArrayChanges(
  target: ExtendedArray<string>,
  source: ExtendedArray<string>,
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

export default function useSortableList() {
  const docUrl = useDocumentUrl();
  const [doc, changeDoc] = useDocument<AutomergeDoc>(docUrl, {
    suspense: true,
  });

  // Convert Automerge doc to dnd-kit format for UI
  const [state, setState] = useState(() => docToState(doc));

  // Load from Automerge when doc changes
  useEffect(() => {
    setState(docToState(doc));
  }, [doc]);

  const onDragOver: DragOverCallback = (event) => {
    const { source } = event.operation;

    // Use dnd-kit's move function as-is on the UI state
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

  const onDragEnd: DragEndCallback = (event) => {
    const { canceled } = event.operation;

    if (canceled) return;

    // Apply fine-grained updates to Automerge (best practice from docs)
    changeDoc((doc) => {
      // Sync section order array
      syncArrayChanges(doc.sectionOrder, state.order);

      // Sync item positions for each section
      for (const [sectionId, items] of Object.entries(state.sections)) {
        const itemIds = items.map((item) => item.id) as ExtendedArray<string>;

        if (!doc.itemPositions[sectionId]) {
          doc.itemPositions[sectionId] = [] as unknown as ExtendedArray<string>;
        }

        syncArrayChanges(doc.itemPositions[sectionId], itemIds);
      }
    });
  };

  return {
    state,
    handlers: {
      onDragOver,
      onDragEnd,
    },
  };
}
