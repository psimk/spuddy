import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useEffect } from "react";

import useListsDocument from "@hooks/useListsDocument";

export default function useSharedListHandler() {
  const [listsDoc, changeListsDoc] = useListsDocument();

  useEffect(() => {
    // Check if we're on the share path
    if (!window.location.pathname.startsWith("/share")) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const listUrl = params.get("list") as AutomergeUrl | null;

    if (!listUrl) {
      // Invalid share URL, redirect to home
      window.history.replaceState({}, "", "/");
      return;
    }

    // Check if this list is already added
    const listAlreadyExists = listsDoc.listUrls.includes(listUrl);

    if (listAlreadyExists) {
      // List already exists, just select it and redirect
      changeListsDoc((doc) => {
        doc.selectedListUrl = listUrl;
      });
      window.history.replaceState({}, "", "/");
      return;
    }

    // Add the shared list
    changeListsDoc((doc) => {
      doc.listUrls.push(listUrl);
      doc.selectedListUrl = listUrl;
    });

    // Redirect to home
    window.history.replaceState({}, "", "/");
  }, [listsDoc, changeListsDoc]);
}
