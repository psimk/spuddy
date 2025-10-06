import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { AnimatePresence } from "motion/react";
import { Grip } from "lucide-react";
import { useCallback } from "react";
import { move } from "@dnd-kit/helpers";

import dragDropManager from "@singletons/drag-drop-manager";
import db from "@services/instantdb/db";

import SortableListItem from "@components/SortableListItem";
import ListItem from "@components/ListItem";

type Props = {
  id: string;
};

export default function List({ id }: Props) {
  const { data, isLoading, error } = db.useQuery({
    items: {
      $: {
        where: {
          list: id,
          done: false,
        },
        order: {
          position: "asc",
        },
      },
    },
  });

  const items = data?.items ?? [];

  const onDragOver = (event: Parameters<typeof move>[1]) => {
    const newPositions = move(items, event);

    const updates = [];

    for (const [index, item] of newPositions.entries()) {
      if (index === item.position) continue;

      updates.push(
        db.tx.items[item.id].update({
          ...item,
          position: index,
          updatedAt: Date.now(),
        }),
      );
    }

    db.transact(updates);
  };

  const removeItem = useCallback((id: string) => {
    db.transact(db.tx.items[id].update({ done: true, updatedAt: new Date() }));
  }, []);

  return (
    <DragDropProvider manager={dragDropManager} onDragOver={onDragOver}>
      <ul className="flex flex-col gap-3">
        <AnimatePresence>
          {items.map((item, index) => (
            <SortableListItem
              key={item.id}
              id={item.id}
              index={index}
              defaultValue={item.text}
              onSwipeLeft={() => removeItem(item.id)}
              onSwipeRight={() => removeItem(item.id)}
            />
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        <DragOverlay>
          {(source) => {
            const { id, text } = items.find((p) => p.id === source.id)!;

            return (
              <ListItem
                id={id + 3}
                defaultValue={text}
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
