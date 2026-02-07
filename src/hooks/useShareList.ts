import { useContext } from "react";

import DataDocumentContext from "@contexts/DataDocumentContext";

import { invariant } from "@utils/invariant";

export default function useShareList() {
  const dataDocUrl = useContext(DataDocumentContext);

  invariant(
    dataDocUrl,
    "useShareList must be used within DataDocumentProvider",
  );

  const shareList = async () => {
    const url = new URL(
      `${encodeURIComponent(dataDocUrl)}`,
      new URL("share/", window.location.origin),
    );

    await navigator.share({
      title: "Share List",
      text: "Check out this list!",
      url: url.toString(),
    });
  };

  return shareList;
}
