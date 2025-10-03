import { useRef, useState } from "react";

import useScrollEvent from "@hooks/use-scroll-event";

export default function useScrollDirection(target: HTMLElement | null) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const scrollDirectionLockRef = useRef(false);

  let previousScrollTop = target?.scrollTop ?? 0;

  useScrollEvent(() => {
    if (scrollDirectionLockRef.current) return;
    if (!target) return;

    const scrollTop = target.scrollTop ?? 0;

    const diff = scrollTop - previousScrollTop;

    const direction = Math.sign(diff) > 0 ? "down" : "up";

    setScrollDirection(direction);

    previousScrollTop = scrollTop;
  }, target);

  return { scrollDirection, setScrollDirection, scrollDirectionLockRef };
}
