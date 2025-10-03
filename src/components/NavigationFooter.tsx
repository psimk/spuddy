import { Children, type ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";

import {
  TRANSITION_CONFIG,
  FOOTER_VARIANTS,
  NAV_VARIANTS,
} from "@components/NavigationFooter.motion";

type Props = {
  animate?: "up" | "down";
  inputs?: ReactNode;
  buttons?: ReadonlyArray<ReactNode>;
};

export default function NavigationFooter({
  animate = "up",
  inputs,
  buttons,
}: Props) {
  return (
    <MotionConfig transition={TRANSITION_CONFIG}>
      <motion.footer
        variants={FOOTER_VARIANTS}
        animate={animate}
        initial={false}
        className="bg-base-200/5 fixed bottom-0 flex w-dvw flex-col items-center justify-center overflow-hidden pt-22 backdrop-blur-2xl"
      >
        <div className="mx-auto w-full max-w-2xl">{inputs}</div>
        <motion.nav
          variants={NAV_VARIANTS}
          animate={animate}
          initial={false}
          className="mx-auto w-full max-w-2xl overflow-hidden"
        >
          <ul className="flex justify-between gap-4 px-8 pb-4">
            {Children.map(buttons, (button, index) => (
              <li key={index}>{button}</li>
            ))}
          </ul>
        </motion.nav>
      </motion.footer>
    </MotionConfig>
  );
}
