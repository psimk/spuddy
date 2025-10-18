import { useRef, useState } from "react";

import useDebounce from "@shared/hooks/use-debounce";
import useScrollEvent from "@shared/hooks/use-scroll-event";

export default function useScrollDirection(target: Nullable<HTMLElement>) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const scrollDirectionLockRef = useRef(false);

  let previousScrollTop = target?.scrollTop ?? 0;

  useScrollEvent(
    useDebounce(() => {
      if (scrollDirectionLockRef.current) return;
      if (!target) return;

      const scrollTop = target.scrollTop ?? 0;

      const diff = scrollTop - previousScrollTop;

      const direction = Math.sign(diff) > 0 ? "down" : "up";
      const progress = target.scrollHeight - target.clientHeight - scrollTop;

      // TODO: how to configure this threshold?
      if (progress <= 20) {
        setScrollDirection("up");
        previousScrollTop = scrollTop;
        return;
      }

      setScrollDirection(direction);

      previousScrollTop = scrollTop;
    }, 10),
    target,
  );

  return { scrollDirection, setScrollDirection, scrollDirectionLockRef };
}
