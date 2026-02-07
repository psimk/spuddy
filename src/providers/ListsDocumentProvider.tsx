import { useRepo } from "@automerge/react";
import { type PropsWithChildren } from "react";

import ListsDocumentContext from "@contexts/ListsDocumentContext";

import getLocalAutomergeUrl from "@utils/get-local-automerge-url";

export default function ListsDocumentProvider(props: PropsWithChildren) {
  const repo = useRepo();

  return (
    <ListsDocumentContext.Provider
      {...props}
      value={getLocalAutomergeUrl(repo, "spuddy-lists-doc-url", {
        listUrls: [],
        selectedListUrl: null,
      })}
    />
  );
}
