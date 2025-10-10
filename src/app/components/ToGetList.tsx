import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { AnimatePresence } from "motion/react";
import { Grip } from "lucide-react";
import { move } from "@dnd-kit/helpers";

import dragDropManager from "@shared/singletons/drag-drop-manager";
import SortableListItem from "@shared/components/SortableListItem";
import ListItem from "@shared/components/ListItem";

import type { Item } from "@app/services/instantdb/types";

type Props = {
  items: ReadonlyArray<Item>;
  onReorder: (
    items: ReadonlyArray<Item>,
    event: Parameters<typeof move>[1],
  ) => void;
  onRemove: (id: string) => void;
  onCollect: (id: string) => void;
};

export default function List({ items, onReorder, onCollect, onRemove }: Props) {
  return (
    <DragDropProvider
      manager={dragDropManager}
      onDragOver={(event) => {
        event.preventDefault();
        // event.operation.target?.accept
        onReorder(
          items,
          event,
          // move(items, event),
        );
      }}
    >
      <ul className="list h-auto min-h-full">
        <li className="rounded-t-box bg-base-200 mt-auto grid w-full place-items-center shadow-md">
          <div className="divider my-2 w-1/2" />
        </li>
        <AnimatePresence>
          {items.map((item, index) => (
            <SortableListItem
              wrapperClassName={`scroll-mb-30`}
              className={`${items.length - 1 === index ? "rounded-b-box" : ""}`}
              key={item.id}
              id={item.id}
              index={index}
              defaultValue={item.text}
              onSwipeLeft={() => onRemove(item.id)}
              onSwipeRight={() => onCollect(item.id)}
            >
              <li className="bg-error text-error-content rounded-l-sm">
                remove
              </li>
              <li className="bg-success text-success-content rounded-r-sm">
                collect
              </li>
            </SortableListItem>
          ))}

          <DragOverlay>
            {(source) => {
              const { id, text } = items.find((p) => p.id === source.id)!;

              return (
                <ListItem
                  id={id}
                  defaultValue={text}
                  initial={{ scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
                  animate={{
                    scale: 1.05,
                    boxShadow: "0 10px 10px #00000040",
                  }}
                  suffix={
                    <div className="flex h-auto cursor-grab items-center justify-center pr-3">
                      <Grip />
                    </div>
                  }
                />
              );
            }}
          </DragOverlay>
        </AnimatePresence>
      </ul>
    </DragDropProvider>
  );
}
