import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { AnimatePresence } from "motion/react";

import useLocalStorageDragItems from "../hooks/use-local-storage-drag-items";
import dragDropManager from "../singletons/drag-drop-manager";

import SortableListItem from "./SortableListItem";
import DragOverlayListItem from "./DragOverlayListItem";

type Product = {
  id: string;
  emoji: string;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Props = { className?: string; products: Array<Product> };

export default function List({ products }: Props) {
  const { items, removeItem, listeners } = useLocalStorageDragItems(
    "product-order",
    products,
  );

  return (
    <DragDropProvider manager={dragDropManager} {...listeners}>
      <ul className="flex flex-col gap-3">
        <AnimatePresence>
          {items.map((product, index) => (
            <SortableListItem
              key={product.id}
              id={product.id}
              index={index}
              prefix={product.emoji}
              defaultValue={product.variants.en[0]}
              onSwipeLeft={() => removeItem(product.id)}
              onSwipeRight={() => removeItem(product.id)}
            />
          ))}
        </AnimatePresence>
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
