import type { AutomergeSortableState } from "./types";

export const INITIAL_STATE: AutomergeSortableState = {
  // Items as a map
  items: {
    "item-1": { id: "item-1" },
    "item-2": { id: "item-2" },
    "item-3": { id: "item-3" },
    "item-4": { id: "item-4" },
    "item-5": { id: "item-5" },
    "item-6": { id: "item-6" },
    "item-7": { id: "item-7" },
    "item-8": { id: "item-8" },
    "item-9": { id: "item-9" },
    "item-10": { id: "item-10" },
  },
  // Sections as a map
  sections: {
    Dairy: { id: "Dairy" },
    Vegetables: { id: "Vegetables" },
  },
  // Order of sections
  sectionOrder: ["Dairy", "Vegetables"],
  // Position of items within each section
  itemPositions: {
    Dairy: ["item-1", "item-2", "item-3", "item-4", "item-5"],
    Vegetables: ["item-6", "item-7", "item-8", "item-9", "item-10"],
  },
};
