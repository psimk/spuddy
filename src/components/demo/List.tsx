import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { AnimatePresence } from "motion/react";
import { Grip } from "lucide-react";

import useLocalStorageDragItems from "@hooks/use-local-storage-drag-items";
import dragDropManager from "@singletons/drag-drop-manager";

import SortableListItem from "@components/SortableListItem";
import ListItem from "@components/ListItem";

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
          {(source) => {
            const { id, emoji, variants } = products.find(
              (p) => p.id === source.id,
            )!;

            return (
              <ListItem
                id={id}
                prefix={emoji}
                defaultValue={variants.en[0] || ""}
                initial={{ scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
                animate={{
                  scale: 1.05,
                  boxShadow: "0 10px 10px #00000040",
                }}
                suffix={
                  <div className="flex h-auto cursor-grab items-center justify-center">
                    <Grip />
                  </div>
                }
              />
            );
          }}
        </DragOverlay>
      </AnimatePresence>
    </DragDropProvider>
  );
}
