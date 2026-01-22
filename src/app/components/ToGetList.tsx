import { AutoScroller, defaultPreset } from "@dnd-kit/dom";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { Grip } from "lucide-react";
import { AnimatePresence } from "motion/react";
import type { PropsWithChildren } from "react";

import ListItem from "@shared/components/ListItem";
import SortableListItem from "@shared/components/SortableListItem";

import type { Item } from "@app/services/instantdb/types";

type Props = {
  items: ReadonlyArray<Item>;
  onReorder: (
    items: ReadonlyArray<Item>,
    event: Parameters<typeof move>[1],
  ) => void;
  onRemove: (id: string) => void;
  disableAutoScroll?: boolean;
};

export default function List({
  items,
  onReorder,
  onRemove,
  disableAutoScroll,
  children,
}: PropsWithChildren<Props>) {
  return (
    <DragDropProvider
      plugins={
        // TODO: investigate how to disable horizontal auto-scroll AutoScroller
        disableAutoScroll
          ? defaultPreset.plugins.filter((plugin) => plugin !== AutoScroller)
          : defaultPreset.plugins
      }
      onDragOver={(event) => {
        event.preventDefault();
        onReorder(items, event);
      }}
    >
      <ul className="list min-h-full">
        {children}
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
              onSwipeRight={() => onRemove(item.id)}
            >
              <li className="bg-success text-success-content rounded-l-sm">
                collect
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
                  id={id + "drag-overlay"}
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
