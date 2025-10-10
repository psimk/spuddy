import { useCallback, useState } from "react";

export default function useElements<T extends HTMLElement>() {
  const [elements, setElements] = useState<Array<T | null>>([]);

  const setElementFromRef = useCallback(
    (index: number) => (element: T | null) => {
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
