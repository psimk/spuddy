import { useCallback, useMemo, useRef, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";
import {
  animate,
  motion,
  MotionConfig,
  useMotionValue,
  type PanInfo,
} from "motion/react";

import useScrollDirection from "../hooks/useScrollDirection";
import {
  TRANSITION_CONFIG,
  FOOTER_VARIANTS,
  INPUT_WRAPPER_VARIANTS,
  INPUT_VARIANTS,
  NAV_VARIANTS,
} from "./NavigationFooter.motion";

export default function NavigationFooter() {
  const { scrollDirection, setScrollDirection, setScrollDirectionLock } =
    useScrollDirection();

  const handleFocus = useCallback(() => {
    setScrollDirection("up");
    setScrollDirectionLock(true);
  }, []);

  const handleBlur = useCallback(() => {
    setScrollDirectionLock(false);
  }, []);

  const x = useMotionValue(0);

  const [firstInputWrapperElement, setFirstInputWrapperElement] =
    useState<HTMLLIElement | null>(null);

  const firstInputWrapperWidth = useMemo(() => {
    if (!firstInputWrapperElement) return 0;

    return firstInputWrapperElement.getBoundingClientRect().width;
  }, [firstInputWrapperElement]);

  const currentIndex = useRef(0);

  const move = useCallback(
    (index: number, velocity: number) =>
      animate(x, -(index * (firstInputWrapperWidth + 16)), {
        ...TRANSITION_CONFIG,
        velocity,
      }),
    [x, firstInputWrapperWidth],
  );

  const handleDragEnd = useCallback(
    (_: unknown, { velocity, delta, offset }: PanInfo) => {
      console.log(offset);
      if (Math.abs(offset.x) < 50) return;
      if (Math.sign(offset.x) === 1) {
        currentIndex.current = Math.max(0, currentIndex.current - 1);
      } else {
        currentIndex.current = Math.min(4, currentIndex.current + 1);
      }
      move(currentIndex.current, velocity.x);
    },
    [x, firstInputWrapperWidth],
  );

  return (
    <MotionConfig transition={TRANSITION_CONFIG}>
      <motion.footer
        variants={FOOTER_VARIANTS}
        animate={scrollDirection}
        className="bg-base-200/5 sticky bottom-0 flex flex-col items-center justify-center overflow-hidden pt-24 backdrop-blur-2xl"
      >
        <div className="mx-auto w-full max-w-2xl">
          <motion.ul
            drag="x"
            style={{ x }}
            dragDirectionLock
            dragConstraints={{
              left: -(firstInputWrapperWidth * 4) - 48,
              right: 0,
            }}
            onDragEnd={handleDragEnd}
            className="absolute bottom-20 flex gap-4"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.li
                key={index}
                variants={INPUT_WRAPPER_VARIANTS}
                animate={scrollDirection}
                ref={setFirstInputWrapperElement}
                className={`grid place-items-center pt-4 pb-2 ${index === 0 ? "pl-13" : ""}`}
              >
                <motion.input
                  type="text"
                  placeholder="Type something"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  initial={false}
                  variants={INPUT_VARIANTS}
                  className="input bg-base-300/50 h-18 w-142 rounded-2xl text-center text-3xl shadow-xl"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.nav
          variants={NAV_VARIANTS}
          animate={scrollDirection}
          className="mx-auto w-full max-w-2xl"
        >
          <ul className="flex justify-between gap-4 p-4 px-8">
            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <ChevronLeft size={40} className="text-secondary/75" />
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn btn-ghost btn-circle h-full w-full"
              >
                <ChevronRight size={40} className="text-secondary/75" />
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
