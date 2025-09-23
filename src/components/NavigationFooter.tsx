import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";
import {
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
  type Transition,
} from "motion/react";
import { useCallback, useState } from "react";

const TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
} satisfies Transition;

const FOOTER_VARIANTS = {
  up: { y: 0 },
  down: { y: 90, backgroundColor: "#f8f8f8" },
};

const INPUT_WRAPPER_VARIANTS = {
  up: {},
  down: { paddingTop: 0 },
};

const INPUT_VARIANTS = {
  up: { fontSize: "1.875rem" },
  down: {
    height: "4rem",
    fontSize: "1.25rem",
    border: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
};

const NAV_VARIANTS = {
  up: { y: 0 },
  down: { y: 100 },
};

export default function NavigationFooter() {
  const { scrollY } = useScroll();

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollDirectionLock, setScrollDirectionLock] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (scrollDirectionLock) return;
    const previous = scrollY?.getPrevious() ?? 0;
    const diff = current - previous;

    // Configuration
    const minDistance = 15; // Minimum pixels to scroll before changing direction
    const minVelocity = 10; // Minimum velocity threshold

    // Calculate velocity (you might want to smooth this over multiple frames)
    const velocity = Math.abs(diff);

    // Only update direction if we meet the thresholds
    if (Math.abs(diff) > minDistance || velocity > minVelocity) {
      setScrollDirection(diff > 0 ? "down" : "up");
    }
  });

  const handleFocus = useCallback(() => {
    setScrollDirection("up");
    setScrollDirectionLock(true);
  }, []);

  const handleBlur = useCallback(() => {
    setScrollDirectionLock(false);
  }, []);

  return (
    <MotionConfig transition={TRANSITION_CONFIG}>
      <motion.footer
        variants={FOOTER_VARIANTS}
        animate={scrollDirection}
        className="bg-base-200/5 sticky bottom-0 backdrop-blur-2xl"
      >
        <motion.div
          variants={INPUT_WRAPPER_VARIANTS}
          animate={scrollDirection}
          className="px-12 pt-4 pb-2"
        >
          <motion.input
            type="text"
            placeholder="Type something"
            onFocus={handleFocus}
            onBlur={handleBlur}
            variants={INPUT_VARIANTS}
            className="input bg-base-300/50 h-18 w-full max-w-2xl rounded-2xl text-center text-3xl shadow-xl"
          />
        </motion.div>
        <motion.nav variants={NAV_VARIANTS} animate={scrollDirection}>
          <ul className="flex justify-between gap-4 p-4 px-8">
            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <ChevronLeft size={48} className="text-secondary/75" />
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <ChevronRight size={48} className="text-secondary/75" />
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <Share size={40} className="text-secondary/75" />
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <BookOpen size={40} className="text-secondary/75" />
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <Copy size={40} className="text-secondary/75" />
              </button>
            </li>
          </ul>
        </motion.nav>
      </motion.footer>
    </MotionConfig>
  );
}
