import type { Variants } from "motion/react";

export const INPUT_WRAPPER_VARIANTS = {
  up: {},
  down: { paddingTop: 0 },
} satisfies Variants;

export const INPUT_VARIANTS = {
  up: { fontSize: "1.25rem" },
  down: {
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#FFFFFF00",
    boxShadow: "none",
  },
} satisfies Variants;
