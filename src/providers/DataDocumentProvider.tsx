import { useRepo } from "@automerge/react";
import { type PropsWithChildren } from "react";

import getLocalAutomergeUrl from "@utils/get-local-automerge-url";
import DataDocumentContext from "@contexts/DataDocumentContext";

export default function DataDocumentProvider(props: PropsWithChildren) {
  const repo = useRepo();

  return (
    <DataDocumentContext.Provider
      {...props}
      value={getLocalAutomergeUrl(repo, "spuddy-data-doc-url", {
        items: {
          "item-1": { id: "item-1", text: "Milk" },
          "item-2": { id: "item-2", text: "Cheese" },
          "item-3": { id: "item-3", text: "Butter" },
          "item-4": { id: "item-4", text: "Yogurt" },
          "item-5": { id: "item-5", text: "Cream" },
          "item-6": { id: "item-6", text: "Carrots" },
          "item-7": { id: "item-7", text: "Broccoli" },
          "item-8": { id: "item-8", text: "Spinach" },
          "item-9": { id: "item-9", text: "Tomatoes" },
          "item-10": { id: "item-10", text: "Lettuce" },
        },
        sections: {
          Dairy: { id: "Dairy", name: "Dairy" },
          Vegetables: { id: "Vegetables", name: "Vegetables" },
        },
      })}
    />
  );
}
