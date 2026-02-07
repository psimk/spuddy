import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/react";

import type { Data, ListDocument, Positions, Section } from "../types";
import useListsDocument from "./useListsDocument";

export default function useCreateList() {
  const repo = useRepo();
  const [listsDoc, changeListsDoc] = useListsDocument();

  const createList = (name: string) => {
    if (!listsDoc) return;

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

    // Create new list document
    const listHandle = repo.create<ListDocument>();
    const listUrl = listHandle.url;

    listHandle.change((doc) => {
      doc.id = listUrl;
      doc.name = name;
      doc.dataDocUrl = dataHandle.url;
      doc.positionsDocUrl = positionsHandle.url;
    });

    // Add new list URL to lists document
    changeListsDoc((doc) => {
      doc.listUrls.push(listUrl);
      doc.selectedListUrl = listUrl;
    });
  };

  return createList;
}
