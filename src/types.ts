import type { AutomergeUrl } from "@automerge/automerge-repo";

export type Item = {
  id: AutomergeUrl; // The document URL is the ID
  text: string;
};

export type Section = {
  id: AutomergeUrl; // The document URL is the ID
  name: string;
};

export type Data = {
  itemUrls: Array<AutomergeUrl>; // Array of item document URLs
  sectionUrls: Array<AutomergeUrl>; // Array of section document URLs
};

export type Positions = {
  sections: ExtendedArray<AutomergeUrl>;
  items: Record<AutomergeUrl, ExtendedArray<AutomergeUrl>>;
};
