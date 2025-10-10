import { motion } from "motion/react";
import { forwardRef, type Ref } from "react";

import {
  INPUT_VARIANTS,
  INPUT_WRAPPER_VARIANTS,
} from "@shared/components/NavigationInput.motion";

type Props = {
  animate?: "up" | "down";
  onFocus?: () => void;
  onBlur?: () => void;
};

export default forwardRef(function NavigationInput(
  { animate, onFocus, onBlur }: Props,
  ref: Ref<HTMLLIElement>,
) {
  return (
    <motion.li
      animate={animate}
      className="grid place-items-center pt-4 pb-2"
      initial={false}
      ref={ref}
      variants={INPUT_WRAPPER_VARIANTS}
    >
      <motion.input
        name="item"
        animate={animate}
        className="input bg-base-300/80 w-[calc(100vw*0.91)] max-w-xl rounded-xl text-center shadow-xl"
        initial={false}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="Type something"
        type="text"
        variants={INPUT_VARIANTS}
      />
    </motion.li>
  );
});
