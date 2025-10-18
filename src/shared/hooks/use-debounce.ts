import { useCallback, useRef } from "react";

export default function useDebounce(fn: () => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(fn, delay);
  }, [fn, delay]);
}
