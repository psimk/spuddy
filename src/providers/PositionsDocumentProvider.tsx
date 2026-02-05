import { useRepo } from "@automerge/react";
import { type PropsWithChildren } from "react";

import getLocalAutomergeUrl from "@utils/get-local-automerge-url";

import PositionsDocumentContext from "@contexts/PositionsDocumentContext";

export default function PositionsDocumentProvider(props: PropsWithChildren) {
  const repo = useRepo();

  return (
    <PositionsDocumentContext.Provider
      {...props}
      value={getLocalAutomergeUrl(repo, "spuddy-positions-doc-url", {
        sectionOrder: ["Dairy", "Vegetables"],
        itemPositions: {
          Dairy: ["item-1", "item-2", "item-3", "item-4", "item-5"],
          Vegetables: ["item-6", "item-7", "item-8", "item-9", "item-10"],
        },
      })}
    />
  );
}
