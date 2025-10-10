import { motion } from "motion/react";
import {
  forwardRef,
  type FocusEvent,
  useEffect,
  useState,
  type Ref,
  type HTMLAttributes,
} from "react";

import {
  INPUT_VARIANTS,
  INPUT_WRAPPER_VARIANTS,
} from "@shared/components/NavigationInput.motion";

type Props = {
  animate?: "up" | "down";
  className?: string;
  value?: string;
  placeholder?: string;
} & Omit<
  HTMLAttributes<HTMLInputElement>,
  "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"
>;

export default forwardRef(function NavigationInput(
  { animate, className = "", ...props }: Props,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <motion.div
      animate={animate}
      className={`${className} grid place-items-center`}
      initial={false}
      ref={ref}
      variants={INPUT_WRAPPER_VARIANTS}
    >
      <motion.input
        {...props}
        name="item"
        animate={animate}
        className="input bg-base-300/80 w-[calc(100vw*0.92)] max-w-xl rounded-xl text-center shadow-xl"
        initial={false}
        type="text"
        variants={INPUT_VARIANTS}
      />
    </motion.div>
  );
});
