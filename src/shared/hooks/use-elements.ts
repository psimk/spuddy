import { useCallback, useState } from "react";

export default function useElements<T extends HTMLElement>() {
  const [elements, setElements] = useState<Array<Nullable<T>>>([]);

  const setElementFromRef = useCallback(
    (index: number) => (element: Nullable<T>) => {
      setElements((prev) => {
        if (element) {
          if (prev[index] === element) return prev;
          const clone = Array.from(prev);
          clone[index] = element;
          return clone;
        }

        if (prev[index] !== element) return prev;

        return prev.filter((_, i) => i !== index);
      });
    },
    [],
  );

  return { elements, setElementFromRef };
}
