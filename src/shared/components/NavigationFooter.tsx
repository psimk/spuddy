import { MotionConfig, motion } from "motion/react";
import { Children, type PropsWithChildren, type ReactNode } from "react";

import {
  FOOTER_VARIANTS,
  NAV_VARIANTS,
  TRANSITION_CONFIG,
} from "@shared/components/NavigationFooter.motion";

type Props = {
  animate?: "up" | "down";
  inputs?: ReactNode;
  buttons?: ReadonlyArray<ReactNode>;
};

export default function NavigationFooter({
  animate = "up",
  inputs,
  children,
}: PropsWithChildren<Props>) {
  return (
    <MotionConfig transition={TRANSITION_CONFIG}>
      <motion.footer
        variants={FOOTER_VARIANTS}
        animate={animate}
        initial={false}
        className="fixed bottom-0 flex w-dvw flex-col items-center justify-center overflow-hidden inset-shadow-sm backdrop-blur-md"
      >
        <div className="mx-auto w-full max-w-2xl">{inputs}</div>
        <motion.nav
          variants={NAV_VARIANTS}
          animate={animate}
          initial={false}
          className="mx-auto w-full max-w-2xl overflow-hidden"
        >
          {children}
        </motion.nav>
      </motion.footer>
    </MotionConfig>
  );
}
