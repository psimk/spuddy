import { useCallback, useRef } from "react";

import { move } from "@dnd-kit/helpers";
import useLocalStorage from "@hooks/use-local-storage";

export default function useLocalStorageDragItems<T extends { id: string }>(
  key: string,
  initialItems: Array<T>,
) {
  const [items, setItems] = useLocalStorage<Array<T>>(key, initialItems);
  const snapshot = useRef(structuredClone(items));

  const onDragStart = useCallback(() => {
    snapshot.current = structuredClone(items);
  }, [items]);

  const onDragOver = useCallback((event: Parameters<typeof move>[1]) => {
    setItems((items) => move(items, event));
  }, []);

  const onDragEnd = useCallback((event: { canceled: boolean }) => {
    if (!event.canceled) return;

    setItems(snapshot.current);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    removeItem,
    listeners: { onDragStart, onDragOver, onDragEnd },
  };
}
