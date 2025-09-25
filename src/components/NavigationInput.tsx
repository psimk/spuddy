import { motion } from "motion/react";
import { forwardRef, type Ref } from "react";

import {
  INPUT_VARIANTS,
  INPUT_WRAPPER_VARIANTS,
} from "./NavigationInput.motion";

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
        animate={animate}
        className="input bg-base-300/50 w-[calc(100vw*0.8)] max-w-xl rounded-2xl text-center shadow-xl"
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
