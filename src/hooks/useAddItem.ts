import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/react";

import useListData from "@hooks/useListData";
import usePositionsDocument from "@hooks/usePositionsDocument";

import type { Item } from "../types";

export default function useAddItem() {
  const repo = useRepo();
  const { addItemUrl } = useListData();
  const [positionsDoc, changePositions] = usePositionsDocument();

  const addItem = (text: string, sectionId?: AutomergeUrl) => {
    // Create a new document for this item
    const itemHandle = repo.create<Item>();
    const itemUrl = itemHandle.url;

    // Initialize the item document
    itemHandle.change((doc) => {
      doc.id = itemUrl;
      doc.text = text;
    });

    const targetSection =
      sectionId ?? positionsDoc.sections[positionsDoc.sections.length - 1];

    // Add the item URL to the data document
    addItemUrl(itemUrl);

    // Add the item URL to positions
    changePositions((doc) => {
      doc.items[targetSection] ??= [] as unknown as ExtendedArray<AutomergeUrl>;
      doc.items[targetSection].push(itemUrl);
    });
  };

  return addItem;
}
