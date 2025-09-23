import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { AnimatePresence } from "motion/react";

import dragDropManager from "../singletons/drag-drop-manager";

import SortableListItem from "./SortableListItem";
import DragOverlayListItem from "./DragOverlayListItem";

type Product = {
  id: string;
  emoji: string;
  categoryId: number;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Category = {
  id: string;
  emoji: string;
  title: { en: string; lt: string };
};

type Props = { categories: Array<Category>; products: Array<Product> };

export default function SectionedList({ categories, products }: Props) {
  return (
    <DragDropProvider manager={dragDropManager}>
      <ul className="flex flex-col gap-6">
        {categories
          .filter(
            (category) =>
              products.filter(
                (product) => String(product.categoryId) === category.id,
              ).length > 0,
          )
          .map((category) => {
            const categoryProducts = products.filter(
              (product) => String(product.categoryId) === category.id,
            );
            return (
              <section key={category.id}>
                <h2 className="text-md mb-3 text-center">
                  ------ {category.title.en} ------
                </h2>
                <ul className="flex flex-col gap-3">
                  {categoryProducts.map((product, index) => (
                    <SortableListItem
                      key={product.id}
                      defaultValue={product.variants.en[0]}
                      id={product.id}
                      index={index}
                      accept="item"
                      type="item"
                      feedback="clone"
                      group={category.id}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
      </ul>

      <AnimatePresence>
        <DragOverlay>
          {(source) => (
            <DragOverlayListItem
              {...products.find((p) => p.id === source.id)!}
              emoji=""
            />
          )}
        </DragOverlay>
      </AnimatePresence>
    </DragDropProvider>
  );
}
