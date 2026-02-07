import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/react";
import { useContext } from "react";

import ListsDocumentContext from "@contexts/ListsDocumentContext";

import { invariant } from "@utils/invariant";

export type List = {
  id: string;
  name: string;
  dataDocUrl: AutomergeUrl;
  positionsDocUrl: AutomergeUrl;
};

export type ListsDocument = {
  lists: Array<List>;
  selectedListId: string;
};

export default function useListsDocument() {
  const url = useContext(ListsDocumentContext);

  invariant(
    url,
    "useListsDocument must be used within a ListsDocumentProvider",
  );

  return useDocument<ListsDocument>(url, { suspense: true });
}
