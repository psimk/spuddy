import {
  forwardRef,
  memo,
  useCallback,
  type ComponentProps,
  type PropsWithChildren,
  type Ref,
} from "react";
import { animate, motion, useMotionValue, type PanInfo } from "motion/react";

import ListItem from "@shared/components/ListItem";

type Props = Omit<
  ComponentProps<typeof ListItem>,
  | "drag"
  | "dragConstraints"
  | "dragElastic"
  | "dragDirectionLock"
  | "children"
  | "onDragEnd"
> & {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

const ACTION_WIDTH = 100;
const ANIMATION_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export default memo(
  forwardRef(function SwipeListItem(
    { onSwipeLeft, onSwipeRight, children, ...props }: PropsWithChildren<Props>,
    ref: Ref<HTMLLIElement>,
  ) {
    const x = useMotionValue(0);

    const handleDragEnd = useCallback(
      (_: unknown, { velocity }: PanInfo) => {
        if (x.get() > ACTION_WIDTH || velocity.x > 800) onSwipeLeft?.();
        else if (x.get() < -ACTION_WIDTH || velocity.x < -800) onSwipeRight?.();
        else animate(x, 0, ANIMATION_CONFIG);
      },
      [x, onSwipeLeft, onSwipeRight, close],
    );

    return (
      <ListItem
        {...props}
        onDragEnd={handleDragEnd}
        ref={ref}
        drag="x"
        motionStyle={{ x }}
        exit={{ opacity: 0 }}
        dragDirectionLock
        dragConstraints={{ left: -ACTION_WIDTH, right: ACTION_WIDTH }}
        dragElastic={0.5}
      >
        <motion.ul className="absolute top-0 left-0 -z-1 m-0 flex h-full w-full overflow-hidden p-0 p-0.5 text-lg [&_li]:flex-1 [&_li]:p-4 [&_li]:font-bold [&>li:first-child]:text-left [&>li:last-child]:text-right">
          {children}
        </motion.ul>
      </ListItem>
    );
  }),
);
