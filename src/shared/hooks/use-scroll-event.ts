import { createRef, useMemo, type RefObject } from "react";

import useEventListener from "@shared/hooks/use-event-listener";

export default function useScrollEvent<T extends HTMLElement>(
  handler: (event: Event) => void,
  element: Nullable<T>,
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
