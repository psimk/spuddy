import { useDocument } from "@automerge/react";
import { useContext } from "react";

import ListsDocumentContext from "@contexts/ListsDocumentContext";

import { invariant } from "@utils/invariant";

import type { ListsDocument } from "../types";

export default function useListsDocument() {
  const url = useContext(ListsDocumentContext);

  invariant(
    url,
    "useListsDocument must be used within a ListsDocumentProvider",
  );

  return useDocument<ListsDocument>(url, { suspense: true });
}
