import type { Doc } from "@automerge/automerge";

export type Item = {
  id: string;
};

export type Section = {
  id: string;
};

// Maps for entity storage
export type ItemsMap = Record<string, Item>;
export type SectionsMap = Record<string, Section>;

export type ExtendedArray<T> = Array<T> & {
  insertAt(index: number, ...args: Array<T>): ExtendedArray<T>;
  deleteAt(index: number, numDelete?: number): ExtendedArray<T>;
};

// Position arrays (only IDs)
export type SectionOrder = ExtendedArray<string>;
export type ItemPositions = Record<string, ExtendedArray<string>>;

// Automerge document structure
export type AutomergeSortableState = {
  items: ItemsMap;
  sections: SectionsMap;
  sectionOrder: SectionOrder;
  itemPositions: ItemPositions;
};

export type AutomergeDoc = Doc<AutomergeSortableState>;

// Legacy types for backward compatibility
export type Sections = Record<string, Array<Item>>;
