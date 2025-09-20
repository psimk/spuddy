import SortableListItem from "./SortableListItem";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { AnimatePresence } from "motion/react";
import DragOverlayListItem from "./DragOverlayListItem";
import useLocalStorageDragItems from "../hooks/use-local-storage-drag-items";

type Product = {
  id: string;
  emoji: string;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Props = { className?: string; products: Array<Product> };

export default function List({ products }: Props) {
  const { items, listeners } = useLocalStorageDragItems(
    "product-order",
    products,
  );

  return (
    <DragDropProvider {...listeners}>
      <ul className="flex flex-col gap-3">
        {items.map((product, index) => (
          <SortableListItem
            key={product.id}
            id={product.id}
            index={index}
            prefix={product.emoji}
            defaultValue={product.variants.en[0]}
          />
        ))}
      </ul>

      <AnimatePresence>
        <DragOverlay>
          {(source) => (
            <DragOverlayListItem
              {...products.find((p) => p.id === source.id)!}
            />
          )}
        </DragOverlay>
      </AnimatePresence>
    </DragDropProvider>
  );
}
