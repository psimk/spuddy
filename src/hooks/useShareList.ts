import { useContext } from "react";

import CurrentListContext from "@contexts/CurrentListContext";

import { invariant } from "@utils/invariant";

export default function useShareList() {
  const listUrl = useContext(CurrentListContext);

  invariant(listUrl, "useShareList must be used within CurrentListProvider");

  const shareList = async () => {
    const url = new URL("/share", window.location.origin);
    url.searchParams.set("list", listUrl);

    await navigator.share({
      title: "Share List",
      text: "Check out this list!",
      url: url.toString(),
    });
  };

  return shareList;
}
