import {
  forwardRef,
  memo,
  useCallback,
  type ComponentProps,
  type Ref,
} from "react";
import { animate, useMotionValue, type PanInfo } from "motion/react";

import ListItem from "@components/ListItem";

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
  forwardRef(function SwipableListItem( { onSwipeLeft, onSwipeRight, ...props }: Props,
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
        <ul className="bg-success m-0 flex h-full w-full list-none items-center justify-between rounded-lg p-0">
          <li className="p-2 text-lg font-bold">done</li>
          <li className="p-2 text-right text-lg font-bold">done</li>
        </ul>
      </ListItem>
    );
  }),
);
