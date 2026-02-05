import { useRepo } from "@automerge/react";

import type { Data, Positions } from "../types";
import useListsDocument from "./useListsDocument";

export default function useCreateList() {
  const repo = useRepo();
  const [listsDoc, changeListsDoc] = useListsDocument();

  const createList = () => {
    if (!listsDoc) return;

    const listId = `list-${Date.now()}`;
    const listName = `List ${listsDoc.lists.length + 1}`;

    const sectionId = `section-${Date.now()}`;

    // Create new data document
    const dataHandle = repo.create<Data>({
      items: {},
      sections: {
        [sectionId]: { id: "section-1", name: "Section 1" },
      },
    });

    // Create new positions document
    const positionsHandle = repo.create<Positions>({
      sections: [sectionId] as ExtendedArray<string>,
      items: { [sectionId]: [] as unknown as ExtendedArray<string> },
    });

    // Add new list to lists document
    changeListsDoc((doc) => {
      doc.lists.push({
        id: listId,
        name: listName,
        dataDocUrl: dataHandle.url,
        positionsDocUrl: positionsHandle.url,
      });
      doc.selectedListId = listId;
    });
  };

  return createList;
}
