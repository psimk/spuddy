import type { Transition, Variants } from "motion/react";

export const TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
} satisfies Transition;

export const FOOTER_VARIANTS = {
  up: { y: 0 },
  down: { y: 90 },
} satisfies Variants;

export const INPUT_WRAPPER_VARIANTS = {
  up: {},
  down: { paddingTop: 0 },
} satisfies Variants;

export const INPUT_VARIANTS = {
  up: { fontSize: "1.875rem" },
  down: {
    height: "4rem",
    fontSize: "1.25rem",
    border: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
} satisfies Variants;

export const NAV_VARIANTS = {
  up: { y: 0 },
  down: { y: 100 },
} satisfies Variants;

export const BACKDROP_VARIANTS = {
  up: {},
  down: { backgroundColor: "#f8f8f8" },
} satisfies Variants;
