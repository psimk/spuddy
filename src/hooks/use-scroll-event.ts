import { createRef, useMemo, type RefObject } from "react";
import useEventListener from "./use-event-listener";

export default function useScrollEvent<T extends HTMLElement>(
  handler: (event: Event) => void,
  element: T | null,
) {
  useEventListener(
    "scroll",
    handler,
    useMemo(() => {
      const ref = createRef<T>();
      ref.current = element;
      return ref;
    }, [element]) as unknown as RefObject<Document>,
  );
}
