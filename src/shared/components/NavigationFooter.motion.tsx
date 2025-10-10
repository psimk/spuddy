import type { Transition, Variants } from "motion/react";

export const TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
} satisfies Transition;

export const FOOTER_VARIANTS = {
  up: { y: 0, paddingTop: 66 },
  down: {
    y: 60,
    paddingTop: 50,
    backgroundColor: "#f8f8f8",
  },
} satisfies Variants;

export const NAV_VARIANTS = {
  up: { y: 0 },
  down: { y: 100 },
} satisfies Variants;
