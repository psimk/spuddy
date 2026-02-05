import useDataDocument from "@hooks/useDataDocument";
import usePositionsDocument from "@hooks/usePositionsDocument";

export default function useAddItem() {
  const [, changeData] = useDataDocument();
  const [positionsDoc, changePositions] = usePositionsDocument();

  const addItem = (text: string, sectionId?: string) => {
    const itemId = crypto.randomUUID();

    const targetSection =
      sectionId ?? positionsDoc.sections[positionsDoc.sections.length - 1];

    changeData((doc) => {
      doc.items[itemId] = { id: itemId, text };
    });

    changePositions((doc) => {
      doc.items[targetSection] ??= [] as unknown as ExtendedArray<string>;
      doc.items[targetSection].push(itemId);
    });
  };

  return addItem;
}
