import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

export default function useScrollDirection() {
  const { scrollY } = useScroll();

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollDirectionLock, setScrollDirectionLock] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (scrollDirectionLock) return;
    const previous = scrollY?.getPrevious() ?? 0;
    const diff = current - previous;

    const minDistance = 15;
    const minVelocity = 10;

    const velocity = Math.abs(diff);

    if (Math.abs(diff) > minDistance || velocity > minVelocity) {
      setScrollDirection(diff > 0 ? "down" : "up");
    }
  });

  return {
    scrollDirection,
    setScrollDirection,
    setScrollDirectionLock,
  };
}
