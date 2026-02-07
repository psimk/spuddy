import { twMerge } from "tailwind-merge";

export function cn(...classes: ReadonlyArray<string | boolean | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
