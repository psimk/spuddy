import type { AutomergeUrl } from "@automerge/automerge-repo";

import useListData from "@hooks/useListData";
import usePositionsDocument from "@hooks/usePositionsDocument";

export default function useRemoveItem() {
  const { removeItemUrl } = useListData();
  const [positionsDoc, changePositions] = usePositionsDocument();

  const removeItem = (itemUrl: AutomergeUrl) => {
    // Remove the item URL from the data document
    removeItemUrl(itemUrl);

    // Remove the item URL from positions
    changePositions((doc) => {
      // Find which section contains this item
      for (const sectionUrl of doc.sections) {
        const items = doc.items[sectionUrl];
        if (items) {
          const index = items.indexOf(itemUrl);
          if (index !== -1) {
            items.splice(index, 1);
            break;
          }
        }
      }
    });
  };

  return removeItem;
}
