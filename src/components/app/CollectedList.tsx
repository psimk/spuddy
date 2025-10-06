import { AnimatePresence } from "motion/react";

import type { Item } from "@services/instantdb/types";
import SwipeListItem from "@components/SwipeListItem";

type Props = {
  items: ReadonlyArray<Item>;
  onRemove: (id: string) => void;
  onUnCollect: (id: string) => void;
};

export default function CollectedList({ items, onRemove, onUnCollect }: Props) {
  return (
    <ul className="list">
      <AnimatePresence>
        {items.map((item) => (
          <SwipeListItem
            key={item.id}
            disabled
            id={item.id}
            defaultValue={item.text}
            onSwipeLeft={() => onRemove(item.id)}
            onSwipeRight={() => onUnCollect(item.id)}
          >
            <li className="bg-error text-error-content rounded-l-sm">remove</li>
            <li className="bg-warning text-warning-content rounded-r-sm">
              return
            </li>
          </SwipeListItem>
        ))}
      </AnimatePresence>
    </ul>
  );
}
