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
        lists: [
          {
            id: "shopping",
            name: "Shopping List",
            dataDocUrl: getLocalAutomergeUrl(repo, "spuddy-data-doc-url", {
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
            }),
            positionsDocUrl: getLocalAutomergeUrl(
              repo,
              "spuddy-positions-doc-url",
              {
                sections: ["Dairy", "Vegetables"],
                items: {
                  Dairy: ["item-1", "item-2", "item-3", "item-4", "item-5"],
                  Vegetables: [
                    "item-6",
                    "item-7",
                    "item-8",
                    "item-9",
                    "item-10",
                  ],
                },
              },
            ),
          },
        ],
        selectedListId: "shopping",
      })}
    />
  );
}
