import type { Item, Section } from "../types";
import useDataDocument from "./useDataDocument";

export default function useListData() {
  const [dataDoc, changeData] = useDataDocument();

  const updateItem = (itemId: string, updates: Partial<Item>) => {
    changeData((doc) => {
      if (doc.items[itemId]) {
        Object.assign(doc.items[itemId], updates);
      }
    });
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    changeData((doc) => {
      if (doc.sections[sectionId]) {
        Object.assign(doc.sections[sectionId], updates);
      }
    });
  };

  const addItem = (item: Item) => {
    changeData((doc) => {
      doc.items[item.id] = item;
    });
  };

  const removeItem = (itemId: string) => {
    changeData((doc) => {
      delete doc.items[itemId];
    });
  };

  return {
    ...dataDoc,
    updateItem,
    updateSection,
    addItem,
    removeItem,
    changeData,
  };
}
