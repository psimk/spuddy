import { DragDropProvider, type DragDropEventHandlers } from "@dnd-kit/react";
import { useCallback, useRef } from "react";
import { move } from "@dnd-kit/helpers";

import dragDropManager from "../../singletons/drag-drop-manager";
import useLocalStorage from "../../hooks/use-local-storage";

import SortableListItem from "../SortableListItem";
import SortableSection from "../SortableSection";

type Product = {
  id: string;
  emoji: string;
  categoryId: string;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Category = {
  id: string;
  emoji: string;
  title: { en: string; lt: string };
};

type Props = { categories: Array<Category>; products: Array<Product> };

export default function SectionedList({ categories, products }: Props) {
  const [data, setData] = useLocalStorage("sectioned-list-data", () =>
    Object.fromEntries(
      categories
        .sort()
        .map(
          (category) =>
            [
              category.id,
              products.filter(
                (product) => String(product.categoryId) === category.id,
              ),
            ] as const,
        ),
    ),
  );
  const [categoryPositions, setCategoryPositions] = useLocalStorage(
    "sectioned-list-category-positions",
    () => categories.filter(({ id }) => id in data),
  );

  const snapshot = useRef(structuredClone(data));
  const categoriesPositionsSnapshot = useRef(
    structuredClone(categoryPositions),
  );

  const handleDragStart = useCallback<
    DragDropEventHandlers["onDragStart"]
  >(() => {
    snapshot.current = structuredClone(data);
    categoriesPositionsSnapshot.current = structuredClone(categoryPositions);
  }, []);

  const handleDragOver = useCallback<DragDropEventHandlers["onDragOver"]>(
    (event) => {
      const {
        operation: { source },
      } = event;

      if (source?.type === "category") {
        setCategoryPositions((oldPositions) => move(oldPositions, event));
        return;
      }

      setData((oldData) => move(oldData, event));
    },
    [],
  );

  const handleDragEnd = useCallback<DragDropEventHandlers["onDragEnd"]>(
    ({ canceled }) => {
      if (!canceled) return;

      setData(snapshot.current);
      setCategoryPositions(categoriesPositionsSnapshot.current);
    },
    [],
  );

  return (
    <DragDropProvider
      manager={dragDropManager}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ul className="flex flex-col gap-3">
        {categoryPositions.map((category, categoryIndex) => (
          <SortableSection
            key={category.id}
            title={category.title.en}
            id={category.id}
            index={categoryIndex}
            accept={["category", "item"]}
            type="category"
          >
            <ul className="flex flex-col gap-3 px-1">
              {data[category.id].map((product, productIndex) => (
                <SortableListItem
                  key={product.id}
                  defaultValue={product.variants.en[0]}
                  id={product.id}
                  index={productIndex}
                  accept="item"
                  type="item"
                  group={category.id}
                />
              ))}
            </ul>
          </SortableSection>
        ))}
      </ul>
    </DragDropProvider>
  );
}
