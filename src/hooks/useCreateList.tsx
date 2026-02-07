import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/react";

import type { Data, Positions, Section } from "../types";
import useListsDocument from "./useListsDocument";

export default function useCreateList() {
  const repo = useRepo();
  const [listsDoc, changeListsDoc] = useListsDocument();

  const createList = (name: string) => {
    if (!listsDoc) return;

    const listId = `list-${Date.now()}`;

    // Create a new section document
    const sectionHandle = repo.create<Section>();
    const sectionUrl = sectionHandle.url;

    sectionHandle.change((doc) => {
      doc.id = sectionUrl;
      doc.name = "Section 1";
    });

    // Create new data document
    const dataHandle = repo.create<Data>({
      itemUrls: [],
      sectionUrls: [sectionUrl],
    });

    // Create new positions document
    const positionsHandle = repo.create<Positions>({
      sections: [sectionUrl] as ExtendedArray<AutomergeUrl>,
      items: { [sectionUrl]: [] as unknown as ExtendedArray<AutomergeUrl> },
    });

    // Add new list to lists document
    changeListsDoc((doc) => {
      doc.lists.push({
        id: listId,
        name,
        dataDocUrl: dataHandle.url,
        positionsDocUrl: positionsHandle.url,
      });
      doc.selectedListId = listId;
    });
  };

  return createList;
}
