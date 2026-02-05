import type { Doc } from "@automerge/automerge";

export type Item = {
  id: string;
  text?: string; // Metadata that changes frequently
};

export type Section = {
  id: string;
  name?: string;
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

// DOCUMENT 1: Data (items & sections with metadata)
export type DataDocumentState = {
  items: ItemsMap;
  sections: SectionsMap;
};

export type DataDocument = Doc<DataDocumentState>;

// DOCUMENT 2: Positions (ordering only)
export type PositionsDocumentState = {
  sectionOrder: SectionOrder;
  itemPositions: ItemPositions;
};

export type PositionsDocument = Doc<PositionsDocumentState>;

// Legacy types for backward compatibility
export type Sections = Record<string, Array<Item>>;
