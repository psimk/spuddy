import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/react";

import useListData from "@hooks/useListData";
import usePositionsDocument from "@hooks/usePositionsDocument";

import type { Section } from "../types";

export default function useCreateSection() {
  const repo = useRepo();
  const { addSectionUrl } = useListData();
  const [, changePositions] = usePositionsDocument();

  const createSection = (name: string) => {
    // Create a new document for this section
    const sectionHandle = repo.create<Section>();
    const sectionUrl = sectionHandle.url;

    // Initialize the section document
    sectionHandle.change((doc) => {
      doc.id = sectionUrl;
      doc.name = name;
    });

    // Add the section URL to the data document
    addSectionUrl(sectionUrl);

    // Add the section URL to positions
    changePositions((doc) => {
      doc.sections.push(sectionUrl);
      doc.items[sectionUrl] = [] as unknown as ExtendedArray<AutomergeUrl>;
    });
  };

  return createSection;
}
