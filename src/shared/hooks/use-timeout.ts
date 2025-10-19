import { useEffect } from "react";

export default function useTimeout(callback: () => void, delay: number) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);
  }, [callback, delay]);
}
